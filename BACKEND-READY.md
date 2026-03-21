# 🚀 Backend Setup - Quick Start

## ✅ Status: BACKEND SUDAH RUNNING!

Backend sedang berjalan di: **http://localhost:3001**

---

## 🎯 Langkah Selanjutnya

### 1️⃣ Verify Backend Berjalan Baik

Buka browser dan kunjungi:
```
http://localhost:3001
```

Atau buka di terminal:
```bash
curl http://localhost:3001
```

### 2️⃣ Test API Endpoints Cepat

**Lihat Chapters:**
```bash
curl http://localhost:3001/api/chapters
```

**Lihat Shop Items:**
```bash
curl http://localhost:3001/api/coins/shop
```

**Lihat Leaderboard:**
```bash
curl http://localhost:3001/api/leaderboard
```

### 3️⃣ Buat Test User (Postman)

**POST** `http://localhost:3001/api/auth/register`

Body:
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "username": "testuser",
    "level": 1,
    "xp": 0,
    "coins": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

🎯 **SIMPAN TOKEN INI** - Gunakan untuk authenticated requests!

### 4️⃣ Connect ke Frontend

Update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Kemudian buat API helper di `frontend/lib/api.ts` (lihat testing-guide.md)

### 5️⃣ Seed Data Awal (Optional)

Untuk membuat sample data:
```bash
cd backend
npm exec -- ts-node prisma/seed.ts
```

---

## 📚 Files Penting

| File | Tujuan |
|------|--------|
| `backend/.env.local` | Database & JWT config |
| `backend/prisma/schema.prisma` | Database schema |
| `backend/app/api/` | API endpoints |
| `testing-guide.md` | Testing lengkap & connecting |

---

## 🔒 Authentication Flow

1. **Register** → POST `/api/auth/register` → Dapat token
2. **Simpan token** → localStorage di browser
3. **Gunakan token** → Header: `Authorization: Bearer {token}`
4. **Access protected routes** → Login required endpoints

---

## 📊 Endpoint Summary

| Kategori | Endpoints |
|----------|-----------|
| Auth | register, login, me, logout |
| Users | profile, update, progress |
| Chapters | list, details, submit |
| Daily Cases | get, submit |
| Shop | items, purchase |
| Community | posts, create, comments |
| Leaderboard | global, weekly |

---

## 💡 Tips

✅ **Use Postman** untuk testing yang mudah
✅ **Simpan token** dari register untuk testing
✅ **Check browser console** untuk network errors  
✅ **Setup .env.local** di frontend DULU sebelum import api helper
✅ **Test satu endpoint** dulu sebelum integrate semua

---

## ❌ Jika Ada Error

1. **"Cannot connect to localhost:3001"**
   - Check kalau background terminal masih running
   - Lihat output terminal, ada error?

2. **"CORS error di frontend"**
   - Pastikan NEXT_PUBLIC_API_URL benar di .env.local
   - Restart dev server frontend

3. **"Token invalid"**
   - Register user baru
   - Pastikan Bearer format benar: `Bearer {token}`
   - Check token tidak expired

---

## 📖 Full Testing Guide

Untuk testing lengkap dengan contoh-contoh lebih detail:
→ Lihat file: `testing-guide.md`

---

**Backend Siap! 🎉**

Sekarang setup frontend dan connect ke backend ini.
