"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "For personal projects and exploration.",
    features: ["Up to 3 users", "5GB storage", "Basic analytics", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    description: "For growing teams that need more power.",
    features: ["Up to 25 users", "50GB storage", "Advanced analytics", "Priority support", "Custom domain", "API access"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    description: "For large organizations with custom needs.",
    features: ["Unlimited users", "500GB storage", "Full analytics suite", "24/7 dedicated support", "SSO / SAML", "SLA guarantee", "Custom integrations"],
  },
]

const INVOICES = [
  { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-2024-010", date: "Oct 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-2024-009", date: "Sep 1, 2024", amount: "$29.00", status: "Paid" },
]

// Plan actual del usuario — conectar con tu backend
const CURRENT_PLAN = "pro"

export default function BillingPage() {
  const [selected, setSelected] = useState(CURRENT_PLAN)
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (planId: string) => {
    if (planId === CURRENT_PLAN) return
    setLoading(true)

    // TODO: conectar con tu proveedor de pagos
    // ─── Stripe ──────────────────────────────────────────────
    // const res = await fetch("/api/billing/create-checkout", {
    //   method: "POST",
    //   body: JSON.stringify({ planId }),
    // })
    // const { url } = await res.json()
    // window.location.href = url
    //
    // ─── Lemon Squeezy ───────────────────────────────────────
    // const res = await fetch("/api/billing/lemonsqueezy", {
    //   method: "POST",
    //   body: JSON.stringify({ planId }),
    // })

    await new Promise((r) => setTimeout(r, 1200))
    setSelected(planId)
    setLoading(false)
  }

  const handleManageBilling = () => {
    // TODO: abrir el portal de Stripe
    // const res = await fetch("/api/billing/portal")
    // const { url } = await res.json()
    // window.location.href = url
    alert("Conecta tu portal de Stripe aquí")
  }

  return (
    <div>

      {/* Back — solo mobile */}
      <Link
        href="/dashboard/settings"
        className="lg:hidden flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition mb-6"
      >
        <ArrowLeft size={14} />
        Settings
      </Link>

      <div className="flex flex-col gap-6">

        {/* Plan actual */}
        <div className="bg-zinc-900 border border-white/8 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Current plan</p>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Pro</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 font-medium">
                  Active
                </span>
              </div>
              <p className="text-zinc-400 text-sm mt-1">
                $29/month · Renews on <span className="text-white">January 1, 2025</span>
              </p>
            </div>
            <Button
              onClick={handleManageBilling}
              variant="ghost"
              className="border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 h-9 text-sm"
            >
              Manage billing
            </Button>
          </div>

          {/* Usage bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Users</span>
              <span>8 / 25</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "32%" }} />
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Storage</span>
              <span>12GB / 50GB</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 rounded-full" style={{ width: "24%" }} />
            </div>
          </div>
        </div>

        {/* Planes */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Change plan</h3>
          <div className="grid grid-cols-1 gap-4">
            {PLANS.map((plan) => {
              const isCurrent = plan.id === CURRENT_PLAN
              const isSelected = plan.id === selected

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border p-5 transition-all cursor-pointer ${
                    isSelected
                      ? "border-cyan-500/50 bg-cyan-500/5"
                      : "border-white/8 bg-zinc-900 hover:border-white/15"
                  }`}
                  onClick={() => setSelected(plan.id)}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-5">
                      <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-cyan-500 text-black font-semibold">
                        <Zap size={10} />
                        Most popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-semibold text-white">{plan.name}</h4>
                        {isCurrent && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-white/10">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-xs">{plan.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-white">
                        {plan.price === 0 ? "Free" : `$${plan.price}`}
                      </p>
                      {plan.price > 0 && (
                        <p className="text-xs text-zinc-500">/ month</p>
                      )}
                    </div>
                  </div>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                        <Check size={12} className="text-cyan-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          {selected !== CURRENT_PLAN && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => handleUpgrade(selected)}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-10 px-6"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Switch to ${PLANS.find((p) => p.id === selected)?.name}`
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Historial de pagos */}
        <div className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/8">
            <h3 className="text-sm font-semibold text-white">Payment history</h3>
          </div>
          <div className="divide-y divide-white/5">
            {INVOICES.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm text-white font-medium">{inv.id}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white">{inv.amount}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {inv.status}
                  </span>
                  <button className="text-xs text-zinc-500 hover:text-cyan-400 transition">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}