"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Maximize2 } from "lucide-react"

type DatosMes = { mes: string; usuarios: number }
type DatosSemana = { semana: string; usuarios: number }
type DatosUsuarios = { mes: string; usuarios: number }
type Datos = DatosUsuarios | DatosSemana
type Periodo = "7d" | "30d" | "90d"

const datosPorPeriodo: Record<Periodo, DatosUsuarios[]> = {
  "7d": [
    { mes: "Lun", usuarios: 18 },
    { mes: "Mar", usuarios: 24 },
    { mes: "Mié", usuarios: 15 },
    { mes: "Jue", usuarios: 31 },
    { mes: "Vie", usuarios: 27 },
    { mes: "Sáb", usuarios: 12 },
    { mes: "Dom", usuarios: 8 },
  ],
  "30d": [
    { mes: "Semana 1", usuarios: 280 },
    { mes: "Semana 2", usuarios: 310 },
    { mes: "Semana 3", usuarios: 295 },
    { mes: "Semana 4", usuarios: 355 },
  ],
  "90d": [
    { mes: "Enero", usuarios: 480 },
    { mes: "Febrero", usuarios: 620 },
    { mes: "Marzo", usuarios: 710 },
  ],
}

const datosSemanas: Record<string, DatosSemana[]> = {
    Ene: [
        { semana: "Semana 1", usuarios: 25 },
        { semana: "Semana 2", usuarios: 38 },
        { semana: "Semana 3", usuarios: 29 },
        { semana: "Semana 4", usuarios: 28 },
    ],
    Feb: [
        { semana: "Semana 1", usuarios: 40 },
        { semana: "Semana 2", usuarios: 55 },
        { semana: "Semana 3", usuarios: 42 },
        { semana: "Semana 4", usuarios: 43 },
    ],
    Mar: [
        { semana: "Semana 1", usuarios: 35 },
        { semana: "Semana 2", usuarios: 42 },
        { semana: "Semana 3", usuarios: 38 },
        { semana: "Semana 4", usuarios: 35 },
    ],
    Abr: [
        { semana: "Semana 1", usuarios: 50 },
        { semana: "Semana 2", usuarios: 62 },
        { semana: "Semana 3", usuarios: 55 },
        { semana: "Semana 4", usuarios: 53 },
    ],
    May: [
        { semana: "Semana 1", usuarios: 65 },
        { semana: "Semana 2", usuarios: 78 },
        { semana: "Semana 3", usuarios: 70 },
        { semana: "Semana 4", usuarios: 67 },
    ],
    Jun: [
        { semana: "Semana 1", usuarios: 72 },
        { semana: "Semana 2", usuarios: 85 },
        { semana: "Semana 3", usuarios: 78 },
        { semana: "Semana 4", usuarios: 75 },
    ],
}

interface Props {
    periodo: Periodo
}

export default function GraficaUsuarios({ periodo }: Props) {
    const [expandida, setExpandida] = useState(false)
    const [mesSeleccionado, setMesSeleccionado] = useState<string | null>(null)
    const [key, setKey] = useState(0)

    useEffect(() => {
        setMesSeleccionado(null)
    }, [periodo])

    const datos: Datos[] = mesSeleccionado
        ? datosSemanas[mesSeleccionado]
        : datosPorPeriodo[periodo]

    const claveX = mesSeleccionado ? "semana" : "mes"

    useEffect(() => {
        setKey(prev => prev + 1)
    }, [mesSeleccionado, periodo])

    const handleClick = (data: any) => {
        if (mesSeleccionado) return
        if (periodo === "30d" && data?.activeLabel) {
            setMesSeleccionado(data.activeLabel)
        }
    }

    return (
        <Card className="bg-zinc-900 border-white/10">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {mesSeleccionado && (
                            <button
                                onClick={() => setMesSeleccionado(null)}
                                className="p-1 rounded-lg hover:bg-white/10 transition"
                            >
                                <ArrowLeft size={16} className="text-zinc-400 hover:text-white transition" />
                            </button>
                        )}
                        <CardTitle className="text-sm text-zinc-400">
                            {mesSeleccionado
                                ? `Usuarios por semana — ${mesSeleccionado}`
                                : periodo === "7d"
                                    ? "Usuarios por día"
                                    : periodo === "90d"
                                        ? "Usuarios por trimestre"
                                        : "Usuarios nuevos por mes"
                            }
                        </CardTitle>
                    </div>
                    <button
                        onClick={() => setExpandida(!expandida)}
                        className="p-1 rounded-lg hover:bg-white/10 transition"
                    >
                        <Maximize2 size={16} className="text-zinc-400 hover:text-white transition" />
                    </button>
                </div>
                {!mesSeleccionado && periodo === "30d" && (
                    <p className="text-xs text-zinc-600 mt-1">
                        Click en un mes para ver sus semanas
                    </p>
                )}
            </CardHeader>

            <CardContent>
                <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{ height: expandida ? 500 : 300, minHeight: 0 }}
                >
                    <ResponsiveContainer key={key} width="100%" height="100%">
                        <BarChart
                            data={datos}
                            onClick={handleClick}
                            style={{ cursor: !mesSeleccionado && periodo === "30d" ? "pointer" : "default" }}
                        >
                            <XAxis dataKey={claveX} stroke="#71717a" />
                            <YAxis stroke="#71717a" />
                            <Tooltip
                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#18181b",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                }}
                                labelStyle={{ color: "#a1a1aa" }}
                                itemStyle={{ color: "#22d3ee" }}
                            />
                            <Bar
                                dataKey="usuarios"
                                fill="#22d3ee"
                                radius={[4, 4, 0, 0]}
                                isAnimationActive={true}
                                animationDuration={600}
                                animationEasing="ease-in-out"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}