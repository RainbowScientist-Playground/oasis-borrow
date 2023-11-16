import { RiskRatio } from '@oasisdex/dma-library'
import { getOnChainPosition } from 'actions/aave-like'
import BigNumber from 'bignumber.js'
import { getNetworkContracts } from 'blockchain/contracts'
import { NetworkIds } from 'blockchain/networks'
import dayjs from 'dayjs'
import { calculateViewValuesForPosition } from 'features/aave/services'
import { isShortPosition } from 'features/omni-kit/helpers'
import { OmniProductType } from 'features/omni-kit/types'
import { GraphQLClient } from 'graphql-request'
import { notAvailable } from 'handlers/portfolio/constants'
import {
  commonDataMapper,
  filterAutomation,
  getReserveConfigurationDataCall,
  getReserveDataCall,
} from 'handlers/portfolio/positions/handlers/aave-like/helpers'
import type { GetAaveLikePositionHandlerType } from 'handlers/portfolio/positions/handlers/aave-like/types'
import { getAutomationData } from 'handlers/portfolio/positions/helpers/getAutomationData'
import { getHistoryData } from 'handlers/portfolio/positions/helpers/getHistoryData'
import type { PortfolioPositionsHandler, PositionDetail } from 'handlers/portfolio/types'
import {
  formatCryptoBalance,
  formatDecimalAsPercent,
  formatPercent,
} from 'helpers/formatters/format'
import { zero } from 'helpers/zero'
import { getAaveWstEthYield } from 'lendingProtocols/aave-v3/calculations/wstEthYield'

const getAaveLikeBorrowPosition: GetAaveLikePositionHandlerType = async (
  dpm,
  prices,
  _history,
  allPositionsAutomations,
) => {
  const positionAutomations = allPositionsAutomations.find(filterAutomation(dpm))
  const { commonData, primaryTokenPrice, secondaryTokenPrice } = commonDataMapper({
    automations: positionAutomations,
    dpm,
    prices,
  })
  const [primaryTokenReserveData, secondaryTokenReserveData, onChainPositionData] =
    await Promise.all([
      getReserveDataCall(dpm, commonData.primaryToken),
      getReserveDataCall(dpm, commonData.secondaryToken),
      getOnChainPosition({
        networkId: dpm.networkId,
        collateralToken: commonData.primaryToken,
        debtToken: commonData.secondaryToken,
        protocol: commonData.protocol,
        proxyAddress: dpm.id.toLowerCase(),
      }),
    ])

  const calculations = calculateViewValuesForPosition(
    onChainPositionData,
    primaryTokenPrice,
    secondaryTokenPrice,
    primaryTokenReserveData.liquidityRate,
    secondaryTokenReserveData.variableBorrowRate,
  )

  const isShort = isShortPosition({ collateralToken: commonData.primaryToken })
  const tokensLabel = isShort
    ? `${commonData.secondaryToken}/${commonData.primaryToken}`
    : `${commonData.primaryToken}/${commonData.secondaryToken}`

  return {
    ...commonData,
    details: [
      {
        type: 'collateralLocked',
        value: `${formatCryptoBalance(calculations.collateral)} ${commonData.primaryToken}`,
      },
      {
        type: 'totalDebt',
        value: `${formatCryptoBalance(calculations.debt)} ${commonData.secondaryToken}`,
      },
      {
        type: 'liquidationPrice',
        value: `${formatCryptoBalance(
          isShort ? calculations.liquidationPriceInCollateral : calculations.liquidationPriceInDebt,
        )} ${tokensLabel}`,
        subvalue: `Now ${formatCryptoBalance(
          isShort
            ? secondaryTokenPrice.div(primaryTokenPrice)
            : primaryTokenPrice.div(secondaryTokenPrice),
        )} ${tokensLabel}`,
      },
      {
        type: 'ltv',
        value: formatDecimalAsPercent(onChainPositionData.riskRatio.loanToValue),
        subvalue: `Max ${formatDecimalAsPercent(onChainPositionData.category.maxLoanToValue)}`,
      },
      {
        type: 'borrowRate',
        value: formatDecimalAsPercent(calculations.netBorrowCostPercentage),
      },
    ],
    netValue: calculations.netValue.toNumber(),
  }
}

