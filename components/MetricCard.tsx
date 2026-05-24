"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MetricCardProps {
  title: string
  value: string
  change: string
  description: string
  details: string[]
}

export default function MetricCard({ title, value, change, description, details }: MetricCardProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <>
      {/* CARD CLICKEABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={() => setAbierto(true)}
        className="cursor-pointer"
      >
        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-sm text-zinc-400">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="text-sm text-green-400 mt-1">{change}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* MODAL CON DETALLES */}
      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogContent className="bg-zinc-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{title}</DialogTitle>
          </DialogHeader>

          <div className="mt-4">

            {/* VALOR PRINCIPAL */}
            <p className="text-4xl font-bold text-white">{value}</p>
            <p className="text-sm text-green-400 mt-1">{change}</p>

            {/* DESCRIPCIÓN */}
            <p className="text-zinc-400 mt-4 text-sm">{description}</p>

            {/* DETALLES */}
            <div className="mt-6 flex flex-col gap-3">
              {details.map((detalle, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span className="text-zinc-400 text-sm">{detalle}</span>
                </div>
              ))}
            </div>

          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}