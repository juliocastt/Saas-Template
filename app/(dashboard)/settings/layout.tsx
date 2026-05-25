"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, CreditCard, Bell } from "lucide-react"

const settingsLinks = [
  { href: "/settings/profile",       icon: User,       label: "Profile",       description: "Personal info and password" },
  { href: "/settings/billing",        icon: CreditCard, label: "Billing",       description: "Plan and payment history" },
  { href: "/settings/notifications",  icon: Bell,       label: "Notifications", description: "Email preferences" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage your account preferences</p>
      </div>

      {/* MOBILE — tarjetas (solo visible si no hay subruta activa) */}
      <div className="lg:hidden">
        {pathname === "/dashboard/settings" ? (
          <div className="flex flex-col gap-3">
            {settingsLinks.map(({ href, icon: Icon, label, description }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-white/8 hover:border-white/15 hover:bg-zinc-800/60 transition group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-zinc-600 group-hover:text-zinc-400 transition shrink-0">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        ) : (
          /* En mobile dentro de una subruta, muestra el contenido directo */
          <div>{children}</div>
        )}
      </div>

      {/* DESKTOP — sidebar + contenido */}
      <div className="hidden lg:grid grid-cols-[220px_1fr] gap-8">

        {/* Sidebar de settings */}
        <nav className="flex flex-col gap-1">
          {settingsLinks.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${active
                    ? "bg-white/8 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon
                  size={16}
                  className={`shrink-0 ${active ? "text-cyan-400" : ""}`}
                />
                {label}
                {active && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-cyan-400" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Contenido de la página */}
        <div className="min-w-0">{children}</div>

      </div>

    </div>
  )
}