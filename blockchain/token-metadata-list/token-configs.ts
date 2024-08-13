import type { TokenConfig } from 'blockchain/TokenConfig'
import {
  aave_circle_color,
  aero,
  ajna_circle_color,
  apxeth_circle_color,
  arb,
  arb_circle,
  bal,
  bal_circle,
  bat,
  bat_circle_color,
  bsdeth_circle_color,
  cbeth_circle_color,
  chainlink,
  chainlink_circle_color,
  compound,
  compound_circle_color,
  crv,
  crv_circle,
  cseth,
  dai,
  dai_circle_color,
  degen,
  deprecated_icon,
  deth,
  ena,
  ether,
  ether_circle_color,
  ezeth,
  frax_circle_color,
  gemini,
  gemini_circle_color,
  gho_circle_color,
  gno_circle_color,
  guniv3_dai_usdc1_circles_color,
  kyber,
  kyber_circle_color,
  ldo,
  ldo_circle,
  lrc,
  lrc_circle_color,
  lusd_circle_color,
  mana,
  mana_circle_color,
  matic_circle_color,
  meveth,
  mkr_circle_color,
  morpho_circle_color,
  mpeth,
  op,
  op_circle,
  oseth_circle_color,
  pax,
  pax_circle_color,
  prime,
  pyusd,
  question,
  rbn_circle_color,
  renbtc_circle_color,
  reth_circle_color,
  rpl,
  rpl_circle,
  rseth,
  safe,
  sdai_circle_color,
  snx,
  spark_circle_color,
  steth_circle_color,
  styeth_circle_color,
  susd,
  susd_circle,
  susde,
  syrup_usdc,
  tbtc_circle_color,
  tusd,
  tusd_circle_color,
  uni_circle_color,
  unieth,
  univ2_dai_usdc_circles_color,
  univ2_dai_usdt_circles_color,
  univ2_eth_usdt_circles_color,
  univ2_usdc_eth_circles_color,
  usda,
  usdc,
  usdc_circle_color,
  usde,
  usdp_circle_color,
  usdt,
  usdt_circle_color,
  wbtc,
  wbtc_circle_color,
  weeth_circle_color,
  weth_circle_color,
  wld_circle_color,
  woeth_circle_color,
  wsteth_circle_color,
  xeth,
  yfi_circle_color,
  yieldbtc_circle_color,
  yieldeth_circle_color,
  zerox,
  zerox_circle_color,
} from 'theme/icons'

const deprecatedTokens = [
  'UNIV2WBTCETH',
  'UNIV2LINKETH',
  'UNIV2UNIETH',
  'UNIV2WBTCDAI',
  'UNIV2AAVEETH',
  'CRVV1ETHSTETH',
]

