import { ensureIsSupportedAaveV3NetworkId } from 'blockchain/aave-v3'
import { NetworkNames } from 'blockchain/networks'
import { networksByName } from 'blockchain/networks'
import { TokenBalances } from 'blockchain/tokens'
import { getUserDpmProxy } from 'blockchain/userDpmProxies'
import { AccountContext } from 'components/context'
import dayjs from 'dayjs'
import { VaultType } from 'features/generalManageVault/vaultType'
import { getStopLossTransactionStateMachine } from 'features/stateMachines/stopLoss/getStopLossTransactionStateMachine'
import { createAaveHistory$ } from 'features/vaultHistory/vaultHistory'
import { MainContext } from 'helpers/context/MainContext'
import { ProductContext } from 'helpers/context/ProductContext'
import { one } from 'helpers/zero'
import { LendingProtocol } from 'lendingProtocols'
import { getAaveWstEthYield } from 'lendingProtocols/aave-v3/calculations/wstEthYield'
import { prepareAaveTotalValueLocked$ } from 'lendingProtocols/aave-v3/pipelines'
import { ReserveConfigurationData } from 'lendingProtocols/aaveCommon'
import { memoize } from 'lodash'
import { curry } from 'ramda'
import { merge, Observable, of, Subject } from 'rxjs'
import { filter, switchMap } from 'rxjs/operators'

import { AaveContext } from './aave-context'
import { getCommonPartsFromProductContext } from './get-common-parts-from-app-context'
import { getAaveV3StrategyConfig, ProxiesRelatedWithPosition } from './helpers'
import {
  getManageAaveStateMachine,
  getManageAaveV3PositionStateMachineServices,
} from './manage/services'
import { getOpenAaveStateMachine, getOpenAaveV3PositionStateMachineServices } from './open/services'
import {
  getAaveHistoryEvents,
  getAaveSupportedTokenBalances$,
  getAdjustAaveParametersMachine,
  getCloseAaveParametersMachine,
  getDepositBorrowAaveMachine,
  getOpenAaveParametersMachine,
  getStrategyInfo$,
} from './services'
import { getSupportedTokens } from './strategies'
import { IStrategyConfig, PositionId } from './types'

export type StrategyUpdateParams = {
  positionId: PositionId
  networkName: NetworkNames
  vaultType?: VaultType
}

