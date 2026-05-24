"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const transacciones = [
    {
        id: 1,
        cliente: "Julio Martínez",
        email: "julio@email.com",
        estado: "Pagado",
        fecha: "Hoy",
        total: "$240",
    },
    {
        id: 2,
        cliente: "Ana López",
        email: "ana@email.com",
        estado: "Pendiente",
        fecha: "Ayer",
        total: "$120",
    },
    {
        id: 3,
        cliente: "Carlos Ruiz",
        email: "carlos@email.com",
        estado: "Fallido",
        fecha: "2 días",
        total: "$89",
    },
]

function obtenerColorEstado(estado: string) {
    switch (estado) {
        case "Pagado":
            return "bg-emerald-500/15 text-emerald-400"

        case "Pendiente":
            return "bg-yellow-500/15 text-yellow-400"

        case "Fallido":
            return "bg-red-500/15 text-red-400"

        default:
            return "bg-zinc-500/15 text-zinc-400"
    }
}

export default function TablaTransacciones() {
    return (
        <Card className="bg-zinc-900 border-white/10">

            <CardHeader>
                <CardTitle className="text-sm text-zinc-400">
                    Transacciones recientes
                </CardTitle>
            </CardHeader>

            <CardContent>

                {/* SCROLL MOBILE */}
                <div
                    className="
    overflow-x-auto
    lg:overflow-visible

    scrollbar-thin
    scrollbar-thumb-zinc-700
    scrollbar-track-transparent
  "
                >

                    <table className="w-full lg:min-w-0 min-w-[600px]">

                        {/* HEAD */}
                        <thead>

                            <tr className="border-b border-white/10">

                                <th className="text-left py-3 px-2 text-xs font-medium text-zinc-500">
                                    Cliente
                                </th>

                                <th className="text-left py-3 px-2 text-xs font-medium text-zinc-500">
                                    Estado
                                </th>

                                <th className="hidden md:table-cell text-left py-3 px-2 text-xs font-medium text-zinc-500">
                                    Fecha
                                </th>
                                <th className="text-right py-3 px-2 text-xs font-medium text-zinc-500">
                                    Total
                                </th>

                            </tr>

                        </thead>

                        {/* BODY */}
                        <tbody>

                            {transacciones.length > 0 ? (

                                transacciones.map((transaccion) => (

                                    <tr
                                        key={transaccion.id}
                                        className="
          border-b border-white/5
          hover:bg-white/[0.04]
          hover:scale-[1.002]
          transition-all duration-200
        "
                                    >

                                        {/* CLIENTE */}
                                        <td className="py-4 px-2">

                                            <div className="flex items-center gap-3">

                                                {/* AVATAR */}
                                                <div
                                                    className="
                w-9 h-9 md:w-10 md:h-10 rounded-full
                bg-cyan-500/20
                text-cyan-400
                flex items-center justify-center
                text-sm font-bold
                shrink-0
              "
                                                >
                                                    {transaccion.cliente.charAt(0)}
                                                </div>

                                                <div>

                                                    <p className="text-sm font-medium text-white">
                                                        {transaccion.cliente}
                                                    </p>

                                                    <p className="text-xs text-zinc-500">
                                                        {transaccion.email}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* ESTADO */}
                                        <td className="py-4 px-2">

                                            <span
                                                className={`
              px-2 py-1 rounded-full
              text-xs font-medium
              ${obtenerColorEstado(transaccion.estado)}
            `}
                                            >
                                                {transaccion.estado}
                                            </span>

                                        </td>

                                        {/* FECHA */}
                                        <td className="hidden md:table-cell py-4 px-2 text-sm text-zinc-400">
                                            {transaccion.fecha}
                                        </td>

                                        {/* TOTAL */}
                                        <td className="py-4 px-2 text-right text-sm font-medium text-white">
                                            {transaccion.total}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan={4}
                                        className="py-16"
                                    >

                                        <div className="flex flex-col items-center justify-center text-center">

                                            {/* ICONO */}
                                            <div
                                                className="
              w-14 h-14 rounded-2xl
              bg-white/5
              border border-white/10
              flex items-center justify-center
              mb-4
            "
                                            >
                                                📭
                                            </div>

                                            {/* TÍTULO */}
                                            <h3 className="text-sm font-semibold text-white">
                                                No hay transacciones
                                            </h3>

                                            {/* TEXTO */}
                                            <p className="text-sm text-zinc-500 mt-1 max-w-sm">
                                                Las transacciones aparecerán aquí
                                                cuando existan movimientos recientes.
                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </CardContent>

        </Card>
    )
}