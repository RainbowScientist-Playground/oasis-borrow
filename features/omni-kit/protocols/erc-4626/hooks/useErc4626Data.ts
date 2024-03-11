import type { SupplyPosition } from '@oasisdex/dma-library'
import { omniPositionTriggersDataDefault } from 'features/omni-kit/constants'
import type { OmniProtocolHookProps } from 'features/omni-kit/types'

export function useErc4626Data({ tokenPriceUSDData }: OmniProtocolHookProps) {
  return {
    data: {
      aggregatedData: {
        auction: {},
        history: [],
      },
      positionData: {} as SupplyPosition,
      protocolPricesData: tokenPriceUSDData,
      positionTriggersData: omniPositionTriggersDataDefault,
    },
    errors: [] as string[],
  }
}