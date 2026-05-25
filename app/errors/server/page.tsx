"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Este archivo debe llamarse error.tsx en Next.js App Router
// Debe ser un Client Component ("use client") obligatoriamente
// Next.js lo activa automáticamente cuando un Server Component lanza un error

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // TODO: loggear el error a tu servicio de monitoreo
    // Sentry:   Sentry.captureException(error)
    // LogRocket: LogRocket.captureException(error)
    // Datadog:  datadogRum.addError(error)
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
      <div className="w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        {/* Number */}
        <div className="relative mb-8 select-none">
          <p className="text-[120px] font-black text-white/5 leading-none tracking-tighter">
            500
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          An unexpected error occurred on our end. Our team has been notified.
          You can try again or come back in a few minutes.
        </p>

        {/* Error digest — útil para soporte técnico */}
        {error?.digest && (
          <div className="bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 mb-8">
            <p className="text-zinc-600 text-xs">
              Error ID:{" "}
              <span className="text-zinc-400 font-mono">{error.digest}</span>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={reset}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11"
          >
            Try again
          </Button>

          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 h-11"
            >
              Go to dashboard
            </Button>
          </Link>

          <Link
            href="javascript:history.back()"
            className="flex items-center justify-center gap-2 text-sm text-zinc-500 hover:text-white transition h-11"
          >
            <ArrowLeft size={14} />
            Go back
          </Link>
        </div>

      </div>
    </div>
  )
}