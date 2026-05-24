"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const [mostrarPassword, setMostrarPassword] = useState(false)

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-zinc-950">

      {/* LADO IZQUIERDO - Decorativo */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-zinc-900 border-r border-white/10">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        {/* Contenido central */}
        <div className="space-y-6">
          {/* Gradiente decorativo */}
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
          
          <blockquote className="text-2xl font-medium text-white leading-relaxed">
            "El panel de administración más completo para tu SaaS. 
            Gestiona usuarios, analiza métricas y escala tu negocio."
          </blockquote>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <span className="text-cyan-400 text-xs font-bold">N</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">NovaUI Dashboard</p>
              <p className="text-zinc-500 text-xs">Admin Template</p>
            </div>
          </div>
        </div>

        {/* Decoración inferior */}
        <div className="flex gap-2">
          <div className="w-6 h-1.5 rounded-full bg-cyan-400" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
          <div className="w-2 h-1.5 rounded-full bg-white/20" />
        </div>

      </div>

      {/* LADO DERECHO - Formulario */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-12 bg-zinc-950">

        {/* Logo en móvil */}
        <div className="lg:hidden mb-8">
          <h1 className="text-2xl font-bold text-cyan-400">NovaUI</h1>
        </div>

        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Iniciar sesión</h2>
            <p className="text-zinc-400 mt-2 text-sm">
              Ingresa tus credenciales para acceder al panel
            </p>
          </div>

          {/* Botones sociales */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition text-white text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Continuar con GitHub
            </button>
          </div>

          {/* Separador */}
          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-zinc-600 text-xs">O continúa con email</span>
            <Separator className="flex-1 bg-white/10" />
          </div>

          {/* Formulario */}
          <div className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <Label className="text-zinc-400 text-sm">Email</Label>
              <Input
                type="email"
                placeholder="tu@email.com"
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-400 text-sm">Contraseña</Label>
                <Link
                  href="/auth/recuperar"
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={mostrarPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400 focus-visible:border-cyan-400 pr-10"
                />
                <button
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                >
                  {mostrarPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Recordarme */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="recordar"
                className="border-white/20 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
              />
              <label htmlFor="recordar" className="text-sm text-zinc-400 cursor-pointer">
                Recordarme por 30 días
              </label>
            </div>

            {/* Botón de login */}
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold mt-2 h-11">
              Iniciar sesión
            </Button>

          </div>

          {/* Link a registro */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/registro" className="text-cyan-400 hover:text-cyan-300 transition font-medium">
              Crear cuenta gratis
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}