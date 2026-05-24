"use client"

import { useState, useEffect } from "react"
import MetricCard from "@/components/MetricCard"
import MetricCardSkeleton from "@/components/MetricCardSkeleton"
import GraficaSkeleton from "@/components/GraficaSkeleton"
import TogglePeriodo from "@/components/TogglePeriodo"
import GraficaIngresos from "@/components/GraficaIngresos"
import GraficaUsuarios from "@/components/GraficaUsuarios"
import GraficaPlanes from "@/components/GraficaPlanes"
import TablaTransacciones from "@/components/TablaTransacciones"

const datosPorPeriodo = {
    "7d": [
      {
        title: "Ingresos totales",
        value: "$5,200",
        change: "+3% esta semana",
        description: "Ingresos de los últimos 7 días.",
        details: [
          "Plan Basic: $1,800",
          "Plan Pro: $2,400",
          "Plan Enterprise: $1,000",
          "Reembolsos: -$0",
        ]
      },
      {
        title: "Usuarios activos",
        value: "310",
        change: "+2% esta semana",
        description: "Usuarios activos en los últimos 7 días.",
        details: [
          "Nuevos esta semana: 24",
          "Recurrentes: 286",
          "Inactivos: 58",
          "Cancelados: 3",
        ]
      },
      {
        title: "Pedidos nuevos",
        value: "82",
        change: "+5% esta semana",
        description: "Nuevas suscripciones esta semana.",
        details: [
          "Nuevas suscripciones: 50",
          "Upgrades de plan: 22",
          "Downgrades: 8",
          "Pendientes: 4",
        ]
      },
      {
        title: "Tasa de conversión",
        value: "2.8%",
        change: "+0.3% esta semana",
        description: "Visitantes convertidos esta semana.",
        details: [
          "Visitas totales: 9,200",
          "Registros: 440",
          "Conversiones: 310",
          "Mejor fuente: Google",
        ]
      },
    ],
    "30d": [
      // — estos son tus metrics actuales, solo los mueves aquí —
      {
        title: "Ingresos totales",
        value: "$24,500",
        change: "+12% este mes",
        description: "Ingresos acumulados de todas las suscripciones activas este mes.",
        details: [
          "Plan Basic: $8,200",
          "Plan Pro: $11,300",
          "Plan Enterprise: $5,000",
          "Reembolsos: -$0",
        ]
      },
      {
        title: "Usuarios activos",
        value: "1,240",
        change: "+8% este mes",
        description: "Usuarios que han iniciado sesión al menos una vez en los últimos 30 días.",
        details: [
          "Nuevos este mes: 98",
          "Recurrentes: 1,142",
          "Inactivos: 230",
          "Cancelados: 12",
        ]
      },
      {
        title: "Pedidos nuevos",
        value: "340",
        change: "+5% esta semana",
        description: "Total de nuevas suscripciones y upgrades registrados esta semana.",
        details: [
          "Nuevas suscripciones: 210",
          "Upgrades de plan: 95",
          "Downgrades: 35",
          "Pendientes: 18",
        ]
      },
      {
        title: "Tasa de conversión",
        value: "3.2%",
        change: "+1% este mes",
        description: "Porcentaje de visitantes que se convirtieron en usuarios de pago.",
        details: [
          "Visitas totales: 38,750",
          "Registros: 1,860",
          "Conversiones: 1,240",
          "Mejor fuente: Google",
        ]
      },
    ],
    "90d": [
      {
        title: "Ingresos totales",
        value: "$68,000",
        change: "+18% este trimestre",
        description: "Ingresos acumulados del último trimestre.",
        details: [
          "Plan Basic: $22,000",
          "Plan Pro: $31,000",
          "Plan Enterprise: $15,000",
          "Reembolsos: -$0",
        ]
      },
      {
        title: "Usuarios activos",
        value: "3,100",
        change: "+22% este trimestre",
        description: "Usuarios activos en los últimos 90 días.",
        details: [
          "Nuevos este trimestre: 290",
          "Recurrentes: 2,810",
          "Inactivos: 540",
          "Cancelados: 38",
        ]
      },
      {
        title: "Pedidos nuevos",
        value: "920",
        change: "+15% este trimestre",
        description: "Suscripciones del último trimestre.",
        details: [
          "Nuevas suscripciones: 580",
          "Upgrades de plan: 240",
          "Downgrades: 90",
          "Pendientes: 10",
        ]
      },
      {
        title: "Tasa de conversión",
        value: "3.8%",
        change: "+0.8% este trimestre",
        description: "Conversión del último trimestre.",
        details: [
          "Visitas totales: 108,000",
          "Registros: 5,200",
          "Conversiones: 3,100",
          "Mejor fuente: Orgánico",
        ]
      },
    ]
  }

type Periodo = "7d" | "30d" | "90d"

export default function Home() {
  const [cargando, setCargando] = useState(true)
  const [periodo, setPeriodo] = useState<Periodo>("30d")

  useEffect(() => {
    const timer = setTimeout(() => setCargando(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handlePeriodo = (nuevoPeriodo: string) => {
    setCargando(true)
    setPeriodo(nuevoPeriodo as Periodo)
    setTimeout(() => setCargando(false), 800)
  }

  const metrics = datosPorPeriodo[periodo]

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <TogglePeriodo periodoActivo={periodo} onChange={handlePeriodo} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cargando
            ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
            : metrics.map((metric) => <MetricCard key={metric.title} {...metric} />)
          }
        </div>

        <div className="mt-6">
          {/* ✅ periodo agregado aquí */}
          {cargando ? <GraficaSkeleton /> : <GraficaIngresos periodo={periodo} />}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cargando
          ? Array.from({ length: 2 }).map((_, i) => <GraficaSkeleton key={i} />)
          : <>
              {/* ✅ periodo agregado aquí */}
              <GraficaUsuarios periodo={periodo} />
              <GraficaPlanes periodo={periodo} />
              <TablaTransacciones />
            </>
        }
      </div>
    </>
  )
}