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
  birthDate: string // YYYY-MM-DD
  cvFileName: string
  motivationLetter: string
  avatarUrl: string
  idDocumentName: string
  idFrontDocumentName: string
  idBackDocumentName: string
  referralCode: string
  hasKvk: boolean
  kvkNumber: string
  btwNumber: string
  hasLtd: boolean
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