export function setupAaveV3Context(
  mainContext: MainContext,
  accountContext: AccountContext,
  productContext: ProductContext,
  network: NetworkNames,
): AaveContext {
  const networkId = networksByName[network].id
  ensureIsSupportedAaveV3NetworkId(networkId)

  const { txHelpers$, onEveryBlock$, context$, connectedContext$, chainContext$ } = mainContext
  const { userSettings$, proxyConsumed$ } = accountContext
  const { tokenPriceUSD$, protocols, commonTransactionServices } = productContext

  const {
    allowanceForAccount$,
    allowanceStateMachine,
    dpmAccountStateMachine,
    gasEstimation$,
    operationExecutorTransactionMachine,
    proxyForAccount$,
    proxyStateMachine,
    unconsumedDpmProxyForConnectedAccount$,
    disconnectedGraphQLClient$,
    chainlinkUSDCUSDOraclePrice$,
    chainLinkETHUSDOraclePrice$,
  } = getCommonPartsFromProductContext(
    mainContext,
    accountContext,
    productContext,
    onEveryBlock$,
    networkId,
  )

  const userDpms = memoize(getUserDpmProxy, (vaultId, chainId) => `${vaultId}-${chainId}`)
  const proxiesRelatedWithPosition$: (
    positionId: PositionId,
  ) => Observable<ProxiesRelatedWithPosition> = memoize(
    (positionId) => {
      return of(undefined).pipe(
        switchMap(async () => {
          const dpm = await userDpms(positionId.vaultId!, networkId)
          return {
            dsProxy: undefined,
            dpmProxy: dpm,
            walletAddress: (dpm?.user || positionId.walletAddress)!,
          }
        }),
      )
    },
    (positionId) => JSON.stringify(positionId),
  )

  const {
    aaveUserAccountData$,
    aaveProtocolData$,
    aaveReserveConfigurationData$,
    aaveOracleAssetPriceData$,
    getAaveReserveData$,
    getAaveAssetsPrices$,
  } = protocols[LendingProtocol.AaveV3][networkId]

  const aaveEarnYieldsQuery = memoize(
    curry(getAaveWstEthYield)(disconnectedGraphQLClient$, dayjs()),
    (riskRatio, fields) => JSON.stringify({ fields, riskRatio: riskRatio.multiple.toString() }),
  )

  const earnCollateralsReserveData = {
    WSTETH: aaveReserveConfigurationData$({ collateralToken: 'WSTETH', debtToken: 'ETH' }),
  } as Record<string, Observable<ReserveConfigurationData>>

  const aaveSupportedTokenBalances$ = memoize(
    curry(getAaveSupportedTokenBalances$)(
      aaveOracleAssetPriceData$,
      of(one), // aave v3 base is already in USD
      getSupportedTokens(LendingProtocol.AaveV3, network),
      networkId,
    ),
  )

  const tokenBalances$: Observable<TokenBalances> = context$.pipe(
    switchMap(({ account }) => {
      return aaveSupportedTokenBalances$(account)
    }),
  )

  const strategyInfo$ = memoize(
    curry(getStrategyInfo$)(aaveOracleAssetPriceData$, aaveReserveConfigurationData$),
    (tokens: IStrategyConfig['tokens']) => `${tokens.deposit}-${tokens.collateral}-${tokens.debt}`,
  )

  const openAaveParameters = getOpenAaveParametersMachine(txHelpers$, gasEstimation$, networkId)
  const closeAaveParameters = getCloseAaveParametersMachine(txHelpers$, gasEstimation$, networkId)
  const adjustAaveParameters = getAdjustAaveParametersMachine(txHelpers$, gasEstimation$, networkId)
  const depositBorrowAaveMachine = getDepositBorrowAaveMachine(
    txHelpers$,
    gasEstimation$,
    networkId,
  )

  const openAaveStateMachineServices = getOpenAaveV3PositionStateMachineServices(
    context$,
    txHelpers$,
    tokenBalances$,
    proxyForAccount$,
    aaveUserAccountData$,
    userSettings$,
    tokenPriceUSD$,
    strategyInfo$,
    aaveProtocolData$,
    allowanceForAccount$,
    unconsumedDpmProxyForConnectedAccount$,
    proxyConsumed$,
    aaveReserveConfigurationData$,
  )

  const manageAaveStateMachineServices = getManageAaveV3PositionStateMachineServices(
    context$,
    txHelpers$,
    tokenBalances$,
    proxyForAccount$,
    proxiesRelatedWithPosition$,
    userSettings$,
    tokenPriceUSD$,
    strategyInfo$,
    aaveProtocolData$,
    allowanceForAccount$,
    getAaveHistoryEvents,
  )

  const stopLossTransactionStateMachine = getStopLossTransactionStateMachine(
    txHelpers$,
    connectedContext$,
    commonTransactionServices,
  )

  const aaveStateMachine = getOpenAaveStateMachine(
    openAaveStateMachineServices,
    openAaveParameters,
    proxyStateMachine,
    dpmAccountStateMachine,
    allowanceStateMachine,
    operationExecutorTransactionMachine,
    stopLossTransactionStateMachine,
  )

  const aaveManageStateMachine = getManageAaveStateMachine(
    manageAaveStateMachineServices,
    closeAaveParameters,
    adjustAaveParameters,
    allowanceStateMachine,
    operationExecutorTransactionMachine,
    depositBorrowAaveMachine,
  )

  const aaveTotalValueLocked$ = curry(prepareAaveTotalValueLocked$)(
    getAaveReserveData$({ token: 'WSTETH' }),
    getAaveReserveData$({ token: 'ETH' }),
    getAaveAssetsPrices$({
      tokens: ['ETH', 'WSTETH'],
    }),
  )

  const aaveHistory$ = memoize(curry(createAaveHistory$)(chainContext$, onEveryBlock$))

  const strategyUpdateTrigger = new Subject<StrategyUpdateParams>()
  const strategyConfig$: (
    positionId: PositionId,
    networkName: NetworkNames,
    vaultType?: VaultType,
  ) => Observable<IStrategyConfig> = memoize(
    (positionId: PositionId, networkName: NetworkNames, vaultType) =>
      merge(
        // Subsequent updates from within x-state
        strategyUpdateTrigger.pipe(
          filter(
            (params) => params.positionId === positionId && params.networkName === networkName,
          ),
        ),
        // The initial trigger from WithStrategy
        of({ positionId, networkName, vaultType }),
      ).pipe(
        switchMap((params) =>
          getAaveV3StrategyConfig(params.positionId, params.networkName, params.vaultType),
        ),
      ),
    (positionId, networkName, vaultType) => JSON.stringify({ positionId, networkName, vaultType }),
  )

  function updateStrategyConfig(positionId: PositionId, networkName: NetworkNames) {
    return (vaultType: VaultType) => {
      strategyUpdateTrigger.next({
        positionId: positionId,
        networkName: networkName,
        vaultType: vaultType,
      })
    }
  }

  return {
    ...protocols[LendingProtocol.AaveV3][networkId],
    aaveStateMachine,
    aaveManageStateMachine,
    aaveTotalValueLocked$,
    aaveEarnYieldsQuery,
    strategyConfig$,
    updateStrategyConfig,
    proxiesRelatedWithPosition$,
    chainlinkUSDCUSDOraclePrice$,
    chainLinkETHUSDOraclePrice$,
    earnCollateralsReserveData,
    dpmAccountStateMachine,
    aaveHistory$,
  }
}
