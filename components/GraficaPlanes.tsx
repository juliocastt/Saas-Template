"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Periodo = "7d" | "30d" | "90d"

const datosPorPeriodo: Record<Periodo, { nombre: string; valor: number }[]> = {
  "7d": [
    { nombre: "Basic", valor: 120 },
    { nombre: "Pro", valor: 95 },
    { nombre: "Enterprise", valor: 58 },
  ],
  "30d": [
    { nombre: "Basic", valor: 540 },
    { nombre: "Pro", valor: 420 },
    { nombre: "Enterprise", valor: 280 },
  ],
  "90d": [
    { nombre: "Basic", valor: 1480 },
    { nombre: "Pro", valor: 1150 },
    { nombre: "Enterprise", valor: 720 },
  ],
}

const COLORES = ["#22d3ee", "#6366f1", "#f59e0b"]

interface Props {
  periodo: Periodo
}

export default function GraficaPlanes({ periodo }: Props) {
  const datos = datosPorPeriodo[periodo]

  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader>
        <CardTitle className="text-sm text-zinc-400">
          Distribución de planes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={datos}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              dataKey="valor"
              isAnimationActive={true}
              animationDuration={600}
            >
              {datos.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORES[index % COLORES.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#a1a1aa" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}