const getAaveLikeMultiplyPosition: GetAaveLikePositionHandlerType = async (
  dpm,
  prices,
  allPositionsHistory,
  allPositionsAutomations,
) => {
  const positionAutomations = allPositionsAutomations.find(filterAutomation(dpm))
  const { commonData, primaryTokenPrice, secondaryTokenPrice } = commonDataMapper({
    automations: positionAutomations,
    dpm,
    prices,
  })
  const [
    primaryTokenReserveConfiguration,
    primaryTokenReserveData,
    secondaryTokenReserveData,
    onChainPositionData,
  ] = await Promise.all([
    getReserveConfigurationDataCall(dpm, commonData.primaryToken),
    getReserveDataCall(dpm, commonData.primaryToken),
    getReserveDataCall(dpm, commonData.secondaryToken),
    getOnChainPosition({
      networkId: dpm.networkId,
      collateralToken: commonData.primaryToken,
      debtToken: commonData.secondaryToken,
      protocol: commonData.protocol,
      proxyAddress: dpm.id.toLowerCase(),
    }),
  ])

  const calculations = calculateViewValuesForPosition(
    onChainPositionData,
    primaryTokenPrice,
    secondaryTokenPrice,
    primaryTokenReserveData.liquidityRate,
    secondaryTokenReserveData.variableBorrowRate,
  )
  const { multiple: maxMultiple } = new RiskRatio(
    primaryTokenReserveConfiguration.ltv,
    RiskRatio.TYPE.LTV,
  )
  const positionHistory = allPositionsHistory.filter(
    (position) => position.id.toLowerCase() === dpm.id.toLowerCase(),
  )[0]
  const pnlValue =
    positionHistory?.cumulativeDeposit.gt(zero) &&
    calculations.netValue
      .minus(positionHistory.cumulativeDeposit.minus(positionHistory.cumulativeWithdraw))
      .div(positionHistory.cumulativeDeposit.minus(positionHistory.cumulativeWithdraw))
  const isShort = isShortPosition({ collateralToken: commonData.primaryToken })
  const tokensLabel = isShort
    ? `${commonData.secondaryToken}/${commonData.primaryToken}`
    : `${commonData.primaryToken}/${commonData.secondaryToken}`

  return {
    ...commonData,
    details: [
      {
        type: 'netValue',
        value: `$${formatCryptoBalance(calculations.netValue)}`,
      },
      {
        type: 'pnl',
        value: pnlValue ? formatPercent(pnlValue, { precision: 2 }) : notAvailable,
        accent: pnlValue ? (pnlValue.gte(zero) ? 'positive' : 'negative') : undefined,
      },
      {
        type: 'liquidationPrice',
        value: `${formatCryptoBalance(
          isShort ? calculations.liquidationPriceInCollateral : calculations.liquidationPriceInDebt,
        )} ${tokensLabel}`,
        subvalue: `Now ${formatCryptoBalance(
          isShort
            ? secondaryTokenPrice.div(primaryTokenPrice)
            : primaryTokenPrice.div(secondaryTokenPrice),
        )} ${tokensLabel}`,
      },
      {
        type: 'ltv',
        value: formatDecimalAsPercent(onChainPositionData.riskRatio.loanToValue),
        subvalue: `Max ${formatDecimalAsPercent(onChainPositionData.category.maxLoanToValue)}`,
      },
      {
        type: 'multiple',
        value: `${onChainPositionData.riskRatio.multiple.toFormat(2, BigNumber.ROUND_DOWN)}x`,
        subvalue: `Max ${maxMultiple.toFormat(2, BigNumber.ROUND_DOWN)}x`,
      },
    ],
    netValue: calculations.netValue.toNumber(),
  }
}

