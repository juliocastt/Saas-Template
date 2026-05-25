"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step = "idle" | "loading" | "success" | "error"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<Step>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async () => {
    if (!isValidEmail) return

    setStep("loading")
    setErrorMsg("")

    try {
      // TODO: conectar con tu proveedor de auth
      // ─── Supabase ───────────────────────────────────────────
      // const { error } = await supabase.auth.resetPasswordForEmail(email, {
      //   redirectTo: `${window.location.origin}/auth/reset-password`,
      // })
      // if (error) throw error
      //
      // ─── Firebase ───────────────────────────────────────────
      // await sendPasswordResetEmail(auth, email)
      //
      // ─── API propia ─────────────────────────────────────────
      // const res = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // })
      // if (!res.ok) throw new Error("Something went wrong")

      // Simulación — eliminar cuando conectes el backend
      await new Promise((resolve) => setTimeout(resolve, 1200))

      setStep("success")
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.")
      setStep("error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">

      {/* Card */}
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        {/* STEP: idle / loading / error — formulario */}
        {step !== "success" && (
          <>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Mail size={24} className="text-cyan-400" />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Forgot your password?</h2>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                No worries. Enter your email and we&apos;ll send you a link to reset it.
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-zinc-400 text-sm">Email address</Label>
                <Input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (step === "error") setStep("idle")
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={step === "loading"}
                  className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 disabled:opacity-50"
                />
              </div>

              {/* Error message */}
              {step === "error" && (
                <p className="text-xs text-red-400 -mt-1">{errorMsg}</p>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!isValidEmail || step === "loading"}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11 disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              >
                {step === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </div>
          </>
        )}

        {/* STEP: success */}
        {step === "success" && (
          <>
            {/* Animated check icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <svg
                  width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="#22d3ee" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="animate-[dash_0.6s_ease-in-out_forwards]"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Check your inbox</h2>
              <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                We sent a password reset link to{" "}
                <span className="text-white font-medium">{email}</span>.
                It expires in 30 minutes.
              </p>
            </div>

            {/* Hint */}
            <div className="bg-zinc-900 border border-white/8 rounded-xl p-4 mb-6">
              <p className="text-zinc-500 text-xs leading-relaxed text-center">
                Didn&apos;t receive it? Check your spam folder or{" "}
                <button
                  onClick={() => {
                    setStep("idle")
                    setEmail("")
                  }}
                  className="text-cyan-400 hover:text-cyan-300 transition underline underline-offset-2"
                >
                  try again with a different email
                </button>
                .
              </p>
            </div>
          </>
        )}

        {/* Back to login — siempre visible */}
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