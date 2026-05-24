"use client"

import { useState, useEffect } from "react"

import {
  Maximize2,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DatosMes = { mes: string; ingresos: number }
type DatosSemana = { semana: string; ingresos: number }
type Datos = DatosMes | DatosSemana
type Periodo = "7d" | "30d" | "90d"

const datosPorPeriodo: Record<Periodo, DatosMes[]> = {
  "7d": [
    { mes: "Lun", ingresos: 820 },
    { mes: "Mar", ingresos: 940 },
    { mes: "Mié", ingresos: 780 },
    { mes: "Jue", ingresos: 1100 },
    { mes: "Vie", ingresos: 960 },
    { mes: "Sáb", ingresos: 650 },
    { mes: "Dom", ingresos: 480 },
  ],
  "30d": [
    { mes: "Semana 1", ingresos: 4800 },
    { mes: "Semana 2", ingresos: 6200 },
    { mes: "Semana 3", ingresos: 5900 },
    { mes: "Semana 4", ingresos: 7600 },
  ],
  "90d": [
    { mes: "Enero", ingresos: 18000 },
    { mes: "Febrero", ingresos: 22000 },
    { mes: "Marzo", ingresos: 28000 },
  ],
}

const datosSemanas: Record<string, DatosSemana[]> = {
  Ene: [
    { semana: "Semana 1", ingresos: 800 },
    { semana: "Semana 2", ingresos: 1200 },
    { semana: "Semana 3", ingresos: 950 },
    { semana: "Semana 4", ingresos: 1050 },
  ],
  Feb: [
    { semana: "Semana 1", ingresos: 1400 },
    { semana: "Semana 2", ingresos: 750 },
    { semana: "Semana 3", ingresos: 1500 },
    { semana: "Semana 4", ingresos: 1300 },
  ],
  Mar: [
    { semana: "Semana 1", ingresos: 1200 },
    { semana: "Semana 2", ingresos: 1400 },
    { semana: "Semana 3", ingresos: 1500 },
    { semana: "Semana 4", ingresos: 1400 },
  ],
  Abr: [
    { semana: "Semana 1", ingresos: 1800 },
    { semana: "Semana 2", ingresos: 2100 },
    { semana: "Semana 3", ingresos: 2000 },
    { semana: "Semana 4", ingresos: 2100 },
  ],
  May: [
    { semana: "Semana 1", ingresos: 1600 },
    { semana: "Semana 2", ingresos: 1900 },
    { semana: "Semana 3", ingresos: 1800 },
    { semana: "Semana 4", ingresos: 1900 },
  ],
  Jun: [
    { semana: "Semana 1", ingresos: 2200 },
    { semana: "Semana 2", ingresos: 2500 },
    { semana: "Semana 3", ingresos: 2300 },
    { semana: "Semana 4", ingresos: 2500 },
  ],
}

interface Props {
  periodo: Periodo
}


interface Props {
  periodo: Periodo
}

/* ========= TOOLTIP CUSTOM ========= */

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {

  if (!active || !payload || payload.length === 0) {
    return null
  }

  const data = payload[0]

  return (
    <div
      className="
        rounded-xl
        border border-white/10
        bg-zinc-900/95
        backdrop-blur-md
        px-4 py-3
        shadow-2xl
      "
    >

      <p className="text-xs text-zinc-400 mb-1">
        {label}
      </p>

      <p className="text-lg font-semibold text-cyan-400">
        ${Number(data.value).toLocaleString()}
      </p>

    </div>
  )
}

/* ========= COMPONENTE PRINCIPAL ========= */


export default function GraficaIngresos({ periodo }: Props) {
  const [expandida, setExpandida] = useState(false)
  const [mesSeleccionado, setMesSeleccionado] = useState<string | null>(null)
  const [key, setKey] = useState(0)

  // Resetea el mes cuando cambia el período
  useEffect(() => {
    setMesSeleccionado(null)
  }, [periodo])

  const datos: Datos[] = mesSeleccionado
    ? datosSemanas[mesSeleccionado]
    : datosPorPeriodo[periodo]

  const claveX = mesSeleccionado ? "semana" : "mes"
  
 const tendenciasPorPeriodo = {
  "7d": {
    valor: "+4%",
    positiva: true,
    texto: "vs ayer",
  },

  "30d": {
    valor: "+12%",
    positiva: true,
    texto: "vs mes pasado",
  },

  "90d": {
    valor: "-3%",
    positiva: false,
    texto: "vs trimestre pasado",
  },
}

  
  const tendencia = tendenciasPorPeriodo[periodo]
  

  useEffect(() => {
    setKey(prev => prev + 1)
  }, [mesSeleccionado, periodo])

  const handleClick = (data: any) => {
    if (mesSeleccionado) return
    // Drill-down solo disponible en 30d donde hay semanas definidas
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
            <div>

              <CardTitle className="text-sm text-zinc-400">
                {mesSeleccionado
                  ? `Ingresos por semana — ${mesSeleccionado}`
                  : periodo === "7d"
                    ? "Ingresos por día"
                    : periodo === "90d"
                      ? "Ingresos por trimestre"
                      : "Ingresos por mes"
                }
              </CardTitle>

              {/* TENDENCIA */}
              <div
                className={`
      mt-2
      flex items-center gap-1
      w-fit
      px-2 py-1 rounded-full
      text-xs font-medium

      ${tendencia.positiva
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                  }
    `}
              >

                {tendencia.positiva ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}

                <span>
                  {tendencia.valor}
                </span>

                <span className="text-zinc-500">
                  vs mes pasado
                </span>

              </div>

            </div>
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
          style={{ height: expandida ? 500 : 300 }}
        >
          <ResponsiveContainer key={key} width="100%" height="100%">
            <LineChart
              data={datos}
              onClick={handleClick}
              style={{ cursor: !mesSeleccionado && periodo === "30d" ? "pointer" : "default" }}
            >
              <XAxis dataKey={claveX} stroke="#71717a" />
              <YAxis stroke="#71717a" />
              <Tooltip
                content={<CustomTooltip />}
                formatter={(value: any) => {
                  const num = Number(value ?? 0)
                  return [`$${num.toLocaleString()}`, "Ingresos"]
                }}
              />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={{ fill: "#22d3ee", r: 6, cursor: "pointer" }}
                activeDot={{ r: 8, cursor: "pointer" }}
                isAnimationActive={true}
                animationDuration={600}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}