import { ajnaFormExternalSteps, ajnaFormStepsWithTransaction } from 'features/ajna/common/consts'
import { AjnaFlow, AjnaProduct, AjnaSidebarStep } from 'features/ajna/common/types'

export interface GeneralStepManager {
  currentStep: AjnaSidebarStep
}

export function isExternalStep({ currentStep }: GeneralStepManager) {
  return ajnaFormExternalSteps.includes(currentStep)
}

export function isNextStep({
  currentStep,
  step,
  steps,
}: GeneralStepManager & { step: AjnaSidebarStep; steps: AjnaSidebarStep[] }) {
  return steps.indexOf(step) > steps.indexOf(currentStep)
}

export function isStepWithTransaction({ currentStep }: GeneralStepManager) {
  return ajnaFormStepsWithTransaction.includes(currentStep)
}

export const getAjnaEditingStep = ({
  flow,
  currentStep,
  product,
}: {
  flow: AjnaFlow
  currentStep: AjnaSidebarStep
  product: AjnaProduct
}) => {
  const defaultEditingStep = flow === 'open' ? 'setup' : 'manage'

  switch (product) {
    case 'borrow':
    case 'multiply':
      return defaultEditingStep
    case 'earn':
      if (flow === 'open') {
        return currentStep === 'transaction' ? 'nft' : 'setup'
      }

      return defaultEditingStep
    default:
      return defaultEditingStep
  }
}
