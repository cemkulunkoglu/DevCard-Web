import { useEffect, useMemo, useRef, useState } from 'react'
import SearchHero from './components/SearchHero.jsx'
import DevCard from './components/DevCard.jsx'
import { fetchPortfolio } from './services/devcardApi.js'

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

        <div className="mt-6 space-y-3">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="h-2 w-11/12 rounded bg-white/10" />
          <div className="h-2 w-10/12 rounded bg-white/10" />
        </div>

        <div className="mt-7 space-y-3">
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="h-20 w-full rounded-2xl bg-white/10" />
          <div className="h-20 w-full rounded-2xl bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [portfolio, setPortfolio] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const abortRef = useRef(null)

  const isLoading = status === 'loading'

  const canSubmit = useMemo(() => {
    return !isLoading && username.trim().length > 0
  }, [isLoading, username])

  async function handleSubmit() {
    const trimmed = username.trim()
    if (!trimmed) return

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('loading')
    setErrorMessage('')
    setPortfolio(null)

    try {
      const data = await fetchPortfolio(trimmed, { signal: controller.signal })
      setPortfolio(data)
      setStatus('success')
    } catch (err) {
      if (err?.name === 'AbortError') return
      setErrorMessage(err?.message || 'Beklenmeyen bir hata oluştu.')
      setStatus('error')
    }
  }

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute -bottom-52 right-1/4 h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              DevCard
            </h1>
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-200/75 md:text-base">
            GitHub kullanıcı adına göre portföy verini çekip modern bir kartvizit olarak sunar.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-start">
          <SearchHero
            username={username}
            onUsernameChange={setUsername}
            onSubmit={handleSubmit}
            disabled={isLoading}
            canSubmit={canSubmit}
            status={status}
          />

          <div className="md:pt-2">
            {status === 'idle' && (
              <div className="glass rounded-3xl p-6 md:p-8">
                <h2 className="text-lg font-semibold text-white">
                  Önizleme burada görünecek
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-200/80">
                  GitHub kullanıcı adını girip <span className="font-medium">Kartvizit Oluştur</span>{' '}
                  butonuna bas.
                </p>
              </div>
            )}

            {status === 'loading' && <DevCardSkeleton />}

            {status === 'error' && (
              <div className="glass rounded-3xl p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-400" />
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold text-white">Bir sorun oluştu</h2>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-200/80">
                      {errorMessage || 'Beklenmeyen bir hata oluştu.'}
                    </p>
                    <p className="mt-4 text-xs leading-5 text-slate-200/60">
                      Not: Tarayıcı konsolunda <span className="font-medium">CORS</span> hatası
                      görürsen, backend tarafında CORS izinlerinin açılması gerekir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === 'success' && <DevCard portfolio={portfolio} />}
          </div>
        </div>
      </div>
    </div>
  )
}
