interface Props {
  periodoActivo: string
  onChange: (periodo: string) => void
}

const periodos = [
  { label: "7 días", value: "7d" },
  { label: "30 días", value: "30d" },
  { label: "90 días", value: "90d" },
]

export default function TogglePeriodo({ periodoActivo, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-white/10 rounded-lg p-1">
      {periodos.map((p) => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
            ${periodoActivo === p.value
              ? "bg-cyan-500 text-black"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
            }
          `}
        >
          {p.label}
        </button>
      ))}
    </div>
  )
}