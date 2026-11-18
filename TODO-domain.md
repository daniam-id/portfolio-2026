# Nanti: pindah ke adamdev.web.id

Catatan pengingat, ditulis 18 Nov 2026. Hapus file ini setelah domainnya pindah.

## Keadaan sekarang

- Situs ini live di **https://daniam-id.github.io/portfolio-2026/** (GitHub Pages,
  base path `/portfolio-2026/` dari `steps.pages.outputs.base_path` di workflow).
- **https://adamdev.web.id/ masih menyajikan build Astro yang lain** ("Adam Daniam |
  Web & AI Developer"). Jadi domain itu belum kosong — deployment lamanya harus
  dimatikan atau diganti dulu.
- Di `index.html` sekarang `canonical` dan `og:url` menunjuk ke `https://adamdev.web.id/`,
  padahal isinya situs lain. `og:image` menunjuk `https://adamdev.web.id/share.png`
  yang **404**, dan `public/share.png` memang tidak ada.

## Urutan pindah

1. **Kosongkan adamdev.web.id** — matikan/mindahkan deployment Astro yang sekarang
   jalan di sana sebelum apa pun, supaya tidak ada dua versi yang hidup.
2. **Pasang domain di GitHub Pages**: Settings → Pages → Custom domain →
   `adamdev.web.id`. Ini membuat file `CNAME`.
3. **DNS**: apex `adamdev.web.id` → A record ke IP GitHub Pages
   (185.199.108.153, .109.153, .110.153, .111.153), `www` → CNAME `daniam-id.github.io`.
   Tunggu sertifikat HTTPS terbit di Pages sebelum mengaktifkan "Enforce HTTPS".
4. **Base path balik ke "/"**. Workflow mengisi `BASE_PATH` dari `base_path` Pages,
   dan custom domain membuat nilainya `/`. Build ulang, lalu pastikan aset tidak lagi
   berawalan `/portfolio-2026/`.
5. **Perbarui kepala halaman**: `canonical`, `og:url`, `og:image` →
   `https://adamdev.web.id/`, dan tambahkan `public/share.png` ukuran 1200×630.
6. **Verifikasi**: buka domain baru, cek 404 aset di console Network, jalankan
   Lighthouse, dan cek pratinjau link di WhatsApp/LinkedIn benar-benar memakai
   gambar baru.

## Sesudahnya

- Hapus file ini.
- Pertimbangkan redirect dari `daniam-id.github.io/portfolio-2026/` ke domain baru
  (halaman HTML kecil berisi `meta refresh` + `link rel=canonical`).
