import { VvcOnboardingNewFlow } from "./new-flow/VvcOnboardingNewFlow"

/**
 * Hoofdpagina voor VVC Onboarding.
 * Rendert standaard de "New Flow" (VVC Onboarding New Flow met 7 Kaarten).
 * De oude flow is beschikbaar onder /onboarding/old-flow of via de flow-switcher.
 */
export default function OnboardingPage() {
  return <VvcOnboardingNewFlow />
}
