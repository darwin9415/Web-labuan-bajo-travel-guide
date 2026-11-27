# Bajo Travel Guide: review, perubahan, dan panduan deploy

## Isi paket

- `index.html`: halaman utama. Gambar base64 (5,6 MB) sudah dipindah ke `images/` (4,1 MB, 47 file unik). Ukuran HTML turun dari 5,68 MB menjadi 92 KB.
- `images/`: foto-foto hotel dan destinasi. Nama file bersifat generik (`photo-01-xxxxxx.jpg`). Jika ingin nama yang bermakna, ganti nama dan sesuaikan referensinya di `index.html`.
- `worker/worker.js`: Worker yang sudah diperkuat (lihat daftar perubahan di bawah).
- `worker/wrangler.toml`: konfigurasi tidak berubah.

## Hasil review

**Harus diperbaiki sebelum dipakai**

1. **URL Worker belum diisi.** Di `index.html` (blok `<script>` widget chat), `WORKER_URL` masih `https://bajo-guide-chat.YOUR-SUBDOMAIN.workers.dev`. Selama placeholder ini ada, widget hanya menampilkan pesan "belum aktif". Ganti dengan URL Worker setelah deploy.
2. **Origin hanya melindungi dari browser.** Pemeriksaan `Origin` bisa dipalsukan oleh skrip non-browser. Siapa pun yang tahu URL Worker bisa memanggilnya dan menghabiskan kredit API. Tambahkan rate limit (lihat langkah 4 di bawah).
3. **Form lead tidak aktif.** `LEAD_URL=''` di `index.html`, jadi `sendLead()` tidak mengirim apa pun. Jika form ini dimaksudkan untuk dipakai, isi `LEAD_URL` dengan endpoint yang valid.

**Perbaikan yang sudah diterapkan di `worker/worker.js`**

- Batas ukuran request body 16 KB (sebelumnya tidak ada).
- Pesan kosong dibuang, dan riwayat yang diawali pesan `assistant` dipangkas agar pesan pertama selalu dari user.
- Timeout 15 detik untuk panggilan ke API Anthropic (sebelumnya bisa menunggu tanpa batas).
- Error saat `fetch` ke upstream juga ditangani (sebelumnya bisa melempar exception tanpa respons yang rapi).
- Header CORS dikembalikan konstan ke origin yang diizinkan, dan komentar tentang batasan `Origin` ditambahkan.

**Catatan**

- `index.html` menyertakan tanggal dan nomor WhatsApp yang konsisten dengan system prompt (`6285337591753`, `+62 853-3759-1753`). Tetap cek ulang harga dan kuota taman sebelum publikasi, karena system prompt menyebutnya sebagai titik awal dari listing 2026.
- Di system prompt, nominal tiket taman nasional sengaja tidak final. Pertahankan kebijakan itu.

## Panduan deploy

**1. Siapkan Worker**

```bash
cd worker
npm install -g wrangler        # jika belum ada
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY   # tempel API key, jangan disimpan di file
npx wrangler deploy
```

Setelah deploy, Wrangler menampilkan URL seperti `https://bajo-guide-chat.<subdomain>.workers.dev`.

**2. Hubungkan website**

Di `index.html`, ganti:

```js
const WORKER_URL='https://bajo-guide-chat.YOUR-SUBDOMAIN.workers.dev';
```

dengan URL dari langkah 1.

**3. Publikasikan ke GitHub Pages**

Unggah isi folder `bajo-guide/` (termasuk `images/`) ke repositori `Web-labuan-bajo-travel-guide`, lalu aktifkan GitHub Pages pada branch utama. Pastikan `index.html` berada di root.

**4. Pasang rate limit (disarankan)**

Aturan rate limit Cloudflare (WAF → Rate limiting rules) berlaku pada zone (domain) yang Anda kelola. Alamat `*.workers.dev` tidak selalu berada di zone yang bisa diatur, jadi Anda mungkin perlu menghubungkan Worker ke custom domain terlebih dahulu. Setelah itu, buat aturan misalnya 10 request per menit per IP untuk path Worker. Menu dan opsinya dapat berbeda sesuai paket akun, jadi cek dokumentasi Cloudflare terbaru jika tampilannya tidak sama.

**5. Uji**

- Buka website dari `https://darwin9415.github.io` dan kirim pesan di widget. Balasan harus muncul.
- Uji dari `http://localhost` atau domain lain. Permintaan seharusnya ditolak dengan `403 Origin not allowed`. Ini perilaku yang benar.
- Jika muncul error CORS di konsol, periksa bahwa `ALLOWED_ORIGIN` di `wrangler.toml` sama persis dengan origin halaman (tanpa garis miring di akhir).

## Mengganti system prompt

System prompt ada di konstanta `SYSTEM_PROMPT` di `worker.js`. Setelah diubah, jalankan ulang `npx wrangler deploy`. Tidak perlu mengubah website.
