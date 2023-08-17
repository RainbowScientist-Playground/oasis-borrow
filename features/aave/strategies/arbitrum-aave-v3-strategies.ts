import { arbitrumMainnetHexId, NetworkIds, NetworkNames } from 'blockchain/networks'
import {
  AaveManageHeader,
  AaveMultiplyManageComponent,
  AaveOpenHeader,
  adjustRiskView,
} from 'features/aave/components'
import { adjustRiskSliderConfig as multiplyAdjustRiskSliderConfig } from 'features/aave/services'
import { IStrategyConfig, ProductType, ProxyType, StrategyType } from 'features/aave/types'
import { AaveMultiplyFaq } from 'features/content/faqs/aave/multiply'
import { LendingProtocol } from 'lendingProtocols'

export const arbitrumAaveV3Strategies: Array<IStrategyConfig> = [
  {
    network: NetworkNames.arbitrumMainnet,
    networkId: NetworkIds.ARBITRUMMAINNET,
    networkHexId: arbitrumMainnetHexId,
    name: 'arbitrum-ethusdc',
    urlSlug: 'arbitrum-ethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      adjustRiskInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'ETH',
      debt: 'USDC',
      deposit: 'ETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: ProductType.Multiply,
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3Arbitrum',
    availableActions: () => ['close'],
    executeTransactionWith: 'ethers',
    strategyType: StrategyType.Long,
  },
  {
    network: NetworkNames.arbitrumMainnet,
    networkId: NetworkIds.ARBITRUMMAINNET,
    networkHexId: arbitrumMainnetHexId,
    name: 'arbitrum-wstethusdc',
    urlSlug: 'arbitrum-wstethusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      adjustRiskInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'WSTETH',
      debt: 'USDC',
      deposit: 'WSTETH',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: ProductType.Multiply,
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3Arbitrum',
    availableActions: () => ['close'],
    executeTransactionWith: 'ethers',
    strategyType: StrategyType.Long,
  },
  {
    network: NetworkNames.arbitrumMainnet,
    networkId: NetworkIds.ARBITRUMMAINNET,
    networkHexId: arbitrumMainnetHexId,
    name: 'arbitrum-wbtcusdc',
    urlSlug: 'arbitrum-wbtcusdc',
    proxyType: ProxyType.DpmProxy,
    viewComponents: {
      headerOpen: AaveOpenHeader,
      headerManage: AaveManageHeader,
      headerView: AaveManageHeader,
      simulateSection: AaveMultiplyManageComponent,
      vaultDetailsManage: AaveMultiplyManageComponent,
      vaultDetailsView: AaveMultiplyManageComponent,
      secondaryInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      adjustRiskInput: adjustRiskView(multiplyAdjustRiskSliderConfig),
      positionInfo: AaveMultiplyFaq,
      sidebarTitle: 'open-multiply.sidebar.title',
      sidebarButton: 'open-multiply.sidebar.open-btn',
    },
    tokens: {
      collateral: 'WBTC',
      debt: 'USDC',
      deposit: 'WBTC',
    },
    riskRatios: multiplyAdjustRiskSliderConfig.riskRatios,
    type: ProductType.Multiply,
    protocol: LendingProtocol.AaveV3,
    featureToggle: 'AaveV3Arbitrum',
    availableActions: () => ['close'],
    executeTransactionWith: 'ethers',
    strategyType: StrategyType.Long,
  },
]
