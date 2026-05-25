"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

const QUOTES = [
  {
    text: "Join thousands of teams already using NovaUI to ship faster, collaborate better, and grow with confidence.",
    initials: "N",
    name: "NovaUI Dashboard",
    role: "Admin Template",
  },
  {
    text: "Setting up took less than five minutes. By the end of the day, our whole team was on board and loving it.",
    initials: "PK",
    name: "Paula K.",
    role: "Operations Manager, Flux",
  },
  {
    text: "NovaUI replaced three separate tools for us. One platform, one source of truth, zero headaches.",
    initials: "DT",
    name: "David T.",
    role: "Co-founder, Meridian",
  },
  {
    text: "The onboarding experience was so smooth we barely needed docs. Everything just made sense from the start.",
    initials: "MO",
    name: "Mia O.",
    role: "Product Designer, Crest",
  },
]

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (next: number) => {
      if (next === current || animating) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent(next)
        setAnimating(false)
      }, 300)
    },
    [current, animating]
  )

  const advance = useCallback(() => {
    goTo((current + 1) % QUOTES.length)
  }, [current, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(advance, 4500)
    return () => clearInterval(timer)
  }, [advance, isPaused])

  const passwordsMatch = confirm.length > 0 && password === confirm

  const quote = QUOTES[current]

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-zinc-950">

      {/* LEFT PANEL — Decorative carousel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 bg-zinc-900 border-r border-white/10 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ambient glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>

        {/* Quote area */}
        <div className="flex flex-col gap-6">
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />

          <div
            className="transition-all duration-300"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(12px)" : "translateY(0)",
            }}
          >
            <blockquote className="text-xl font-medium text-white leading-relaxed">
              &ldquo;{quote.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 mt-6">
              <div className="w-9 h-9 rounded-full bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
                <span className="text-cyan-400 text-xs font-bold">{quote.initials}</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{quote.name}</p>
                <p className="text-zinc-500 text-xs">{quote.role}</p>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 mt-2">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to quote ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 bg-cyan-400"
                    : "w-2 bg-white/20 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex gap-2">
          <div className="w-6 h-1.5 rounded-full bg-cyan-400" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-zinc-950">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Create account</h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Get started for free — no credit card required
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-zinc-600 text-xs">or continue with email</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">

            {/* Full name */}
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">Full name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">Email</Label>
              <Input
                type="email"
                placeholder="you@email.com"
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 pr-10"
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

              {/* Password strength rules */}
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
                          {passed ? (
                            <Check size={9} className="text-cyan-400" />
                          ) : (
                            <X size={9} className="text-zinc-600" />
                          )}
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
              <Label className="text-zinc-400 text-sm">Confirm password</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 pr-10 transition-colors ${
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

            {/* Terms */}
            <div className="flex items-start gap-2 mt-1">
              <Checkbox
                id="terms"
                className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 mt-0.5"
              />
              <label htmlFor="terms" className="text-sm text-zinc-400 cursor-pointer leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* CTA */}
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold mt-2 h-11">
              Create account
            </Button>

          </div>

          <p className="text-center text-sm text-zinc-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-cyan-400 hover:text-cyan-300 transition font-medium">
              Sign in
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}