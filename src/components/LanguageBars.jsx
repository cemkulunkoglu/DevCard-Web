function clampNumber(n, min, max) {
  const x = Number(n)
  if (Number.isNaN(x)) return min
  return Math.max(min, Math.min(max, x))
}

export default function LanguageBars({ languages = [] }) {
  if (!Array.isArray(languages) || languages.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-slate-200/70">Dil dağılımı bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {languages.map((lang) => {
        const name = lang?.name || lang?.language || 'Bilinmiyor'
        const percent = clampNumber(lang?.percentage ?? lang?.percent ?? lang?.value ?? 0, 0, 100)
        const color = lang?.colorHex || lang?.color || '#94a3b8'
        return (
          <div key={name} className="space-y-1">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-200/70">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <span className="truncate">{name}</span>
              </div>
              <span className="tabular-nums">{percent.toFixed(1)}%</span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${percent}%`, backgroundColor: color }}
                role="progressbar"
                aria-label={`${name} yüzdesi`}
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}


