import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// Esta página NO es automática en Next.js.
// Debes redirigir manualmente cuando detectes que el usuario
// no tiene permisos suficientes. Ejemplo:
//
// En un Server Component o middleware:
// if (user.role !== "admin") redirect("/error/403")
//
// O en un layout protegido:
// const session = await getServerSession()
// if (!session || session.user.role !== "admin") redirect("/error/403")

export default function Forbidden() {
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
            403
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Access denied
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          You don&apos;t have permission to view this page.
          If you think this is a mistake, contact your administrator.
        </p>

        {/* Role hint — opcional, muéstralo si tienes sesión disponible */}
        {/* Ejemplo con next-auth:
        const session = await getServerSession()
        <div className="bg-zinc-900 border border-white/8 rounded-xl px-4 py-3 mb-8">
          <p className="text-zinc-600 text-xs">
            Signed in as{" "}
            <span className="text-zinc-400">{session?.user?.email}</span>
            {" "}·{" "}
            <span className="text-amber-400/80 capitalize">{session?.user?.role}</span> role
          </p>
        </div>
        */}

        {/* Pill de rol — estático para el template */}
        <div className="inline-flex items-center gap-2 bg-zinc-900 border border-white/8 rounded-full px-4 py-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <p className="text-zinc-500 text-xs">
            Your role doesn&apos;t have access to this section
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-11">
              Go to dashboard
            </Button>
          </Link>

          <Link href="/dashboard/settings/billing">
            <Button
              variant="ghost"
              className="w-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 h-11"
            >
              Upgrade your plan
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