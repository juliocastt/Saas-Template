import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const usuarios = [
  { nombre: "Ana García", email: "ana@email.com", rol: "Admin", estado: "Activo" },
  { nombre: "Carlos López", email: "carlos@email.com", rol: "Editor", estado: "Activo" },
  { nombre: "María Pérez", email: "maria@email.com", rol: "Viewer", estado: "Inactivo" },
  { nombre: "Juan Martínez", email: "juan@email.com", rol: "Editor", estado: "Activo" },
  { nombre: "Laura Sánchez", email: "laura@email.com", rol: "Viewer", estado: "Pendiente" },
]

export default function Usuarios() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Usuarios</h2>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-zinc-400">Nombre</TableHead>
              <TableHead className="text-zinc-400">Email</TableHead>
              <TableHead className="text-zinc-400">Rol</TableHead>
              <TableHead className="text-zinc-400">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.email} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-medium">{usuario.nombre}</TableCell>
                <TableCell className="text-zinc-400">{usuario.email}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Badge className={
                    usuario.estado === "Activo" ? "bg-green-500/20 text-green-400 hover:bg-green-500/20" :
                    usuario.estado === "Inactivo" ? "bg-red-500/20 text-red-400 hover:bg-red-500/20" :
                    "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20"
                  }>
                    {usuario.estado}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}