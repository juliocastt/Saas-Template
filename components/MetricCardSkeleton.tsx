import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MetricCardSkeleton() {
  return (
    <Card className="bg-zinc-900 border-white/10">
      <CardHeader>
        {/* Imita el título pequeño */}
        <Skeleton className="h-4 w-24 bg-zinc-800" />
      </CardHeader>
      <CardContent>
        {/* Imita el valor grande "$24,500" */}
        <Skeleton className="h-9 w-32 bg-zinc-800" />
        {/* Imita el "+12% este mes" */}
        <Skeleton className="h-3 w-20 bg-zinc-800 mt-2" />
      </CardContent>
    </Card>
  )
}