export const tokenConfigs: TokenConfig[] = [
  {
    symbol: 'USDP',
    precision: 18,
    digits: 5,
    name: 'Pax Dollar',
    icon: usdp_circle_color,
    iconCircle: usdp_circle_color,
    coinpaprikaTicker: 'usdp-paxos-standard-token',
    coinGeckoTicker: 'paxos-standard',
    color: '#0B9F74',
    background: 'linear-gradient(143.13deg, #0B9F74 12.24%, #64DFBB 85.9%) #FFFFFF',
    tags: [],
  },
  {
    symbol: 'STETH',
    precision: 18,
    digits: 5,
    name: 'Lido Staked ETH',
    icon: steth_circle_color,
    iconCircle: steth_circle_color,
    coinpaprikaTicker: 'steth-lido-staked-ether',
    coinGeckoTicker: 'staked-ether',
    color: '#0B91DD',
    rootToken: 'ETH',
    background: 'linear-gradient(143.37deg, #00A3FF 15.97%, #0B91DD 81.1%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'MKR',
    precision: 18,
    digits: 5,
    name: 'Maker',
    icon: mkr_circle_color,
    iconCircle: mkr_circle_color,
    coinpaprikaTicker: 'mkr-maker',
    coinbaseTicker: 'mkr-usd',
    color: '#1AAB9B',
    background: 'linear-gradient(133.41deg, #1AAB9B 17.25%, #22CAB7 86.54%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'WETH',
    precision: 18,
    digits: 5,
    name: 'Wrapped Ether',
    icon: weth_circle_color,
    iconCircle: weth_circle_color,
    coinpaprikaTicker: 'weth-weth',
    coinpaprikaFallbackTicker: 'eth-ethereum',
    coinGeckoTicker: 'weth',
    color: '#25ddfb',
    background: 'linear-gradient(158.87deg, #E2F7F9 0%, #D3F3F5 100%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'ETH',
    precision: 18,
    digits: 5,
    maxSell: '10000000',
    name: 'Ether',
    icon: ether,
    iconCircle: ether_circle_color,
    coinpaprikaTicker: 'eth-ethereum',
    coinbaseTicker: 'eth-usd',
    coinGeckoId: 'ethereum',
    color: '#667FE3',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'WBTC',
    precision: 8,
    digits: 5,
    digitsInstant: 3,
    safeCollRatio: 1.5,
    maxSell: '1000000000000000',
    name: 'Wrapped Bitcoin',
    icon: wbtc,
    iconCircle: wbtc_circle_color,
    coinpaprikaTicker: 'wbtc-wrapped-bitcoin',
    coinGeckoId: 'wrapped-bitcoin',
    coinGeckoTicker: 'wrapped-bitcoin',
    color: '#f09242',
    background: 'linear-gradient(147.66deg, #FEF1E1 0%, #FDF2CA 88.25%)',
    tags: [],
    rootToken: 'BTC',
  },
  {
    symbol: 'MANA',
    precision: 18,
    digits: 5,
    name: 'Decentraland',
    icon: mana,
    iconCircle: mana_circle_color,
    color: '#f05',
    coinbaseTicker: 'mana-usd',
    coinGeckoId: 'decentraland',
    background: 'linear-gradient(160.26deg, #FFEAEA 5.25%, #FFF5EA 100%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'LINK',
    precision: 18,
    digits: 5,
    name: 'Chainlink',
    icon: chainlink,
    iconCircle: chainlink_circle_color,
    color: '#375bd2',
    coinbaseTicker: 'link-usd',
    coinGeckoId: 'chainlink',
    background: 'linear-gradient(160.47deg, #E0E8F5 0.35%, #F0FBFD 99.18%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'GUSD',
    precision: 2,
    digits: 2,
    name: 'Gemini dollar',
    icon: gemini,
    iconCircle: gemini_circle_color,
    color: '#25ddfb',
    coinpaprikaTicker: 'gusd-gemini-dollar',
    coinGeckoId: 'gemini-dollar',
    coinGeckoTicker: 'gemini-dollar',
    background: 'linear-gradient(158.87deg, #E2F7F9 0%, #D3F3F5 100%), #FFFFFF',
    tags: ['stablecoin'],
  },
  {
    symbol: 'YFI',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Yearn',
    icon: usdc,
    iconCircle: yfi_circle_color,
    coinbaseTicker: 'yfi-usd',
    coinGeckoId: 'yearn-finance',
    color: '#0657f9',
    background: 'linear-gradient(160.47deg, #E0E8F5 0.35%, #F0FBFD 99.18%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'MATIC',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'MATIC',
    icon: matic_circle_color,
    iconCircle: matic_circle_color,
    color: '#ff077d',
    coinbaseTicker: 'matic-usd',
    coinGeckoId: 'polygon',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'UNIV2DAIETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIETH',
    icon: deprecated_icon,
    iconCircle: deprecated_icon,
    color: '#ff077d',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    tags: ['lp-token'],
  },
  {
    symbol: 'WSTETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Wrapped Staked ETH',
    icon: wsteth_circle_color,
    iconCircle: wsteth_circle_color,
    oracleTicker: 'wsteth',
    color: '#ff077d',
    background: 'linear-gradient(158.87deg, #E2F7F9 0%, #D3F3F5 100%), #FFFFFF',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'WOETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Wrapped OETH',
    icon: woeth_circle_color,
    iconCircle: woeth_circle_color,
    coinGeckoTicker: 'wrapped-oeth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'CBETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Coinbase Wrapped Staked ETH',
    icon: cbeth_circle_color,
    iconCircle: cbeth_circle_color,
    //TODO: replace with values provided by design team - so far content is duplicated from ETH
    color: '#667FE3',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    coinbaseTicker: 'cbeth-usd',
    coinGeckoTicker: 'coinbase-wrapped-staked-eth',
    coinpaprikaTicker: 'cbeth-coinbase-wrapped-staked-eth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'BSDETH',
    precision: 18,
    digits: 5,
    name: 'Based ETH',
    icon: bsdeth_circle_color,
    iconCircle: bsdeth_circle_color,
    coinGeckoTicker: 'based-eth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'BAT',
    precision: 18,
    digits: 5,
    name: 'Basic Attention Token',
    icon: bat,
    iconCircle: bat_circle_color,
    color: '#ff4625',
    background: '',
    tags: [],
  },
  {
    symbol: 'RENBTC',
    precision: 8,
    digits: 5,
    digitsInstant: 3,
    safeCollRatio: 1.5,
    maxSell: '1000000000000000',
    name: 'renBTC',
    icon: renbtc_circle_color,
    iconCircle: renbtc_circle_color,
    coinpaprikaTicker: 'renbtc-renbtc',
    coinGeckoId: 'renbtc',
    color: '#838489',
    background: 'linear-gradient(160.47deg, #F1F5F5 0.35%, #E5E7E8 99.18%), #FFFFFF',
    tags: [],
    rootToken: 'BTC',
  },
  {
    symbol: 'TUSD',
    precision: 18,
    digits: 2,
    name: 'Trust token',
    icon: tusd,
    iconCircle: tusd_circle_color,
    color: '#195aff',
    background: '',
    tags: ['stablecoin'],
  },
  {
    symbol: 'KNC',
    precision: 18,
    digits: 5,
    name: 'Kyber Network',
    icon: kyber,
    iconCircle: kyber_circle_color,
    color: '#30cb9e',
    background: '',
    tags: [],
  },
  {
    symbol: 'PAXUSD',
    precision: 18,
    digits: 2,
    name: 'Paxos Standard',
    icon: pax,
    iconCircle: pax_circle_color,
    color: '#005121',
    background: '',
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDT',
    precision: 6,
    digits: 2,
    name: 'Tether',
    icon: usdt,
    iconCircle: usdt_circle_color,
    color: '259c77',
    background: '',
    tags: ['stablecoin'],
    coinpaprikaTicker: 'usdt-tether',
    coinGeckoTicker: 'tether',
  },
  {
    symbol: 'COMP',
    precision: 18,
    digits: 5,
    name: 'Compound',
    icon: compound,
    iconCircle: compound_circle_color,
    color: '#00D395',
    background: '',
    tags: [],
  },
  {
    symbol: 'LRC',
    precision: 18,
    digits: 5,
    name: 'Loopring',
    icon: lrc,
    iconCircle: lrc_circle_color,
    color: '#1c60ff',
    background: '',
    tags: [],
  },
  {
    symbol: 'ZRX',
    precision: 18,
    digits: 5,
    name: '0x',
    icon: zerox,
    iconCircle: zerox_circle_color,
    color: '#000',
    background: '',
    tags: [],
  },
  {
    symbol: 'USDA',
    precision: 18,
    digits: 2,
    name: 'Angle USD',
    coinGeckoTicker: 'angle-usd',
    icon: usda,
    iconCircle: usda,
    background: '',
    tags: [],
  },
  {
    symbol: 'USDC',
    precision: 6,
    digits: 2,
    digitsInstant: 2,
    maxSell: '1000000000000000',
    name: 'USD Coin',
    icon: usdc,
    iconCircle: usdc_circle_color,
    coinpaprikaTicker: 'usdc-usd-coin',
    coinGeckoTicker: 'usd-coin',
    color: '#2775ca',
    background: 'linear-gradient(152.45deg, #0666CE 8.53%, #61A9F8 91.7%)',
    tags: ['stablecoin'],
  },
  {
    symbol: 'UNI',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Uniswap',
    icon: uni_circle_color,
    iconCircle: uni_circle_color,
    color: '#ff077d',
    coinbaseTicker: 'uni-usd',
    background: 'linear-gradient(160.65deg, #FDEEF3 2.52%, #FFE6F5 101.43%), #FFFFFF',
    tags: [],
  },
  {
    symbol: 'AAVE',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Aave',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave',
    color: '#ff077d',
    background: 'linear-gradient(286.73deg, #B6509E 2.03%, #2EBAC6 100%)',
    tags: [],
  },
  {
    symbol: 'UNIV2USDCETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2USDCETH',
    icon: univ2_usdc_eth_circles_color,
    iconCircle: univ2_usdc_eth_circles_color,
    color: '#ff077d',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2DAIUSDC',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIUSDC',
    icon: univ2_dai_usdc_circles_color,
    iconCircle: univ2_dai_usdc_circles_color,
    color: '#ff077d',
    background: 'linear-gradient(160.47deg, #E0E8F5 0.35%, #F0FBFD 99.18%), #FFFFFF',
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2ETHUSDT',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2ETHUSDT',
    icon: univ2_eth_usdt_circles_color,
    iconCircle: univ2_eth_usdt_circles_color,
    color: '#ff077d',
    background: '',
    tags: ['lp-token'],
  },
  {
    symbol: 'UNIV2DAIUSDT',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'UNIV2DAIUSDT',
    icon: univ2_dai_usdt_circles_color,
    iconCircle: univ2_dai_usdt_circles_color,
    color: '#ff077d',
    background: '',
    tags: ['lp-token'],
  },
  {
    symbol: 'GUNIV3DAIUSDC1',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'GUNIV3 DAI / USDC 0.05%',
    icon: guniv3_dai_usdc1_circles_color,
    iconCircle: guniv3_dai_usdc1_circles_color,
    color: '#ff077d',
    background: 'linear-gradient(171.29deg, #FDDEF0 -2.46%, #FFF0F9 -2.45%, #FFF6F1 99.08%)',
    tags: ['lp-token'],
    token0: 'DAI',
    token1: 'USDC',
  },
  {
    symbol: 'GUNIV3DAIUSDC2',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'GUNIV3 DAI / USDC 0.01%',
    icon: guniv3_dai_usdc1_circles_color,
    iconCircle: guniv3_dai_usdc1_circles_color,
    color: '#ff077d',
    background: 'linear-gradient(171.29deg, #FDDEF0 -2.46%, #FFF0F9 -2.45%, #FFF6F1 99.08%)',
    tags: ['lp-token'],
    token0: 'DAI',
    token1: 'USDC',
  },
  {
    symbol: 'DAI',
    precision: 18,
    digits: 4,
    maxSell: '10000000',
    name: 'Dai',
    icon: dai,
    iconCircle: dai_circle_color,
    coinpaprikaTicker: 'dai-dai',
    coinGeckoTicker: 'dai',
    coinbaseTicker: 'dai-usd',
    color: '#fdc134',
    background: '',
    tags: ['stablecoin'],
  },
  {
    symbol: 'RETH',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Rocket Pool ETH',
    icon: reth_circle_color,
    iconCircle: reth_circle_color,
    color: '#FFEAEA',
    coinGeckoTicker: 'rocket-pool-eth',
    background: 'linear-gradient(160.26deg, #FFEAEA 5.25%, #FFF5EA 100%)',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'GNO',
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: 'Gnosis',
    icon: gno_circle_color,
    iconCircle: gno_circle_color,
    color: '#FFEAEA',
    coinGeckoTicker: 'gnosis',
    background: '',
    tags: [],
  },
  {
    symbol: 'GHO',
    precision: 18,
    digits: 5,
    name: 'GHO',
    icon: gho_circle_color,
    iconCircle: gho_circle_color,
    color: '#C9B9EE',
    background: '',
    coinGeckoTicker: 'gho',
    coinpaprikaTicker: 'gho-gho',
    tags: ['stablecoin'],
  },
  {
    symbol: 'SAFE',
    precision: 18,
    digits: 5,
    name: 'SAFE',
    coinGeckoTicker: 'safe',
    icon: safe,
    iconCircle: safe,
    background: '',
    tags: [],
  },
  {
    symbol: 'SDAI',
    precision: 18,
    digits: 4,
    name: 'Savings Dai',
    icon: gho_circle_color,
    iconCircle: sdai_circle_color,
    color: '#54ac3c',
    background: '',
    oracleTicker: 'sdai',
    rootToken: 'DAI',
    tags: [],
  },
  {
    symbol: 'TBTC',
    precision: 18,
    digits: 5,
    name: 'Threshold Bitcoin',
    icon: tbtc_circle_color,
    iconCircle: tbtc_circle_color,
    color: '#000000',
    background: '',
    coinbaseTicker: 'btc-usd',
    coinGeckoTicker: 'bitcoin',
    coinpaprikaTicker: 'btc-bitcoin',
    rootToken: 'BTC',
    tags: [],
  },
  {
    symbol: 'WLD',
    precision: 18,
    digits: 5,
    name: 'Worldcoin',
    icon: wld_circle_color,
    iconCircle: wld_circle_color,
    color: '#1e1e1c',
    background: '',
    coinGeckoTicker: 'worldcoin-wld',
    coinpaprikaTicker: 'wld-worldcoin',
    tags: [],
  },
  {
    symbol: 'YIELDETH',
    precision: 18,
    digits: 5,
    name: 'Real Yield ETH',
    icon: yieldeth_circle_color,
    iconCircle: yieldeth_circle_color,
    color: '#17438C',
    background: '',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'YIELDBTC',
    precision: 18,
    digits: 5,
    name: 'Real Yield BTC',
    icon: yieldbtc_circle_color,
    iconCircle: yieldbtc_circle_color,
    color: '#17438C',
    background: '',
    rootToken: 'BTC',
    tags: [],
  },
  {
    symbol: 'LUSD',
    precision: 18,
    digits: 5,
    name: 'Liquitity USD',
    icon: lusd_circle_color,
    iconCircle: lusd_circle_color,
    color: '#17438C',
    background: '',
    coinpaprikaTicker: 'lusd-liquity-usd',
    coinGeckoTicker: 'lusd',
    tags: ['stablecoin'],
  },
  {
    symbol: 'FRAX',
    precision: 18,
    digits: 5,
    name: 'Liquitity USD',
    icon: frax_circle_color,
    iconCircle: frax_circle_color,
    color: '#17438C',
    background: '',
    coinpaprikaTicker: 'frax-frax',
    coinGeckoTicker: 'frax',
    tags: ['stablecoin'],
  },
  {
    symbol: 'SPARK',
    precision: 18,
    digits: 5,
    name: 'Spark',
    icon: spark_circle_color,
    iconCircle: spark_circle_color,
    color: '#17438C',
    background: '',
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDBC',
    precision: 6,
    digits: 2,
    name: 'USD Base Coin',
    icon: usdc_circle_color,
    iconCircle: usdc_circle_color,
    color: '#2775ca',
    background: '',
    coinGeckoTicker: 'bridged-usd-coin-base',
    coinpaprikaTicker: 'usdbc-usd-base-coin',
    tags: ['stablecoin'],
  },
  {
    symbol: 'USDC.E',
    precision: 6,
    digits: 2,
    digitsInstant: 2,
    maxSell: '1000000000000000',
    name: 'Bridged USD Coin',
    icon: usdc,
    iconCircle: usdc_circle_color,
    coinpaprikaTicker: 'usdc-usd-coin',
    coinGeckoTicker: 'usd-coin',
    color: '#2775ca',
    background: 'linear-gradient(152.45deg, #0666CE 8.53%, #61A9F8 91.7%)',
    tags: ['stablecoin'],
  },
  {
    symbol: 'SYRUPUSDC',
    precision: 6,
    digits: 2,
    name: 'Syrup USDC',
    icon: syrup_usdc,
    iconCircle: syrup_usdc,
    oracleTicker: 'syrupusdc',
    tags: ['stablecoin'],
  },
  {
    symbol: 'RPL',
    precision: 18,
    digits: 5,
    name: 'Rocket Pool',
    icon: rpl,
    iconCircle: rpl_circle,
    coinGeckoTicker: 'rocket-pool',
    tags: [],
  },
  {
    symbol: 'CRV',
    precision: 18,
    digits: 5,
    name: 'Curve',
    icon: crv,
    iconCircle: crv_circle,
    coinGeckoTicker: 'curve-dao-token',
    tags: [],
  },
  {
    symbol: 'BAL',
    precision: 18,
    digits: 5,
    name: 'Balancer',
    icon: bal,
    iconCircle: bal_circle,
    coinGeckoTicker: 'balancer',
    tags: [],
  },
  {
    symbol: 'LDO',
    precision: 18,
    digits: 5,
    name: 'Lido DAO',
    icon: ldo,
    iconCircle: ldo_circle,
    coinGeckoTicker: 'lido-dao',
    tags: [],
  },
  {
    symbol: 'SUSD',
    precision: 18,
    digits: 5,
    name: 'Synth sUSD',
    icon: susd,
    iconCircle: susd_circle,
    coinGeckoTicker: 'nusd',
    tags: [],
  },
  {
    symbol: 'OP',
    precision: 18,
    digits: 5,
    name: 'Optimism',
    icon: op,
    iconCircle: op_circle,
    coinGeckoTicker: 'optimism',
    tags: [],
  },
  {
    symbol: 'ARB',
    precision: 18,
    digits: 5,
    name: 'Arbitrum',
    icon: arb,
    iconCircle: arb_circle,
    coinGeckoTicker: 'arbitrum',
    tags: [],
  },
  {
    symbol: 'STYETH',
    precision: 18,
    digits: 5,
    name: 'Staked Yearn Ether',
    icon: styeth_circle_color,
    iconCircle: styeth_circle_color,
    coinGeckoTicker: 'staked-yearn-ether',
    coinbaseTicker: '',
    color: '#b49bff',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'AJNA',
    precision: 18,
    digits: 5,
    name: 'AjnaToken',
    icon: ajna_circle_color,
    iconCircle: ajna_circle_color,
    coinGeckoTicker: 'ajna-protocol',
    coinbaseTicker: '',
    rootToken: 'AJNA',
    tags: [],
  },
  {
    symbol: 'MORPHO',
    precision: 18,
    digits: 5,
    name: 'Morpho Blue',
    icon: morpho_circle_color,
    iconCircle: morpho_circle_color,
    tags: [],
  },
  {
    symbol: 'RBN',
    precision: 18,
    digits: 5,
    name: 'Ribbon',
    icon: rbn_circle_color,
    iconCircle: rbn_circle_color,
    coinGeckoTicker: 'ribbon-finance',
    coinbaseTicker: '',
    rootToken: 'RBN',
    tags: [],
  },
  {
    symbol: 'OSETH',
    precision: 18,
    digits: 5,
    name: 'Staked ETH',
    icon: oseth_circle_color,
    iconCircle: oseth_circle_color,
    coinGeckoTicker: 'stakewise-v3-oseth',
    coinbaseTicker: '',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'WEETH',
    precision: 18,
    digits: 5,
    name: 'Wrapped eETH',
    icon: weeth_circle_color,
    iconCircle: weeth_circle_color,
    coinGeckoTicker: 'wrapped-eeth',
    coinbaseTicker: '',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'APXETH',
    precision: 18,
    digits: 5,
    name: 'Autocompounding Pirex Ether',
    icon: apxeth_circle_color,
    iconCircle: apxeth_circle_color,
    coinGeckoTicker: 'dinero-apxeth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'SUSDE',
    precision: 18,
    digits: 5,
    name: 'Ethena Staked USDe',
    icon: susde,
    iconCircle: susde,
    coinGeckoTicker: 'susde',
    tags: ['stablecoin'],
  },
  {
    symbol: 'CSETH',
    precision: 18,
    digits: 5,
    name: 'ClayStack Staked ETH',
    icon: cseth,
    iconCircle: cseth,
    coinGeckoTicker: 'claystack-staked-eth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'DETH',
    precision: 18,
    digits: 5,
    name: 'Stakehouse dETH',
    icon: deth,
    iconCircle: deth,
    coinGeckoTicker: 'stakehouse-deth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'EZETH',
    precision: 18,
    digits: 5,
    name: 'Renzo Restaked ETH',
    icon: ezeth,
    iconCircle: ezeth,
    coinGeckoTicker: 'renzo-restaked-eth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'RSETH',
    precision: 18,
    digits: 5,
    name: 'rsETH',
    icon: rseth,
    iconCircle: rseth,
    coinGeckoTicker: 'kelp-dao-restaked-eth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'MPETH',
    precision: 18,
    digits: 5,
    name: 'MetaPoolETH',
    icon: mpeth,
    iconCircle: mpeth,
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'UNIETH',
    precision: 18,
    digits: 5,
    name: 'Universal ETH',
    icon: unieth,
    iconCircle: unieth,
    coinGeckoTicker: 'universal-eth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'MEVETH',
    precision: 18,
    digits: 5,
    name: 'Mev Liquid Staking',
    icon: meveth,
    iconCircle: meveth,
    coinGeckoTicker: 'meveth',
    rootToken: 'ETH',
    tags: [],
  },
  {
    symbol: 'XETH',
    precision: 18,
    digits: 5,
    name: 'f(x) Protocol Leveraged ETH',
    icon: xeth,
    iconCircle: xeth,
    coinGeckoTicker: 'f-x-protocol-leveraged-eth',
    tags: [],
    rootToken: 'ETH',
  },
  {
    symbol: 'USDE',
    precision: 18,
    digits: 5,
    name: 'USDe',
    icon: usde,
    iconCircle: usde,
    coinGeckoTicker: 'usde',
    tags: [],
    rootToken: 'USD',
  },
  {
    symbol: 'PTWEETH',
    precision: 18,
    digits: 5,
    name: 'Pendle PT-weETH',
    icon: question,
    iconCircle: question,
    iconUnavailable: true,
    tags: [],
  },
  {
    symbol: 'PYUSD',
    precision: 6,
    digits: 5,
    name: 'PayPal USD',
    icon: pyusd,
    iconCircle: pyusd,
    coinGeckoTicker: 'paypal-usd',
    tags: ['stablecoin'],
  },
  {
    symbol: 'CRVUSD',
    precision: 18,
    digits: 5,
    name: 'Curve.Fi USD Stablecoin',
    icon: crv,
    iconCircle: crv_circle,
    coinGeckoTicker: 'crvusd',
    tags: [],
  },
  {
    symbol: 'AETHSDAI',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum sDAI',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-sdai',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHUSDC',
    precision: 6,
    digits: 5,
    name: 'Aave Ethereum USDC',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-usdc',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHUSDT',
    precision: 6,
    digits: 5,
    name: 'Aave Ethereum USDT',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-usdt',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHDAI',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum DAI',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-dai',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHPYUSD',
    precision: 6,
    digits: 5,
    name: 'Aave Ethereum PYUSD',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'paypal-usd', // there is no ticker for Aave PYUSD
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHLUSD',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum LUSD',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'liquity-usd', // there is no ticker for Aave LUSD
    background: '',
    tags: [],
  },
  {
    symbol: 'AUSDC',
    precision: 6,
    digits: 5,
    name: 'Aave interest bearing USDC',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-usdc',
    background: '',
    tags: [],
  },
  {
    symbol: 'ADAI',
    precision: 18,
    digits: 5,
    name: 'Aave interest bearing DAI',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-dai',
    background: '',
    tags: [],
  },
  {
    symbol: 'AUSDT',
    precision: 6,
    digits: 5,
    name: 'Aave interest bearing USDT',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-usdt',
    background: '',
    tags: [],
  },
  {
    symbol: 'CUSDCV3',
    precision: 6,
    digits: 5,
    name: 'Compound v3 USDC',
    icon: compound,
    iconCircle: compound,
    coinGeckoTicker: 'usd-coin', // there is no ticker for Compound v3 USDC
    background: '',
    tags: [],
  },
  {
    symbol: 'CDAI',
    precision: 18,
    digits: 5,
    name: 'Compound Dai',
    icon: compound,
    iconCircle: compound,
    background: '',
    coinGeckoTicker: 'cdai',
    tags: [],
  },
  {
    symbol: 'CUSDC',
    precision: 6,
    digits: 5,
    name: 'Compound USDC',
    icon: compound,
    iconCircle: compound,
    coinGeckoTicker: 'compound-usd-coin',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHWSTETH',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum Wrapped Staked Ether',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-wsteth',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHWETH',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum Wrapped Ether',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    background: '',
    coinGeckoTicker: 'aave-v3-weth',
    tags: [],
  },
  {
    symbol: 'AETHRETH',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum Rocket Pool Ether',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-reth',
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHCBETH',
    precision: 18,
    digits: 5,
    name: 'Aave Ethereum Coinbase Wrapped Staked Ether',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-cbeth',
    background: '',
    tags: [],
  },
  {
    symbol: 'AWETH',
    precision: 18,
    digits: 5,
    name: 'Aave interest bearing Wrapped Ether',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-weth',
    background: '',
    tags: [],
  },
  {
    symbol: 'CETH',
    precision: 18,
    digits: 5,
    name: 'Compound Ether',
    icon: compound,
    iconCircle: compound,
    coinGeckoTicker: 'compound-ether',
    background: '',
    tags: [],
  },
  {
    symbol: 'CWETHV3',
    precision: 18,
    digits: 5,
    name: 'Compound v3 Wrapped Ether',
    icon: compound,
    iconCircle: compound,
    coinGeckoTicker: 'weth', // there is no ticker for Compound v3 Wrapped Ether
    background: '',
    tags: [],
  },
  {
    symbol: 'AETHWBTC',
    precision: 8,
    digits: 5,
    name: 'Aave Ethereum Wrapped Bitcoin',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-v3-wbtc',
    background: '',
    tags: [],
  },
  {
    symbol: 'AWBTC',
    precision: 18,
    digits: 5,
    name: 'Aave interest bearing Wrapped Bitcoin',
    icon: aave_circle_color,
    iconCircle: aave_circle_color,
    coinGeckoTicker: 'aave-wbtc',
    background: '',
    tags: [],
  },
  {
    symbol: 'DEGEN',
    precision: 18,
    digits: 5,
    name: 'Degen',
    coinGeckoTicker: 'degen-base',
    icon: degen,
    iconCircle: degen,
    background: '',
    tags: [],
  },
  {
    symbol: 'ENA',
    precision: 18,
    digits: 5,
    name: 'Ethena',
    icon: ena,
    iconCircle: ena,
    coinGeckoTicker: 'ethena',
    tags: [],
  },
  {
    symbol: 'SNX',
    precision: 18,
    digits: 5,
    name: 'Synthetix Network',
    coinGeckoTicker: 'havven',
    icon: snx,
    iconCircle: snx,
    tags: [],
  },
  {
    symbol: 'AERO',
    precision: 18,
    digits: 5,
    name: 'Aerodrome',
    coinGeckoTicker: 'aerodrome-finance',
    icon: aero,
    iconCircle: aero,
    background: '',
    tags: [],
  },
  {
    symbol: 'PRIME',
    precision: 18,
    digits: 5,
    name: 'Prime',
    coinGeckoTicker: 'echelon-prime',
    icon: prime,
    iconCircle: prime,
    background: '',
    tags: [],
  },
  {
    symbol: 'UNIV2',
    precision: 18,
    digits: 5,
    name: 'Uniswap V2',
    icon: uni_circle_color,
    iconCircle: uni_circle_color,
    background: '',
    tags: [],
  },
  ...deprecatedTokens.map((deprecatedToken) => ({
    symbol: deprecatedToken,
    precision: 18,
    digits: 5,
    digitsInstant: 2,
    name: deprecatedToken,
    icon: deprecated_icon,
    iconCircle: deprecated_icon,
    color: '#ff077d',
    background: 'linear-gradient(160.47deg, #F0F3FD 0.35%, #FCF0FD 99.18%), #FFFFFF',
    tags: [],
  })),
]
