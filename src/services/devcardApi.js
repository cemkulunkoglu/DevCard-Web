const API_BASE = 'https://localhost:7123'

function normalizeErrorMessage(err) {
  if (!err) return 'Beklenmeyen bir hata oluştu.'
  if (typeof err === 'string') return err
  if (err?.message) return err.message
  return 'Beklenmeyen bir hata oluştu.'
}

export async function fetchPortfolio(username, { signal } = {}) {
  const trimmed = String(username || '').trim()
  if (!trimmed) {
    throw new Error('GitHub kullanıcı adını gir.')
  }

  const url = `${API_BASE}/api/Portfolio/${encodeURIComponent(trimmed)}`

  let res
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    })
  } catch (err) {
    // Sık görülen sebepler:
    // - Backend CORS izinleri kapalı (tarayıcı bloklar)
    // - https://localhost sertifikası güvenilmez (SSL hatası)
    throw new Error(
      `API çağrısı başarısız. CORS veya SSL (sertifika) kaynaklı olabilir. Detay: ${normalizeErrorMessage(err)}`,
    )
  }

  if (res.status === 404) {
    throw new Error('Kullanıcı bulunamadı.')
  }

  if (!res.ok) {
    let bodyText = ''
    try {
      bodyText = await res.text()
    } catch {
      // ignore
    }
    throw new Error(
      `İstek başarısız (HTTP ${res.status}).${bodyText ? ` Yanıt: ${bodyText}` : ''}`,
    )
  }

  const json = await res.json()
  return json
}


