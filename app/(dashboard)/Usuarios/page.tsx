"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"

const usuarios = [
  { nombre: "Ana García",      email: "ana@email.com",     rol: "Admin",  estado: "Activo" },
  { nombre: "Carlos López",    email: "carlos@email.com",  rol: "Editor", estado: "Activo" },
  { nombre: "María Pérez",     email: "maria@email.com",   rol: "Viewer", estado: "Inactivo" },
  { nombre: "Juan Martínez",   email: "juan@email.com",    rol: "Editor", estado: "Activo" },
  { nombre: "Laura Sánchez",   email: "laura@email.com",   rol: "Viewer", estado: "Pendiente" },
  { nombre: "Pedro Ramírez",   email: "pedro@email.com",   rol: "Editor", estado: "Activo" },
  { nombre: "Sofía Torres",    email: "sofia@email.com",   rol: "Viewer", estado: "Inactivo" },
  { nombre: "Diego Flores",    email: "diego@email.com",   rol: "Admin",  estado: "Activo" },
  { nombre: "Valeria Castro",  email: "valeria@email.com", rol: "Viewer", estado: "Pendiente" },
  { nombre: "Andrés Morales",  email: "andres@email.com",  rol: "Editor", estado: "Activo" },
  { nombre: "Camila Herrera",  email: "camila@email.com",  rol: "Viewer", estado: "Activo" },
  { nombre: "Roberto Díaz",    email: "roberto@email.com", rol: "Editor", estado: "Inactivo" },
]

const USUARIOS_POR_PAGINA = 5
const FILTROS = ["Todos", "Activo", "Inactivo", "Pendiente"]

export default function Usuarios() {
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("Todos")
  const [pagina, setPagina] = useState(1)

  // 1. Filtra por búsqueda
  const filtrados = usuarios.filter((u) => {
    const coincideBusqueda =
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email.toLowerCase().includes(busqueda.toLowerCase())

    const coincideFiltro = filtro === "Todos" || u.estado === filtro

    return coincideBusqueda && coincideFiltro
  })

  // 2. Pagina los resultados
  const totalPaginas = Math.ceil(filtrados.length / USUARIOS_POR_PAGINA)
  const usuariosPagina = filtrados.slice(
    (pagina - 1) * USUARIOS_POR_PAGINA,
    pagina * USUARIOS_POR_PAGINA
  )

  // Al buscar o filtrar, vuelve a página 1
  const handleBusqueda = (valor: string) => {
    setBusqueda(valor)
    setPagina(1)
  }

  const handleFiltro = (valor: string) => {
    setFiltro(valor)
    setPagina(1)
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Usuarios</h2>
        <span className="text-sm text-zinc-500">{filtrados.length} usuarios</span>
      </div>

      {/* BÚSQUEDA Y FILTROS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">

        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={busqueda}
            onChange={(e) => handleBusqueda(e.target.value)}
            className="pl-9 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-cyan-400"
          />
        </div>

        {/* Filtros de estado */}
        <div className="flex gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => handleFiltro(f)}
              className={`
                px-3 py-1.5 rounded-md text-xs font-medium transition-all
                ${filtro === f
                  ? "bg-cyan-500 text-black"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* TABLA */}
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-zinc-400">Nombre</TableHead>
              <TableHead className="text-zinc-400">Email</TableHead>
              <TableHead className="text-zinc-400">Rol</TableHead>
              <TableHead className="text-zinc-400">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosPagina.length > 0 ? (
              usuariosPagina.map((usuario) => (
                <TableRow
                  key={usuario.email}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium">{usuario.nombre}</TableCell>
                  <TableCell className="text-zinc-400">{usuario.email}</TableCell>
                  <TableCell className="text-zinc-400">{usuario.rol}</TableCell>
                  <TableCell>
                    <Badge className={
                      usuario.estado === "Activo"    ? "bg-green-500/20  text-green-400  hover:bg-green-500/20" :
                      usuario.estado === "Inactivo"  ? "bg-red-500/20    text-red-400    hover:bg-red-500/20" :
                                                       "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                    }>
                      {usuario.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // ESTADO VACÍO
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-zinc-500">
                  No se encontraron usuarios
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-zinc-500">
            Mostrando {(pagina - 1) * USUARIOS_POR_PAGINA + 1}–{Math.min(pagina * USUARIOS_POR_PAGINA, filtrados.length)} de {filtrados.length}
          </p>

          <div className="flex gap-1">
            <button
              onClick={() => setPagina(p => p - 1)}
              disabled={pagina === 1}
              className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-zinc-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Anterior
            </button>

            {Array.from({ length: totalPaginas }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPagina(i + 1)}
                className={`
                  w-8 h-8 rounded-lg text-xs transition
                  ${pagina === i + 1
                    ? "bg-cyan-500 text-black font-bold"
                    : "border border-white/10 text-zinc-400 hover:bg-white/5"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPagina(p => p + 1)}
              disabled={pagina === totalPaginas}
              className="px-3 py-1.5 rounded-lg text-xs border border-white/10 text-zinc-400 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

    </div>
  )
}