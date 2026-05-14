import { useState } from "react"
import { Outlet } from "react-router"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

/**
 * Hoofdlayout voor alle protected routes. Sidebar + header + scrollable
 * content area. Sidebar is een off-canvas drawer op mobile.
 */
export function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-black font-sans text-white overflow-hidden">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-black">
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar relative">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
