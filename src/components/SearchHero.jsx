function LoadingSpinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-hidden="true"
    />
  )
}

export default function SearchHero({
  username,
  onUsernameChange,
  onSubmit,
  disabled,
  canSubmit,
  status,
}) {
  const isLoading = status === 'loading'

  function handleFormSubmit(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div className="md:sticky md:top-10">
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Modern, minimal,{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
                cam efektli
              </span>{' '}
              kartvizit
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-200/75">
              GitHub kullanıcı adını yaz, portföyünü saniyeler içinde modern bir DevCard’a dönüştürelim.
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="github-username"
              className="block text-sm font-medium text-slate-100"
            >
              GitHub kullanıcı adını gir
            </label>
            <div className="mt-2">
              <input
                id="github-username"
                name="github-username"
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                disabled={disabled}
                placeholder="ör. octocat"
                autoComplete="off"
                spellCheck={false}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-300/60 outline-none transition focus:border-white/25 focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-60"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <LoadingSpinner /> : null}
            {isLoading ? 'Yükleniyor…' : 'Kartvizit Oluştur'}
          </button>
        </form>
      </div>
    </div>
  )
}


