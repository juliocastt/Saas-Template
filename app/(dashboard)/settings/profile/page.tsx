"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type SaveState = "idle" | "loading" | "saved" | "error"

function Section({ title, description, children }: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 py-8 first:pt-0">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

export default function ProfilePage() {
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const [passwordState, setPasswordState] = useState<SaveState>("idle")
  const [showPasswords, setShowPasswords] = useState(false)

  const handleSaveProfile = async () => {
    setSaveState("loading")
    // TODO: conectar con tu API
    // await fetch("/api/user/profile", {
    //   method: "PATCH",
    //   body: JSON.stringify({ name, email }),
    // })
    await new Promise((r) => setTimeout(r, 1000))
    setSaveState("saved")
    setTimeout(() => setSaveState("idle"), 2500)
  }

  const handleSavePassword = async () => {
    setPasswordState("loading")
    // TODO: conectar con tu API
    // await fetch("/api/user/password", {
    //   method: "PATCH",
    //   body: JSON.stringify({ currentPassword, newPassword }),
    // })
    await new Promise((r) => setTimeout(r, 1000))
    setPasswordState("saved")
    setTimeout(() => setPasswordState("idle"), 2500)
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

      <div className="bg-zinc-900 border border-white/8 rounded-2xl px-6 divide-y divide-white/8">

        {/* Personal info */}
        <Section
          title="Personal information"
          description="Update your name and email address."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">First name</Label>
              <Input
                defaultValue="John"
                className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">Last name</Label>
              <Input
                defaultValue="Doe"
                className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">Email address</Label>
            <Input
              type="email"
              defaultValue="john@email.com"
              className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">
              Job title{" "}
              <span className="text-zinc-600 font-normal">— optional</span>
            </Label>
            <Input
              placeholder="e.g. Product Manager"
              className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
            />
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveProfile}
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
              {saveState === "saved" ? "✓ Saved" : saveState === "loading" ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </Section>

        {/* Password */}
        <Section
          title="Password"
          description="Use a strong password with at least 8 characters, one uppercase letter, one number, and one special character."
        >
          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">Current password</Label>
            <Input
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">New password</Label>
            <Input
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">Confirm new password</Label>
            <Input
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              className="bg-zinc-950 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="text-xs text-zinc-500 hover:text-white transition"
            >
              {showPasswords ? "Hide passwords" : "Show passwords"}
            </button>

            <Button
              onClick={handleSavePassword}
              disabled={passwordState === "loading"}
              className={`h-9 px-5 text-sm font-semibold transition-all ${
                passwordState === "saved"
                  ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                  : "bg-cyan-500 hover:bg-cyan-400 text-black"
              }`}
            >
              {passwordState === "loading" && (
                <svg className="animate-spin h-3.5 w-3.5 mr-2" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
              )}
              {passwordState === "saved" ? "✓ Updated" : passwordState === "loading" ? "Updating..." : "Update password"}
            </Button>
          </div>
        </Section>

        {/* Danger zone */}
        <Section
          title="Danger zone"
          description="Permanently delete your account and all associated data. This action cannot be undone."
        >
          <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/5">
            <div>
              <p className="text-sm font-medium text-white">Delete account</p>
              <p className="text-xs text-zinc-500 mt-0.5">All your data will be permanently removed.</p>
            </div>
            <Button
              variant="ghost"
              className="h-9 px-4 text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 hover:text-red-300 shrink-0"
            >
              Delete
            </Button>
          </div>
        </Section>

      </div>
    </div>
  )
}