import BigNumber from 'bignumber.js'
import { IlkData } from 'blockchain/ilks'
import { Context } from 'blockchain/network'
import { Vault } from 'blockchain/vaults'
import { TxHelpers } from 'components/AppContext'
import { useAppContext } from 'components/AppContextProvider'
import { useAutomationContext } from 'components/AutomationContextProvider'
import { getShouldRemoveAllowance } from 'features/automation/common/helpers'
import { AutoBuyFormControl } from 'features/automation/optimization/controls/AutoBuyFormControl'
import { getActiveOptimizationFeature } from 'features/automation/protection/common/helpers'
import {
  AUTOMATION_CHANGE_FEATURE,
  AutomationChangeFeature,
} from 'features/automation/protection/common/UITypes/AutomationFeatureChange'
import { VaultType } from 'features/generalManageVault/vaultType'
import { BalanceInfo } from 'features/shared/balanceInfo'
import { useUIChanges } from 'helpers/uiChangesHook'
import React, { useEffect } from 'react'

import { ConstantMultipleFormControl } from './ConstantMultipleFormControl'

interface OptimizationFormControlProps {
  vault: Vault
  vaultType: VaultType
  ilkData: IlkData
  txHelpers?: TxHelpers
  context: Context
  balanceInfo: BalanceInfo
  ethMarketPrice: BigNumber
}

export function OptimizationFormControl({
  vault,
  vaultType,
  ilkData,
  txHelpers,
  context,
  balanceInfo,
  ethMarketPrice,
}: OptimizationFormControlProps) {
  const {
    stopLossTriggerData,
    autoSellTriggerData,
    autoBuyTriggerData,
    constantMultipleTriggerData,
    automationTriggersData,
  } = useAutomationContext()

  const { uiChanges } = useAppContext()
  const [activeAutomationFeature] = useUIChanges<AutomationChangeFeature>(AUTOMATION_CHANGE_FEATURE)

  const { isConstantMultipleActive, isAutoBuyActive } = getActiveOptimizationFeature({
    currentOptimizationFeature: activeAutomationFeature?.currentOptimizationFeature,
    isAutoBuyOn: autoBuyTriggerData.isTriggerEnabled,
    isConstantMultipleOn: constantMultipleTriggerData.isTriggerEnabled,
    section: 'form',
  })

  const shouldRemoveAllowance = getShouldRemoveAllowance(automationTriggersData)

  useEffect(() => {
    if (autoBuyTriggerData.isTriggerEnabled) {
      uiChanges.publish(AUTOMATION_CHANGE_FEATURE, {
        type: 'Optimization',
        currentOptimizationFeature: 'autoBuy',
      })
    }
    if (constantMultipleTriggerData.isTriggerEnabled) {
      uiChanges.publish(AUTOMATION_CHANGE_FEATURE, {
        type: 'Optimization',
        currentOptimizationFeature: 'constantMultiple',
      })
    }
  }, [])

  return (
    <>
      <AutoBuyFormControl
        vault={vault}
        vaultType={vaultType}
        ilkData={ilkData}
        balanceInfo={balanceInfo}
        autoSellTriggerData={autoSellTriggerData}
        autoBuyTriggerData={autoBuyTriggerData}
        stopLossTriggerData={stopLossTriggerData}
        constantMultipleTriggerData={constantMultipleTriggerData}
        isAutoBuyOn={autoBuyTriggerData.isTriggerEnabled}
        context={context}
        txHelpers={txHelpers}
        ethMarketPrice={ethMarketPrice}
        isAutoBuyActive={isAutoBuyActive}
        shouldRemoveAllowance={shouldRemoveAllowance}
      />
      <ConstantMultipleFormControl
        context={context}
        isConstantMultipleActive={isConstantMultipleActive}
        txHelpers={txHelpers}
        vault={vault}
        ethMarketPrice={ethMarketPrice}
        ilkData={ilkData}
        autoSellTriggerData={autoSellTriggerData}
        autoBuyTriggerData={autoBuyTriggerData}
        stopLossTriggerData={stopLossTriggerData}
        constantMultipleTriggerData={constantMultipleTriggerData}
        balanceInfo={balanceInfo}
        shouldRemoveAllowance={shouldRemoveAllowance}
      />
    </>
  )
}
