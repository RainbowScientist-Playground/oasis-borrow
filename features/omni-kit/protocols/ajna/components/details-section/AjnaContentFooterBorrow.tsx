import type BigNumber from 'bignumber.js'
import type { ChangeVariantType } from 'components/DetailsSectionContentCard'
import { DetailsSectionContentSimpleModal } from 'components/DetailsSectionContentSimpleModal'
import { DetailsSectionFooterItem } from 'components/DetailsSectionFooterItem'
import { Icon } from 'components/Icon'
import { Skeleton } from 'components/Skeleton'
import { StatefulTooltip } from 'components/Tooltip'
import { useAjnaRewards } from 'features/ajna/rewards/hooks'
import { isPoolWithRewards } from 'features/omni-kit/protocols/ajna/helpers'
import { formatCryptoBalance, formatDecimalAsPercent } from 'helpers/formatters/format'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ajnaExtensionTheme } from 'theme'
import { sparks } from 'theme/icons'
import { Text } from 'theme-ui'

interface AjnaContentFooterBorrowProps {
  afterAvailableToBorrow?: BigNumber
  afterAvailableToWithdraw?: BigNumber
  availableToBorrow: BigNumber
  availableToWithdraw: BigNumber
  changeVariant?: ChangeVariantType
  collateralToken: string
  cost: BigNumber
  isLoading?: boolean
  owner: string
  quoteToken: string
}

export function AjnaContentFooterBorrow({
  afterAvailableToBorrow,
  afterAvailableToWithdraw,
  availableToBorrow,
  availableToWithdraw,
  changeVariant,
  collateralToken,
  cost,
  isLoading,
  owner,
  quoteToken,
}: AjnaContentFooterBorrowProps) {
  const { t } = useTranslation()
  const userAjnaRewards = useAjnaRewards(owner)

  const formatted = {
    cost: formatDecimalAsPercent(cost),
    availableToBorrow: `${formatCryptoBalance(availableToBorrow)} ${quoteToken}`,
    afterAvailableToBorrow:
      afterAvailableToBorrow && `${formatCryptoBalance(afterAvailableToBorrow)} ${quoteToken}`,
    availableToWithdraw: `${formatCryptoBalance(availableToWithdraw)} ${collateralToken}`,
    afterAvailableToWithdraw:
      afterAvailableToWithdraw &&
      `${formatCryptoBalance(afterAvailableToWithdraw)} ${collateralToken}`,
  }

  return (
    <>
      <DetailsSectionFooterItem
        title={t('ajna.position-page.borrow.common.footer.borrow-rate')}
        value={
          <>
            {isPoolWithRewards({ collateralToken, quoteToken }) && (
              <StatefulTooltip
                tooltip={
                  <>
                    <Text as="p">
                      <strong>
                        {t('ajna.position-page.borrow.common.footer.earned-ajna-tokens')}
                      </strong>
                      :{' '}
                      {t('ajna.position-page.borrow.common.footer.earned-ajna-tokens-tooltip-desc')}
                    </Text>
                    <Text as="p" sx={{ mt: 2, fontWeight: 'semiBold' }}>
                      {userAjnaRewards.isLoading ? (
                        <Skeleton width="64px" />
                      ) : (
                        `${formatCryptoBalance(userAjnaRewards.rewards.tokens)} AJNA ${t('earned')}`
                      )}
                    </Text>
                  </>
                }
                containerSx={{ position: 'relative', top: '2px', display: 'inline-block', mr: 1 }}
                tooltipSx={{
                  width: '300px',
                  fontSize: 1,
                  whiteSpace: 'initial',
                  textAlign: 'left',
                  border: 'none',
                  borderRadius: 'medium',
                  boxShadow: 'buttonMenu',
                  fontWeight: 'regular',
                  lineHeight: 'body',
                }}
              >
                <Icon size={16} icon={sparks} color="interactive100" />
              </StatefulTooltip>
            )}
            {formatted.cost}
          </>
        }
        modal={
          <DetailsSectionContentSimpleModal
            title={t('ajna.position-page.borrow.common.footer.borrow-rate')}
            description={t('ajna.position-page.borrow.common.footer.borrow-rate-modal-desc')}
            value={formatted.cost}
            theme={ajnaExtensionTheme}
          />
        }
      />
      <DetailsSectionFooterItem
        title={t('ajna.position-page.borrow.common.footer.available-to-withdraw')}
        value={formatted.availableToWithdraw}
        change={{
          isLoading,
          value:
            afterAvailableToWithdraw &&
            `${formatted.afterAvailableToWithdraw} ${t('system.cards.common.after')}`,
          variant: changeVariant,
        }}
        modal={
          <DetailsSectionContentSimpleModal
            title={t('ajna.position-page.borrow.common.footer.available-to-withdraw')}
            description={t(
              'ajna.position-page.borrow.common.footer.available-to-withdraw-modal-desc',
            )}
            value={formatted.availableToWithdraw}
            theme={ajnaExtensionTheme}
          />
        }
      />
      <DetailsSectionFooterItem
        title={t('ajna.position-page.borrow.common.footer.available-to-borrow')}
        value={formatted.availableToBorrow}
        change={{
          isLoading,
          value:
            afterAvailableToBorrow &&
            `${formatted.afterAvailableToBorrow} ${t('system.cards.common.after')}`,
          variant: changeVariant,
        }}
        modal={
          <DetailsSectionContentSimpleModal
            title={t('ajna.position-page.borrow.common.footer.available-to-borrow')}
            description={t(
              'ajna.position-page.borrow.common.footer.available-to-borrow-modal-desc',
            )}
            value={formatted.availableToBorrow}
            theme={ajnaExtensionTheme}
          />
        }
      />
    </>
  )
}