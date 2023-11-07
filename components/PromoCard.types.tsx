import type { ThemeUIStyleObject } from 'theme-ui'

import type { IconProps } from './Icon.types'
import type { ProtocolLabelProps } from './ProtocolLabel.types'
import type { TranslatableType } from './Translatable.types'

export type PromoCardVariant = 'neutral' | 'positive' | 'negative'

export interface PromoCardWrapperProps {
  link?: string
  sx?: ThemeUIStyleObject
}
interface PromoCardPropsWithIcon {
  icon: IconProps['icon']
  image?: never
  tokens?: never
}
interface PromoCardPropsWithImage {
  icon?: never
  image: string
  tokens?: never
}
interface PromoCardPropsWithTokens {
  icon?: never
  image?: never
  tokens: string[]
}

export type PromoCardProps = (
  | PromoCardPropsWithIcon
  | PromoCardPropsWithImage
  | PromoCardPropsWithTokens
) & {
  title: TranslatableType
  protocol?: ProtocolLabelProps
  description?: TranslatableType
  pills?: {
    label: TranslatableType
    variant?: PromoCardVariant
  }[]
  link?: {
    href: string
    label?: TranslatableType
  }
  data?: {
    label: TranslatableType
    value: TranslatableType
    variant?: PromoCardVariant
  }[]
  sx?: ThemeUIStyleObject
}
