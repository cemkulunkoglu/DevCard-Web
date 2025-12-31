import { useMemo } from 'react'
import LanguageBars from './LanguageBars.jsx'
import TopRepos from './TopRepos.jsx'

function pick(obj, keys, fallback = undefined) {
  for (const k of keys) {
    if (obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k]
  }
  return fallback
}

function normalizeLanguages(raw) {
  if (!raw) return []

  // Array: [{ name, percentage, colorHex }]
  if (Array.isArray(raw)) return raw

  // Object map: { JavaScript: { percentage, colorHex } } or { JavaScript: 42 }
  if (typeof raw === 'object') {
    return Object.entries(raw).map(([name, value]) => {
      if (typeof value === 'number') return { name, percentage: value, colorHex: '#94a3b8' }
      return {
        name,
        percentage: value?.percentage ?? value?.percent ?? value?.value ?? 0,
        colorHex: value?.colorHex ?? value?.color ?? '#94a3b8',
      }
    })
  }

  return []
}

function StatChip({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[11px] font-medium text-slate-200/60">{label}</div>
      <div className="mt-0.5 text-sm font-semibold tabular-nums text-white">{value ?? 0}</div>
    </div>
  )
}

export default function DevCard({ portfolio }) {
  const username =
    pick(portfolio, ['username', 'userName', 'login'], '') ||
    pick(portfolio?.user, ['username', 'userName', 'login'], '') ||
    pick(portfolio?.profile, ['username', 'userName', 'login'], '')

  const name =
    pick(portfolio, ['name', 'fullName', 'displayName'], '') ||
    pick(portfolio?.user, ['name', 'fullName', 'displayName'], '') ||
    pick(portfolio?.profile, ['name', 'fullName', 'displayName'], '') ||
    username

  const avatarUrl =
    pick(portfolio, ['avatarUrl', 'avatarURL', 'avatar', 'imageUrl'], '') ||
    pick(portfolio?.user, ['avatarUrl', 'avatarURL', 'avatar', 'imageUrl'], '') ||
    pick(portfolio?.profile, ['avatarUrl', 'avatarURL', 'avatar', 'imageUrl'], '')

  const rawWebsite =
    pick(portfolio, ['websiteUrl', 'website', 'webSite', 'blog', 'site'], '') ||
    pick(portfolio?.user, ['websiteUrl', 'website', 'webSite', 'blog', 'site'], '') ||
    pick(portfolio?.profile, ['websiteUrl', 'website', 'webSite', 'blog', 'site'], '')

  const website = useMemo(() => {
    const w = String(rawWebsite || '').trim()
    if (!w) return ''
    if (/^https?:\/\//i.test(w)) return w
    return `https://${w}`
  }, [rawWebsite])

  const stats = portfolio?.stats || portfolio?.statistics || portfolio
  const repos = pick(stats, ['totalRepos', 'repos', 'repositories', 'repoCount'], 0)
  const stars = pick(stats, ['stars', 'totalStars', 'stargazers'], 0)
  const forks = pick(stats, ['totalForks', 'forks', 'totalForks'], 0)

  const languages = normalizeLanguages(
    pick(portfolio, ['languages', 'languageStats', 'languageDistribution'], null),
  )

  const topRepos = pick(portfolio, ['topRepos', 'topRepositories', 'repositories'], [])

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/15 bg-white/5">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-200/60">
              Avatar
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="truncate text-xl font-semibold text-white">{name}</h2>
            {username ? (
              <span className="truncate text-sm text-slate-200/70">@{username}</span>
            ) : null}
          </div>

          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex max-w-full items-center gap-2 truncate rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 transition hover:bg-white/10"
            >
              <span className="text-slate-200/60">Website</span>
              <span className="truncate">{website}</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatChip label="Repos" value={repos} />
        <StatChip label="Stars" value={stars} />
        <StatChip label="Forks" value={forks} />
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-white">Diller</h3>
        <div className="mt-3">
          <LanguageBars languages={languages} />
        </div>
      </div>

      <div className="mt-7">
        <h3 className="text-sm font-semibold text-white">Top Repos</h3>
        <div className="mt-3">
          <TopRepos repos={topRepos} />
        </div>
      </div>
    </div>
  )
}


