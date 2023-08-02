import { SubgraphsResponses } from 'features/subgraphLoader/types'
import { loadSubgraph } from 'features/subgraphLoader/useSubgraphLoader'

type GetAjnaPoolAddress = (collateralAddress: string, quoteAddress: string) => Promise<string>

export const getAjnaPoolAddress: GetAjnaPoolAddress = async (collateralAddress, quoteAddress) => {
  const { response } = (await loadSubgraph('Ajna', 'getPoolAddress', {
    collateralAddress: collateralAddress.toLowerCase(),
    quoteAddress: quoteAddress.toLowerCase(),
  })) as SubgraphsResponses['Ajna']['getPoolAddress']

  if (response && response.pools.length) {
    const [pool] = response.pools

    return pool.address
  }

  throw new Error(
    `No pool data found for collateralAddress: ${collateralAddress} and quoteAddress: ${quoteAddress}, Response: ${JSON.stringify(
      response,
    )}`,
  )
}