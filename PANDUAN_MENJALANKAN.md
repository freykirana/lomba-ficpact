# Panduan Menjalankan Project (Frontend & Backend)

Project ini terdiri dari dua bagian utama: **Backend** (berbasis Next.js API Routes dengan Prisma) dan **Frontend** (Next.js App Router).

## 📋 Prasyarat Sistem
Sebelum menjalankan project, pastikan Anda telah menginstal:
- Node.js (versi 18 atau lebih baru)
- npm (Node Package Manager)

---

## 🚀 1. Cara Menjalankan Backend

Buka terminal baru, lalu ikuti langkah-langkah ini:

1. **Masuk ke folder backend**
   ```bash
   cd c:\Kuliah\lomba-ficpact\backend
   ```

2. **Install semua dependensi (jika baru pertama kali clone)**
   ```bash
   npm install
   ```

3. **Inisialisasi Database (jika baru pertama kali)**
   Database menggunakan SQLite (`dev.db`). Untuk membuat tabel dan mengisi data awal:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
   *(Pastikan ada file `.env.local` atau `.env` dengan isi `DATABASE_URL="file:./prisma/dev.db"`)*

4. **Jalankan Development Server Backend**
   ```bash
   npm run dev
   ```
   Backend akan berjalan di: **http://localhost:3001**

---

## 🖥 2. Cara Menjalankan Frontend

Buka terminal **baru** (biarkan terminal backend tetap berjalan), lalu ikuti langkah-langkah ini:

1. **Masuk ke folder frontend**
   ```bash
   cd c:\Kuliah\lomba-ficpact\frontend
   ```

2. **Install semua dependensi (jika baru pertama kali clone)**
   ```bash
   npm install
   ```

3. **Pastikan URL API Sesuai**
   Buka file `frontend/.env.local`. Pastikan nilainya mengarah ke alamat backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Jalankan Development Server Frontend**
   ```bash
   npm run dev
   ```
   Frontend akan berjalan di: **http://localhost:3000**

---

## ✅ Verifikasi 

1. **Test Frontend:** Buka browser dan arahkan ke `http://localhost:3000`. Halaman utama / dashboard web harus terbuka.
2. **Test Backend:** Buka browser dan arahkan ke `http://localhost:3001/api/chapters` (contoh endpoint). Anda seharusnya melihat hasil berformat JSON.

## 🛑 Jika Port Bertabrakan (Error Address In Use)
Jika Anda melihat error `EADDRINUSE: address already in use :::3001` saat menjalankan backend, atau hal serupa pada frontend, berarti servernya sudah berjalan di background. Anda bisa menutup terminal sebelumnya atau jika terminalnya sudah tertutup, kill process yang memakai port tersebut (atau restart komputer).

---
Selamat eksplorasi! 🎉
