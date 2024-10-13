# Quiz App - ThinkTank

Aplikasi ini adalah aplikasi ujian pilihan ganda yang dibangun menggunakan ReactJS. Aplikasi ini memungkinkan pengguna untuk menjawab serangkaian pertanyaan dan mendapatkan feedback instan.

## Fitur Utama
- Menampilkan pertanyaan pilihan ganda yang diambil dari API eksternal.
- Memberikan feedback untuk jawaban yang benar dan salah.
- Memiliki timer untuk setiap pertanyaan.
- Menampilkan skor akhir setelah ujian selesai.

## Cara Menjalankan Aplikasi Secara Lokal

1. **Clone repositori:**
    ```bash
    git clone https://github.com/username/quiz-app.git
    cd quiz-app
    ```

2. **Install dependencies: Pastikan Anda sudah menginstal Node.js.**
    ```bash
    npm install
    ```

3. **Menjalankan aplikasi di development mode:**
    ```bash
    npm start
    ```
    Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

4. **Build untuk production:**
    ```bash
    npm run build
    ```

## Keputusan Desain
- **Tampilan responsif:** Antarmuka didesain agar responsif dan bisa digunakan di berbagai perangkat (ponsel, tablet, dan desktop).
- **Timer per pertanyaan:** Fitur ini membantu pengguna agar menjawab pertanyaan tepat waktu.
- **Umpan balik:** Pengguna menerima umpan balik langsung untuk jawaban yang benar atau salah.
- **Poin visual yang menarik:** Bayangan, gradasi warna, dan font yang bersih membuat aplikasi terlihat profesional.

## API yang Digunakan
Aplikasi ini mengambil data pertanyaan dari API berikut: [https://pacmann-frontend.pacmann.workers.dev/](https://pacmann-frontend.pacmann.workers.dev/)

## Teknologi yang Digunakan
- **ReactJS:** Library frontend JavaScript untuk membangun antarmuka pengguna.
- **Axios:** Digunakan untuk fetching data dari API.
- **Vercel:** Untuk deploy aplikasi secara online.

## Kontributor
- [Mayesa](https://github.com/Mayesagyaa)
