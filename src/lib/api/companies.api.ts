import { config } from "@/lib/config"
import { api } from "@/lib/api/client"
import { companies as mockCompanies } from "@/data/companies"
import type { Company } from "@/types"

/**
 * Companies API. Levert "De 126 Bedrijven" aan voor het Onboarding-overzicht.
 * Valt automatisch terug op de meegeleverde dataset als er geen backend is.
 */
export const companiesApi = {
  async list(): Promise<Company[]> {
    if (config.useMock) {
      await wait(150)
      return mockCompanies
    }
    return api.get<Company[]>("/companies")
  },

  async getById(id: number): Promise<Company | null> {
    if (config.useMock) {
      await wait(100)
      return mockCompanies.find((c) => c.id === id) ?? null
    }
    return api.get<Company>(`/companies/${id}`)
  },
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