const getAaveLikeEarnPosition: GetAaveLikePositionHandlerType = async (
  dpm,
  prices,
  allPositionsHistory,
) => {
  const { commonData, primaryTokenPrice, secondaryTokenPrice } = commonDataMapper({ dpm, prices })
  const [primaryTokenReserveData, secondaryTokenReserveData, onChainPositionData] =
    await Promise.all([
      getReserveDataCall(dpm, commonData.primaryToken),
      getReserveDataCall(dpm, commonData.secondaryToken),
      getOnChainPosition({
        networkId: dpm.networkId,
        collateralToken: commonData.primaryToken,
        debtToken: commonData.secondaryToken,
        protocol: commonData.protocol,
        proxyAddress: dpm.id.toLowerCase(),
      }),
    ])
  const isWstethEthEarn =
    commonData.primaryToken === 'WSTETH' && commonData.secondaryToken === 'WETH'
  let wstEthYield
  if (isWstethEthEarn) {
    const contracts = getNetworkContracts(NetworkIds.MAINNET)
    wstEthYield = await getAaveWstEthYield(
      new GraphQLClient(contracts.cacheApi),
      dayjs(),
      onChainPositionData.riskRatio,
      ['7Days'],
    )
  }
  const positionHistory = allPositionsHistory.filter(
    (position) => position.id === dpm.id.toLowerCase(),
  )[0]
  const calculations = calculateViewValuesForPosition(
    onChainPositionData,
    primaryTokenPrice,
    secondaryTokenPrice,
    primaryTokenReserveData.liquidityRate,
    secondaryTokenReserveData.variableBorrowRate,
  )

  return {
    ...commonData,
    lendingType: onChainPositionData.debt.amount.gt(zero) ? 'loop' : 'passive',
    details: [
      {
        type: 'netValue',
        value: `$${formatCryptoBalance(calculations.netValue)}`,
      },
      {
        type: 'earnings',
        value: `${
          positionHistory
            ? formatCryptoBalance(
                calculations.netValue.minus(
                  positionHistory.cumulativeDeposit.minus(positionHistory.cumulativeWithdraw),
                ),
              )
            : notAvailable
        }`,
      },
      {
        type: 'apy',
        value: wstEthYield?.annualisedYield7days
          ? formatDecimalAsPercent(wstEthYield.annualisedYield7days.div(100))
          : notAvailable,
      },
      {
        type: 'ltv',
        value: formatDecimalAsPercent(onChainPositionData.riskRatio.loanToValue),
        subvalue: `Max ${formatDecimalAsPercent(onChainPositionData.category.maxLoanToValue)}`,
      },
    ].filter(Boolean) as PositionDetail[],
    netValue: calculations.netValue.toNumber(),
  }
}

export const aaveLikePositionsHandler: PortfolioPositionsHandler = async ({ dpmList, prices }) => {
  const aaveLikeDpmList = dpmList.filter(({ protocol }) => ['AAVE_V3', 'Spark'].includes(protocol))
  const uniqueDpmNetworks = Array.from(new Set(aaveLikeDpmList.map(({ networkId }) => networkId)))
  const [allPositionsHistory, allPositionsAutomations] = await Promise.all([
    Promise.all(
      uniqueDpmNetworks.map((networkId) =>
        getHistoryData({
          network: networkId,
          addresses: aaveLikeDpmList
            .filter(({ networkId: dpmNetworkId }) => dpmNetworkId === networkId)
            .map(({ id }) => id),
        }),
      ),
    ).then((data) => data.flat()),
    getAutomationData({
      addresses: aaveLikeDpmList
        .filter(({ networkId }) => networkId === NetworkIds.MAINNET)
        .map(({ id }) => id),
      network: NetworkIds.MAINNET,
    }),
  ])

  const positions = await Promise.all(
    aaveLikeDpmList.map(async (dpm) => {
      switch (dpm.positionType.toLowerCase()) {
        case OmniProductType.Multiply:
          return getAaveLikeMultiplyPosition(
            dpm,
            prices,
            allPositionsHistory,
            allPositionsAutomations,
          )
        case OmniProductType.Borrow:
          return getAaveLikeBorrowPosition(
            dpm,
            prices,
            allPositionsHistory,
            allPositionsAutomations,
          )
        case OmniProductType.Earn:
          return getAaveLikeEarnPosition(dpm, prices, allPositionsHistory, allPositionsAutomations)
        default:
          throw new Error(`Unsupported position type ${dpm.positionType}`)
      }
    }),
  )

  return {
    positions,
  }
}