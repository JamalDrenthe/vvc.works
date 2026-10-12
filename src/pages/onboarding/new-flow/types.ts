export type Gender = "Man" | "Vrouw" | "Anders"

export interface RegistrationData {
  crmosCode: string
  isCrmosFetched: boolean
  gender: Gender | ""
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  street: string
  houseNumber: string
  houseNumberAddition: string
  postalCode: string
  country: string
  preferredLanguage: string
  secondaryContact: string
  // Accountbeveiliging en verificatie
  isEmailVerified: boolean
  isPhoneVerified: boolean
  phoneOtpCode: string
  twoFactorEnabled: boolean
  twoFactorMethod: "sms" | "authenticator" | "email"
  loginMethod: "google" | "email" | "passkey"
  birthDate: string // YYYY-MM-DD
  // Uploads & Documenten
  cvFileName: string
  motivationLetter: string
  avatarUrl: string // Optioneel
  idDocumentName: string
  idFrontDocumentName: string
  idBackDocumentName: string
  // Bedrijfsstructuur
  referralCode: string
  hasKvk: boolean
  kvkNumber: string
  btwNumber: string
  hasLtd: boolean
  // Privacy, voorwaarden en toestemmingen
  privacyAccepted: boolean
  termsAccepted: boolean
  partnerDataSharingAccepted: boolean
  retentionPolicyAccepted: boolean
}

export interface Step2Data {
  videoWatched: boolean
  q1Credo: string
  q2Partners: string
  q3Matrix: string
  quizPassed: boolean
  wantsPassiveIncome: boolean
  hoursPerWeek: string
  trajectoryDuration: "1 jaar" | "2 jaar" | "3 jaar" | "onbepaalde tijd" | ""
  contractType: "in dienst" | "zzp" | "partnership" | "franchise" | ""
  // Overeenkomsten en juridische status
  contractSigned: boolean
  signatureName: string
  signatureDate: string
  contractAgreedDuration: string
  contractTerminationTermsAccepted: boolean
  // Financiële en administratieve gegevens
  iban: string
  accountHolderName: string
  payoutMethod: "sepa" | "crypto" | "batch"
  invoiceEmail: string
  taxStatus: "standard" | "vat_exempt" | "reverse_charge"
  incomeTermsAccepted: boolean
}

export interface Step3Data {
  videoWatched: boolean
  pdfRead: boolean
  enteredEcosystem: boolean
  wantsShares: boolean
  q1Quantum: string
  connected: boolean
  progress: number
}

export interface Step4Data {
  videoWatched: boolean
  pdfRead: boolean
  q1Investbotiq: string
  connected: boolean
  progress: number
  iqAgentActive: boolean
  iqBotActive: boolean
}

export interface PlatformConnection {
  id: string
  name: string
  category: "internal" | "quality_1" | "quality_2"
  description: string
  connected: boolean
  progress: number
  emailConfirmed: boolean
  iconType?: string
}

export interface EmailConfirmationData {
  platformName: string
  recipientEmail: string
  confirmationCode: string
  timestamp: string
}
