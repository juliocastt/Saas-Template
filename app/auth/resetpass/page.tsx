"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, X } from "lucide-react"

// Next.js: obtén el token desde los search params
// import { useSearchParams } from "next/navigation"

type Step = "idle" | "loading" | "success" | "error"

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number",           test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

export default function ResetPassword() {
  const [password, setPassword]       = useState("")
  const [confirm, setConfirm]         = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm]   = useState(false)
  const [step, setStep]               = useState<Step>("idle")
  const [errorMsg, setErrorMsg]       = useState("")

  // Para obtener el token de la URL:
  // const searchParams = useSearchParams()
  // const token = searchParams.get("token")

  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password))
  const passwordsMatch = confirm.length > 0 && password === confirm
  const canSubmit      = allRulesPassed && passwordsMatch && step !== "loading"

  const handleSubmit = async () => {
    if (!canSubmit) return

    setStep("loading")
    setErrorMsg("")

    try {
      // TODO: conectar con tu proveedor de auth
      // ─── Supabase ───────────────────────────────────────────
      // const { error } = await supabase.auth.updateUser({ password })
      // if (error) throw error
      //
      // ─── Firebase ───────────────────────────────────────────
      // const oobCode = new URLSearchParams(window.location.search).get("oobCode")
      // await confirmPasswordReset(auth, oobCode!, password)
      //
      // ─── API propia ─────────────────────────────────────────
      // const token = new URLSearchParams(window.location.search).get("token")
      // const res = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token, password }),
      // })
      // if (!res.ok) {
      //   const data = await res.json()
      //   throw new Error(data.message || "Invalid or expired link")
      // }

      // Simulación — eliminar cuando conectes el backend
      await new Promise((resolve) => setTimeout(resolve, 1400))

      // Simula un token expirado con: setStep("error"); setErrorMsg("expired")
      setStep("success")
    } catch (err: any) {
      const isExpired =
        err?.message?.toLowerCase().includes("expired") ||
        err?.message?.toLowerCase().includes("invalid")

      setErrorMsg(isExpired ? "expired" : "generic")
      setStep("error")
    }
  }

  // ─── TOKEN INVÁLIDO / EXPIRADO ──────────────────────────────
  if (step === "error" && errorMsg === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Link expired</h2>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
              This password reset link is invalid or has expired.
              Reset links are only valid for 30 minutes.
            </p>
          </div>

          <Link href="/auth/forgot-password">
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11">
              Request a new link
            </Button>
          </Link>

          <div className="flex justify-center mt-6">
            <Link
              href="/auth/login"
              className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition"
            >
              <ArrowLeft size={14} />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── SUCCESS ────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Password updated</h2>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
              Your password has been reset successfully.
              You can now sign in with your new password.
            </p>
          </div>

          <Link href="/auth/login">
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11">
              Go to sign in
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ─── FORMULARIO PRINCIPAL ───────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <KeyRound size={24} className="text-cyan-400" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Set new password</h2>
          <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
            Choose a strong password. You won&apos;t be able to reuse your previous one.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">

          {/* New password */}
          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">New password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={step === "loading"}
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 pr-10 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Strength rules */}
            {password.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-1">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(password)
                  return (
                    <div key={rule.label} className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                          passed ? "bg-cyan-500/20" : "bg-white/5"
                        }`}
                      >
                        {passed
                          ? <Check size={9} className="text-cyan-400" />
                          : <X size={9} className="text-zinc-600" />
                        }
                      </div>
                      <span
                        className={`text-xs transition-colors duration-200 ${
                          passed ? "text-zinc-400" : "text-zinc-600"
                        }`}
                      >
                        {rule.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-2">
            <Label className="text-zinc-400 text-sm">Confirm new password</Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                disabled={step === "loading"}
                className={`bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 pr-10 disabled:opacity-50 transition-colors ${
                  confirm.length > 0
                    ? passwordsMatch
                      ? "border-cyan-500/50"
                      : "border-red-500/50"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {confirm.length > 0 && !passwordsMatch && (
              <p className="text-xs text-red-400">Passwords don&apos;t match</p>
            )}
          </div>

          {/* Error genérico */}
          {step === "error" && errorMsg === "generic" && (
            <p className="text-xs text-red-400 -mt-1">
              Something went wrong. Please try again.
            </p>
          )}

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
          >
            {step === "loading" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
                Updating password...
              </span>
            ) : (
              "Reset password"
            )}
          </Button>

        </div>

        {/* Back to login */}
        <div className="flex justify-center mt-6">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>

      </div>
    </div>
  )
}