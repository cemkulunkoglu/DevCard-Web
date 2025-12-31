# DevCard UI (React + Vite + TailwindCSS)

Bu proje, backend’de hazır olan endpoint’ten portföy verisi çekip modern bir “DevCard” kartı gösteren tek sayfalık bir arayüzdür.

## Gereksinimler

- Node.js (LTS önerilir)

## Kurulum ve Çalıştırma

Vite projesini oluşturma (istenen komutlar):

```bash
npm create vite@latest devcard-ui -- --template react
cd devcard-ui
npm i
```

Tailwind kurulumu ve config:

```bash
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Geliştirme sunucusunu başlatma:

```bash
npm run dev
```

Uygulama varsayılan olarak şu adresten açılır:

- `http://localhost:5173`

## API

Frontend, şu endpoint’e istek atar:

- `GET https://localhost:7123/api/Portfolio/{username}`

### CORS / SSL Notu

- Tarayıcıda **CORS** hatası görürsen, backend tarafında CORS izinlerinin eklenmesi gerekir.
- `https://localhost` sertifikası güvenilmezse istekler **SSL** sebebiyle bloklanabilir; backend sertifikasını sistemde güvenilir hale getirmek gerekebilir.
