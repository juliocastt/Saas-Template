import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
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
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Page not found
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Double-check the URL or head back to the dashboard.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11">
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