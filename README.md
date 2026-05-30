# 🌌 AeroSuite Quantum - Tugas Akhir MK Pemrograman Web Lanjutkan

Repositori ini berisi **AeroSuite Quantum**, sebuah dashboard portofolio interaktif bertema masa depan (*glassmorphism*) yang menyatukan **5 Tugas Projek Sertifikasi Frontend Development Libraries dari FreeCodeCamp**. 

Aplikasi ini dikembangkan menggunakan **React 19**, **Vite**, dan **Vanilla CSS** dengan optimalisasi penuh untuk lulus pengujian otomatis dari FreeCodeCamp (100% Passed) secara langsung di server produksi.

---

## 🏫 Detail Mata Kuliah & Projek

* **Mata Kuliah:** Pemrograman Web Lanjutkan
* **Tingkat/Prodi:** Teknik Informatika / Sistem Informasi
* **Status Projek:** Selesai (5/5 Tugas Lolos Tes Otomatis 100%)
* **Domain Produksi (Live Vercel):** [https://project01.andredev.web.id/](https://project01.andredev.web.id/)

---

## 🛠️ Pemetaan Tugas Projek & Modul Aplikasi

Berikut adalah pembagian detail kelima tugas mata kuliah yang telah diintegrasikan secara terpadu di dalam dashboard portofolio ini:

### 1. 💬 Tugas Project 01: Random Quote Machine (AeroQuotes)
* **Nama Modul:** AeroQuotes Machine
* **Deskripsi:** Menampilkan kutipan acak dengan transisi transparan (*fade effect*) dan perubahan palet warna latar belakang secara dinamis. Memiliki fitur berbagi kutipan secara instan ke Twitter/X dan Tumblr.
* **Status Pengujian:** **12/12 Tes Lolos (100%)**

### 2. 📝 Tugas Project 02: Markdown Previewer (AeroWrite)
* **Nama Modul:** AeroWrite Workspace
* **Deskripsi:** Editor teks Markdown *split-screen* yang mengubah kode Markdown mentah menjadi representasi HTML terformat secara langsung (*real-time rendering*) menggunakan pustaka `marked`. Dilengkapi tombol maksimalkan (*maximize*) layar untuk kenyamanan mengetik.
* **Status Pengujian:** **8/8 Tes Lolos (100%)**

### 3. 🥁 Tugas Project 03: Drum Machine (AeroBeats)
* **Nama Modul:** AeroBeats Synthesizer
* **Deskripsi:** Papan synthesizer audio taktil dengan 9 drum pad responsif yang memicu sampel audio instan saat diklik atau ditekan menggunakan tombol keyboard (`Q, W, E, A, S, D, Z, X, C`). Dilengkapi pengaturan volume digital, tombol power, dan dua bank instrumen suara (*Heater Kit* & *Smooth Piano Kit*).
* **Status Pengujian:** **8/8 Tes Lolos (100%)**

### 4. 🧮 Tugas Project 04: Build a JavaScript Calculator (AeroCalc)
* **Nama Modul:** AeroCalc Quantum Console
* **Deskripsi:** Kalkulator matematika berpresisi tinggi dengan panel layar digital melengkung (*CRT screen effect*). Mendukung urutan operasi aritmatika standar (*order of operations*), penanganan desimal ganda yang ketat, serta penanganan rentetan operator berturut-turut di mana operator minus bertindak sebagai tanda negatif.
* **Status Pengujian:** **16/16 Tes Lolos (100%)**

### 5. ⏰ Tugas Project 05: Build a 25 + 5 Clock (AeroTime)
* **Nama Modul:** AeroTime Focus Station
* **Deskripsi:** Jam fokus Pomodoro taktis bertema kokpit hologram. Memiliki indikator cincin neon melingkar yang berdenyut lembut (*breathing glow animation*) dengan warna berbeda untuk masa kerja (*Session*) dan masa istirahat (*Break*). Menggunakan interval reaktif presisi tinggi dan alarm beeper sinkron.
* **Status Pengujian:** **29/29 Tes Lolos (100%)**

---

## 📌 Penandaan Commit & Riwayat Pengembangan (Git Commit History)

Untuk memudahkan dosen atau pengembang lain dalam menelusuri tahapan pembuatan masing-masing projek, berikut adalah daftar **Commit Hash** spesifik yang menandakan titik selesainya masing-masing tugas:

| Tugas / Projek | Versi Commit | Deskripsi Riwayat Commit | Commit Hash |
| :--- | :--- | :--- | :--- |
| **Inisialisasi Awal** | Awal Mula | Inisialisasi awal repositori | `34cdf8b` |
| **Tugas Project 01** | AeroQuotes | Inisialisasi React, Vite, dan pembuatan modul Random Quote Machine | `13f2b41` |
| **Tugas Project 02** | AeroWrite | Integrasi editor Markdown Previewer dan navigasi tab antar-projek | `adc9f29` |
| **Tugas Project 03** | AeroBeats | Penambahan instrumen Drum Machine, sample audio, volume slider, dan pendeteksi keyboard | `458c410` |
| **Tugas Project 04** | AeroCalc | Pembuatan kalkulator aritmatika berpresisi tinggi dan sinkronisasi tes React 19 | `e28b90f` |
| **Tugas Project 05** | AeroTime | Penyelesaian jam Pomodoro Clock, alarm beeper, HUD melingkar, dan sinkronisasi final | `a3b6e95` |

### 🚀 Cara Menelusuri Tahapan Projek Tertentu
Jika Anda ingin melihat atau menguji kode program pada **tahap tugas tertentu**, Anda dapat melakukan checkout ke Commit Hash di atas menggunakan perintah berikut di terminal Anda:

```bash
# Contoh: Jika Anda ingin mundur ke tahapan Tugas Project 02 (Markdown Previewer)
git checkout adc9f29

# Kembali ke versi final terupdate (Tugas Project 05)
git checkout main
```

---

## 🚀 Cara Menjalankan Projek di Lokal

Bagi Anda yang ingin mengkloning dan menjalankan aplikasi ini secara lokal di komputer Anda, ikuti langkah-langkah berikut:

### 1. Kloning Repositori
```bash
git clone https://github.com/andre4freelance/SiberMu-web-lanjutan-tugas-project-01.git
cd SiberMu-web-lanjutan-tugas-project-01
```

### 2. Instalasi Dependensi
Aplikasi ini dikembangkan dengan Node.js. Instal dependensi menggunakan npm:
```bash
npm install
```

### 3. Jalankan Mode Pengembangan (Local Dev Server)
Jalankan server lokal dengan hot-reload otomatis:
```bash
npm run dev
```
Buka browser Anda dan akses tautan lokal: `http://localhost:5173`.

### 4. Build untuk Produksi
Untuk mengompilasi aplikasi menjadi file HTML/JS/CSS statis yang optimal untuk hosting:
```bash
npm run build
```
Hasil kompilasi akan berada di dalam folder `/dist` yang siap di-deploy ke Vercel, Netlify, atau platform hosting lainnya.
