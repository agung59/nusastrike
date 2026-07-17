# NusaStrike (PWA)

## Setup di Termux

```bash
cd nusastrike
npm install
npm run dev
```

Buka `http://localhost:5173` di browser HP lo (Chrome/Firefox).

## Struktur project

```
src/
├── App.jsx              # root: state management, tab routing, bottom nav
├── main.jsx              # entry point
├── index.css              # tailwind directives
├── data/
│   └── mockData.js       # semua data dummy (cuaca, tide, hotspot, community, dll)
├── utils/
│   └── helpers.js         # formatTime, calculateDistance, aiReply, dll
├── pages/                 # 1 file = 1 tab/halaman utama
│   ├── WeatherPage.jsx
│   ├── SeaPage.jsx
│   ├── SolunarPage.jsx
│   ├── LogbookPage.jsx
│   ├── MapPage.jsx
│   ├── CommunityPage.jsx
│   └── ProfilePage.jsx
└── components/             # komponen reusable & modal/sheet
    ├── PremiumCard.jsx
    ├── WeatherIcon.jsx
    ├── TripCard.jsx
    ├── TripDetailView.jsx
    ├── TimelineItem.jsx
    ├── AddCatchModal.jsx
    ├── AddTimelineEventModal.jsx
    ├── TripSummarySheet.jsx
    ├── HotspotDetailSheet.jsx
    ├── PostDetailSheet.jsx
    └── NotificationSheet.jsx
```

## Catatan

- Semua data masih **mock/dummy** (ada di `src/data/mockData.js`). Belum konek API asli.
- Icon set masih import penuh dari `lucide-react` di tiap file biar aman — nanti kalau mau optimize bundle size, tinggal trim import yang gak kepake per file.
- PWA config ada di `vite.config.js` (manifest, service worker via `vite-plugin-pwa`). Icon `icon-192.png` & `icon-512.png` belum ada — taruh file PNG-nya di folder `public/` sebelum build production, kalau gak nanti manifest error pas testing "Add to Home Screen".
- Testing PWA install prompt butuh HTTPS — kalau mau tes beneran, deploy dulu ke Vercel/Netlify (gratis + HTTPS otomatis), gak bisa dari `localhost` biasa.

## Next steps yang masih perlu digarap

- Ganti mock data jadi fetch API asli (cuaca, tide, dll)
- Tambah `public/manifest icons` (192px & 512px)
- State management masih semua di `App.jsx` (single source) — kalau makin gede, pertimbangkan pecah pakai Context atau Zustand
