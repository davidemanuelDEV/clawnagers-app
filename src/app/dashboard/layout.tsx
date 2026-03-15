"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth, useDashboardData } from "@/lib/hooks"
import { createContext, useContext } from "react"
import type { DashboardData } from "@/lib/hooks"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/students", label: "Students", icon: "👥" },
  { href: "/dashboard/curriculum", label: "Curriculum", icon: "📚" },
  { href: "/dashboard/demo-day", label: "Demo Day", icon: "🏆" },
]

// Context to share dashboard data across child pages
export const DashboardContext = createContext<{
  data: DashboardData | null
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}>({
  data: null,
  loading: true,
  error: null,
  reload: async () => {},
})

export const useDashboard = () => useContext(DashboardContext)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useAuth()
  const dashboardData = useDashboardData()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-4 animate-pulse">🦞</span>
          <p className="text-white/50">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (dashboardData.error || !dashboardData.data) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl block mb-4">⚠️</span>
          <p className="text-white/70 mb-2">Unable to load dashboard</p>
          <p className="text-white/40 text-sm mb-4">{dashboardData.error || "No school data found"}</p>
          <Button onClick={handleSignOut} variant="ghost" className="text-white/40 hover:text-white">
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  const { school, teacher } = dashboardData.data

  return (
    <DashboardContext.Provider value={dashboardData}>
      <div className="min-h-screen bg-[#0f0f23]">
        {/* Top Nav */}
        <nav className="border-b border-white/10 bg-[#1a1a2e]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl">🦞</span>
              <span className="hidden sm:inline">Clawnagers</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-white font-medium">{teacher.name}</div>
                <div className="text-xs text-white/40">{school.name}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-sm">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-white/40 hover:text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto flex">
          {/* Sidebar */}
          <aside className="w-56 shrink-0 border-r border-white/10 min-h-[calc(100vh-57px)] p-4 hidden md:block">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#FF6B35]/10 text-[#FF6B35]"
                          : "text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {item.label}
                    </div>
                  </Link>
                )
              })}
            </nav>
            <div className="mt-8 p-3 rounded-lg bg-[#1a1a2e] border border-white/5">
              <div className="text-xs text-white/30 mb-1">SCHOOL</div>
              <div className="text-sm text-white font-medium">{school.name}</div>
              <div className="text-xs text-white/40 mt-0.5">
                {school.district ? `${school.district}, ` : ''}{school.state}
              </div>
              <div className="text-xs text-white/30 mt-2">LICENSE</div>
              <div className="text-xs text-[#FF6B35]">
                {school.license_end ? `Active until ${school.license_end}` : 'Active'}
              </div>
            </div>
          </aside>

          {/* Mobile Nav */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#1a1a2e]/95 backdrop-blur-sm z-50">
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex flex-col items-center gap-1 px-3 py-1 ${
                      isActive ? "text-[#FF6B35]" : "text-white/40"
                    }`}>
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 pb-24 md:pb-8 min-h-[calc(100vh-57px)]">
            {children}
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}
