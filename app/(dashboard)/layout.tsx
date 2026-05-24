"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import "../globals.css"


import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Settings2,
} from "lucide-react"

const navLinks = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/usuarios", icon: Users, label: "Usuarios" },
  { href: "/billing", icon: CreditCard, label: "Billing" },
  { href: "/settings", icon: Settings, label: "Configuración" },
]

const notificaciones = [
  {
    titulo: "Nuevo usuario registrado",
    tiempo: "Hace 2 min",
  },
  {
    titulo: "Pago recibido",
    tiempo: "Hace 10 min",
  },
  {
    titulo: "Nuevo mensaje de soporte",
    tiempo: "Hace 1 hora",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [colapsado, setColapsado] = useState(false)
  const [mobileAbierto, setMobileAbierto] = useState(false)
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)
  const [menuUsuarioAbierto, setMenuUsuarioAbierto] = useState(false)
  const notificacionesRef = useRef<HTMLDivElement>(null)
  const usuarioRef = useRef<HTMLDivElement>(null)
  useEffect(() => {

    function handleClickOutside(event: MouseEvent) {

      const target = event.target as Node

      // NOTIFICACIONES
      if (
        notificacionesRef.current &&
        !notificacionesRef.current.contains(target)
      ) {
        setNotificacionesAbiertas(false)
      }

      // USUARIO
      if (
        usuarioRef.current &&
        !usuarioRef.current.contains(target)
      ) {
        setMenuUsuarioAbierto(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  return (
    <html lang="es">
      <body>
        <div className="flex min-h-screen bg-zinc-950 text-white">

          {/* OVERLAY MOBILE */}
          {mobileAbierto && (
            <div
              className="fixed inset-0 bg-black/60 z-20 lg:hidden"
              onClick={() => setMobileAbierto(false)}
            />
          )}

          {/* SIDEBAR */}
          <aside
            className={`
              fixed lg:relative inset-y-0 left-0 z-30
              flex flex-col
              bg-zinc-900 border-r border-white/10

              transition-all duration-300 ease-in-out
              transform-gpu will-change-transform

              ${colapsado ? "lg:w-20" : "lg:w-64"}
              w-64

              ${mobileAbierto
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
              }
            `}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 h-16">

              {/* LOGO */}
              <div
                className={`
                  overflow-hidden transition-all duration-300
                  ${colapsado ? "w-0 opacity-0" : "w-32 opacity-100"}
                `}
              >
                <h1 className="text-lg font-bold text-cyan-400 whitespace-nowrap">
                  NovaUI
                </h1>
              </div>

              {/* BOTÓN COLAPSAR */}
              <button
                onClick={() => setColapsado(!colapsado)}
                className="
                  hidden lg:flex
                  p-1.5 rounded-lg
                  hover:bg-white/10
                  transition
                  text-zinc-400 hover:text-white
                "
              >
                {colapsado
                  ? <ChevronRight size={16} />
                  : <ChevronLeft size={16} />
                }
              </button>

              {/* BOTÓN MOBILE */}
              <button
                onClick={() => setMobileAbierto(false)}
                className="
                  lg:hidden
                  p-1.5 rounded-lg
                  hover:bg-white/10
                  transition
                  text-zinc-400
                "
              >
                <X size={16} />
              </button>

            </div>

            {/* NAV */}
            <nav className="flex flex-col gap-1 p-3 flex-1">

              {navLinks.map(({ href, icon: Icon, label }) => (

                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileAbierto(false)}
                  className={`
                    flex items-center
                    px-3 py-2.5 rounded-lg
                    text-zinc-400
                    hover:text-white
                    hover:bg-white/10

                    transition-all duration-200

                    ${colapsado
                      ? "justify-center"
                      : "gap-3"
                    }
                  `}
                >

                  <Icon
                    size={18}
                    className="shrink-0"
                  />

                  {/* TEXTO */}
                  <span
                    className={`
                      text-sm font-medium whitespace-nowrap overflow-hidden

                      transition-all duration-300

                      ${colapsado
                        ? "max-w-0 opacity-0"
                        : "max-w-[200px] opacity-100"
                      }
                    `}
                  >
                    {label}
                  </span>

                </Link>

              ))}

            </nav>

            {/* FOOTER */}
            <div
              className={`
                p-3 border-t border-white/10
                flex items-center gap-3

                ${colapsado ? "justify-center" : ""}
              `}
            >

              <div
                className="
                  w-8 h-8 rounded-full
                  bg-cyan-500
                  flex items-center justify-center
                  text-sm font-bold
                  shrink-0
                "
              >
                U
              </div>

              {/* INFO USUARIO */}
              <div
                className={`
                  overflow-hidden transition-all duration-300

                  ${colapsado
                    ? "max-w-0 opacity-0"
                    : "max-w-[200px] opacity-100"
                  }
                `}
              >
                <p className="text-sm font-medium text-white truncate">
                  Usuario
                </p>

                <p className="text-xs text-zinc-500 truncate">
                  usuario@email.com
                </p>
              </div>

            </div>

          </aside>

          {/* CONTENIDO DERECHO */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* NAVBAR */}
            <header
              className="
                border-b border-white/10
                px-6 py-4
                flex items-center justify-between
                h-16
                bg-zinc-950
              "
            >

              {/* HAMBURGUESA */}
              <button
                onClick={() => setMobileAbierto(true)}
                className="
                  lg:hidden
                  p-2 rounded-lg
                  hover:bg-white/10
                  transition
                  text-zinc-400
                "
              >
                <Menu size={20} />
              </button>

              <p className="text-zinc-400 text-sm hidden lg:block">
                Bienvenido de vuelta
              </p>

              <div className="flex items-center gap-3">

                {/* NOTIFICACIONES */}
                <div
                  ref={notificacionesRef}
                  className="relative"
                >

                  <button
                    onClick={() => {
                      setNotificacionesAbiertas(!notificacionesAbiertas)
                      setMenuUsuarioAbierto(false)
                    }}
                    className="
        relative
        p-2 rounded-xl
        hover:bg-white/10
        transition
        text-zinc-400 hover:text-white
      "
                  >

                    <Bell size={18} />

                    {/* BADGE */}
                    <span
                      className="
          absolute -top-1 -right-1
          min-w-[18px] h-[18px]
          px-1
          rounded-full
          bg-red-500
          text-[10px]
          font-bold
          flex items-center justify-center
          text-white
        "
                    >
                      {notificaciones.length}
                    </span>

                  </button>

                  {/* DROPDOWN */}
                  <div
                    className={`
        absolute right-0 mt-3
        w-80
        rounded-2xl
        border border-white/10
        bg-zinc-900/95
        backdrop-blur-xl
        shadow-2xl
        overflow-hidden
        z-50

        transition-all duration-200 origin-top-right

        ${notificacionesAbiertas
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                      }
      `}
                  >

                    {/* HEADER */}
                    <div className="px-4 py-3 border-b border-white/10">
                      <h3 className="text-sm font-semibold text-white">
                        Notificaciones
                      </h3>
                    </div>

                    {/* LISTA */}
                    <div className="max-h-96 overflow-auto">

                      {notificaciones.map((notif, index) => (

                        <button
                          key={index}
                          className="
              w-full text-left
              px-4 py-3
              hover:bg-white/5
              transition
              border-b border-white/5
            "
                        >

                          <p className="text-sm text-white">
                            {notif.titulo}
                          </p>

                          <p className="text-xs text-zinc-500 mt-1">
                            {notif.tiempo}
                          </p>

                        </button>

                      ))}

                    </div>

                  </div>

                </div>

                {/* USER MENU */}
                <div
                  ref={usuarioRef}
                  className="relative"
                >

                  {/* BOTÓN */}
                  <button
                    onClick={() => {
                      setMenuUsuarioAbierto(!menuUsuarioAbierto)
                      setNotificacionesAbiertas(false)
                    }}
                    className="
      flex items-center gap-3
      px-2 py-1.5 rounded-xl
      hover:bg-white/10
      transition
    "
                  >

                    {/* AVATAR */}
                    <div
                      className="
        w-8 h-8 rounded-full
        bg-cyan-500
        flex items-center justify-center
        text-sm font-bold
      "
                    >
                      U
                    </div>

                    {/* NOMBRE */}
                    <span className="text-sm hidden sm:block">
                      Usuario
                    </span>

                  </button>

                  {/* DROPDOWN */}
                  <div
                    className={`
      absolute right-0 mt-3
      w-64
      rounded-2xl
      border border-white/10
      bg-zinc-900/95
      backdrop-blur-xl
      shadow-2xl
      overflow-hidden
      z-50

      transition-all duration-200 origin-top-right

      ${menuUsuarioAbierto
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                      }
    `}
                  >

                    {/* HEADER */}
                    <div className="px-4 py-4 border-b border-white/10">

                      <p className="text-sm font-semibold text-white">
                        Usuario
                      </p>

                      <p className="text-xs text-zinc-500 mt-1">
                        usuario@email.com
                      </p>

                    </div>

                    {/* OPCIONES */}
                    <div className="p-2">

                      <button
                        className="
          w-full flex items-center gap-3
          px-3 py-2 rounded-xl
          hover:bg-white/5
          text-sm text-zinc-300
          transition
        "
                      >
                        <User size={16} />
                        Perfil
                      </button>

                      <button
                        className="
          w-full flex items-center gap-3
          px-3 py-2 rounded-xl
          hover:bg-white/5
          text-sm text-zinc-300
          transition
        "
                      >
                        <Settings2 size={16} />
                        Configuración
                      </button>

                      <button
                        className="
          w-full flex items-center gap-3
          px-3 py-2 rounded-xl
          hover:bg-white/5
          text-sm text-zinc-300
          transition
        "
                      >
                        <CreditCard size={16} />
                        Billing
                      </button>

                      {/* SEPARADOR */}
                      <div className="my-2 border-t border-white/10" />

                      <button
                        className="
          w-full flex items-center gap-3
          px-3 py-2 rounded-xl
          hover:bg-red-500/10
          text-sm text-red-400
          transition
        "
                      >
                        <LogOut size={16} />
                        Cerrar sesión
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </header>

            {/* MAIN */}
            <main className="flex-1 p-6 lg:p-8 overflow-auto">
              {children}
            </main>

          </div>

        </div>
      </body>
    </html>
  )
}