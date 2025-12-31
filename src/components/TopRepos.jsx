function StatPill({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-200/70">
      <span className="text-slate-200/60">{label}</span>
      <span className="tabular-nums text-slate-100">{value ?? 0}</span>
    </span>
  )
}

export default function TopRepos({ repos = [] }) {
  const list = Array.isArray(repos) ? repos.slice(0, 5) : []

  if (list.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-slate-200/70">Öne çıkan repo bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {list.map((repo) => {
        const name = repo?.name || repo?.repoName || 'repo'
        const description = repo?.description || repo?.desc || ''
        const stars = repo?.stars ?? repo?.stargazers ?? repo?.stargazerCount ?? 0
        const forks = repo?.forks ?? repo?.forkCount ?? 0
        const language = repo?.language || repo?.primaryLanguage || ''
        const color = repo?.languageColorHex || repo?.languageColor || repo?.colorHex || '#94a3b8'
        const url = repo?.url || repo?.htmlUrl || repo?.html_url

        return (
          <article key={name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-white">{name}</h4>
                {description ? (
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-200/70">
                    {description}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-200/50">Açıklama yok.</p>
                )}
              </div>

              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100 transition hover:bg-white/10"
                >
                  GitHub’da aç
                </a>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {language ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-200/70">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <span className="text-slate-100">{language}</span>
                </span>
              ) : null}
              <StatPill label="★" value={stars} />
              <StatPill label="⑂" value={forks} />
            </div>
          </article>
        )
      })}
    </div>
  )
}


