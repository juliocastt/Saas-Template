import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GraficaSkeleton() {
  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader>
        <Skeleton className="h-4 w-40 bg-zinc-800" />
      </CardHeader>
      <CardContent>
        {/* Imita el área de la gráfica */}
        <Skeleton className="h-[300px] w-full bg-zinc-800 rounded-lg" />
      </CardContent>
    </Card>
  )
}