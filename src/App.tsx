import { Navigate, Route, Routes } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { ProtectedRoute, PublicOnlyRoute } from "@/routes/ProtectedRoute"
import { AppShell } from "@/components/layout/AppShell"
import { AuthLayout } from "@/components/layout/AuthLayout"
import LoginPage from "@/pages/auth/Login"
import DashboardPage from "@/pages/dashboard/Dashboard"
import OnboardingPage from "@/pages/onboarding/Onboarding"
import CompaniesPage from "@/pages/onboarding/Companies"
import AcademyPage from "@/pages/onboarding/Academy"
import AnalyticsPage from "@/pages/analytics/Analytics"
import CommunityPage from "@/pages/community/Community"
import ProspectsPage from "@/pages/prospects/Prospects"
import TalentenPage from "@/pages/talenten/Talenten"
import AppDetailPage from "@/pages/apps/AppDetail"
import NotFoundPage from "@/pages/NotFound"

/**
 * Route-tree.
 *
 * Public:
 *   /login                       → AuthLayout + LoginPage
 *
 * Protected (binnen <AppShell />):
 *   /dashboard                   → DashboardPage   (overgenomen uit app2)
 *   /onboarding                  → OnboardingPage  (welcome / hero — uit app1)
 *   /onboarding/companies        → CompaniesPage   (De 126 Bedrijven — uit app1)
 *   /onboarding/academy          → AcademyPage     (uit app1)
 *   /analytics                   → AnalyticsPage   (placeholder uit app2)
 *   /community                   → CommunityPage   (placeholder uit app2)
 *   /prospects                   → ProspectsPage   (placeholder uit app2)
 *   /talenten                    → TalentenPage    (placeholder uit app2)
 *   /apps/:appId                 → AppDetailPage   (uit app2)
 */
export default function App() {
  return (
    <>
      <Routes>
        {/* Default → redirect naar dashboard (ProtectedRoute zorgt voor /login fallback). */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public-only */}
        <Route element={<PublicOnlyRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Route>

        {/* Protected app */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppShell />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/companies" element={<CompaniesPage />} />
            <Route path="/onboarding/academy" element={<AcademyPage />} />

            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/prospects" element={<ProspectsPage />} />
            <Route path="/talenten" element={<TalentenPage />} />

            <Route path="/apps/:appId" element={<AppDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster richColors position="top-right" />
    </>
  )
}
