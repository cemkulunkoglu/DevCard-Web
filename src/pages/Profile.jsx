import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import DevCard from '../components/DevCard.jsx'
import { fetchPortfolio } from '../services/devcardApi.js'

function DevCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-white/10" />
          <div className="flex-1">
            <div className="h-5 w-44 rounded bg-white/10" />
            <div className="mt-2 h-4 w-28 rounded bg-white/10" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="h-10 rounded-xl bg-white/10" />
          <div className="h-10 rounded-xl bg-white/10" />
          <div className="h-10 rounded-xl bg-white/10" />
        </div>
        <div className="mt-7 space-y-3">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-11/12 rounded bg-white/10" />
          <div className="h-2 w-10/12 rounded bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function Profile() {
  const { username } = useParams()
  const [status, setStatus] = useState('loading') // loading | success | error
  const [portfolio, setPortfolio] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const abortRef = useRef(null)

  useEffect(() => {
    if (!username) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    // Don't call setState synchronously inside the effect body.
    // Instead, reset states right before fetching, asynchronously.
    Promise.resolve().then(() => {
      setStatus('loading')
      setErrorMessage('')
      setPortfolio(null)
    })

    fetchPortfolio(username, { signal: controller.signal })
      .then((data) => {
        setPortfolio(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return
        setErrorMessage(err?.message || 'Beklenmeyen bir hata oluştu.')
        setStatus('error')
      })

    return () => controller.abort()
  }, [username])

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs text-slate-200/60">Paylaşılabilir profil</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="text-lg font-semibold text-white">DevCard</div>
            <span className="text-sm text-slate-200/70">@{username}</span>
          </div>
        </div>
        <Link
          to="/"
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
        >
          Yeni arama
        </Link>
      </div>

      {status === 'loading' && <DevCardSkeleton />}

      {status === 'error' && (
        <div className="glass rounded-3xl p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white">Bir sorun oluştu</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-200/80">
            {errorMessage || 'Beklenmeyen bir hata oluştu.'}
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-200/60">
            Not: Tarayıcı konsolunda <span className="font-medium">CORS</span> hatası görürsen,
            backend tarafında CORS izinlerinin açılması gerekir.
          </p>
        </div>
      )}

      {status === 'success' && <DevCard portfolio={portfolio} />}
    </div>
  )
}


