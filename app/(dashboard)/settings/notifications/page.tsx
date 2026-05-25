"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

type SaveState = "idle" | "loading" | "saved"

interface Toggle {
  id: string
  label: string
  description: string
  defaultValue: boolean
}

interface NotifGroup {
  title: string
  description: string
  toggles: Toggle[]
}

const NOTIF_GROUPS: NotifGroup[] = [
  {
    title: "Activity",
    description: "Notifications about what happens in your account.",
    toggles: [
      { id: "new_user",    label: "New user registered",   description: "When someone joins your workspace.",         defaultValue: true  },
      { id: "new_comment", label: "New comment",           description: "When someone comments on your content.",     defaultValue: true  },
      { id: "mentions",    label: "Mentions",              description: "When someone mentions you directly.",         defaultValue: true  },
    ],
  },
  {
    title: "Billing",
    description: "Stay on top of your plan and payments.",
    toggles: [
      { id: "payment_ok",  label: "Payment confirmed",     description: "When a payment is processed successfully.",  defaultValue: true  },
      { id: "payment_fail",label: "Payment failed",        description: "When a payment attempt fails.",              defaultValue: true  },
      { id: "plan_change", label: "Plan changes",          description: "When your subscription changes.",            defaultValue: true  },
      { id: "invoice",     label: "New invoice available", description: "When a new invoice is generated.",           defaultValue: false },
    ],
  },
  {
    title: "Security",
    description: "Important alerts about your account security.",
    toggles: [
      { id: "new_login",   label: "New sign-in detected",  description: "When your account is accessed from a new device.", defaultValue: true  },
      { id: "pwd_changed", label: "Password changed",      description: "When your password is updated.",            defaultValue: true  },
      { id: "two_fa",      label: "Two-factor changes",    description: "When 2FA is enabled or disabled.",          defaultValue: true  },
    ],
  },
  {
    title: "Product updates",
    description: "News about new features and improvements.",
    toggles: [
      { id: "changelog",   label: "Changelog",             description: "Monthly summary of what's new.",            defaultValue: false },
      { id: "tips",        label: "Tips & tutorials",      description: "Helpful guides to get the most out of NovaUI.", defaultValue: false },
    ],
  },
]

function buildDefaults(): Record<string, boolean> {
  const map: Record<string, boolean> = {}
  NOTIF_GROUPS.forEach((g) => g.toggles.forEach((t) => { map[t.id] = t.defaultValue }))
  return map
}

function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`
        relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent
        transition-colors duration-200 focus-visible:outline-none
        ${checked ? "bg-cyan-500" : "bg-zinc-700"}
      `}
    >
      <span
        className={`
          pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow
          transition-transform duration-200
          ${checked ? "translate-x-4" : "translate-x-0"}
        `}
      />
    </button>
  )
}

export default function NotificationsPage() {
  const [values, setValues]     = useState(buildDefaults)
  const [saveState, setSaveState] = useState<SaveState>("idle")

  const toggle = (id: string) => {
    setValues((prev) => ({ ...prev, [id]: !prev[id] }))
    if (saveState === "saved") setSaveState("idle")
  }

  const handleSave = async () => {
    setSaveState("loading")
    // TODO: conectar con tu API
    // await fetch("/api/user/notifications", {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // })
    await new Promise((r) => setTimeout(r, 1000))
    setSaveState("saved")
    setTimeout(() => setSaveState("idle"), 2500)
  }

  const handleUnsubscribeAll = () => {
    setValues((prev) => Object.fromEntries(Object.keys(prev).map((k) => [k, false])))
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

      <div className="flex flex-col gap-4">

        {NOTIF_GROUPS.map((group) => (
          <div
            key={group.title}
            className="bg-zinc-900 border border-white/8 rounded-2xl overflow-hidden"
          >
            {/* Group header */}
            <div className="px-6 py-4 border-b border-white/8">
              <h3 className="text-sm font-semibold text-white">{group.title}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">{group.description}</p>
            </div>

            {/* Toggles */}
            <div className="divide-y divide-white/5">
              {group.toggles.map((toggle_item) => (
                <div
                  key={toggle_item.id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div>
                    <p className="text-sm text-white font-medium">{toggle_item.label}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{toggle_item.description}</p>
                  </div>
                  <Switch
                    checked={values[toggle_item.id]}
                    onChange={() => toggle(toggle_item.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            onClick={handleUnsubscribeAll}
            className="text-sm text-zinc-500 hover:text-white transition"
          >
            Unsubscribe from all
          </button>

          <Button
            onClick={handleSave}
            disabled={saveState === "loading"}
            className={`h-9 px-5 text-sm font-semibold transition-all ${
              saveState === "saved"
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : "bg-cyan-500 hover:bg-cyan-400 text-black"
            }`}
          >
            {saveState === "loading" && (
              <svg className="animate-spin h-3.5 w-3.5 mr-2" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
              </svg>
            )}
            {saveState === "saved" ? "✓ Saved" : saveState === "loading" ? "Saving..." : "Save preferences"}
          </Button>
        </div>

      </div>
    </div>
  )
}