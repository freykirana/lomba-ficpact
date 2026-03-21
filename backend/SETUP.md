# FICPACT Backend Setup Guide

Backend untuk FICPACT platform telah berhasil dibuat! Berikut adalah panduan lengkap untuk setup dan menjalankannya.

## 📋 Persyaratan

- Node.js 18+ dan npm
- SQLite (sudah included)
- Git (opsional)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Database

```bash
# Buat database dan jalankan migrations
npx prisma migrate dev --name init

# (Opsional) Seed sample data
npx prisma db seed
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Backend akan berjalan di `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth/                    # Authentication endpoints
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── me/route.ts
│   │   │   └── logout/route.ts
│   │   ├── users/[id]/              # User profile endpoints
│   │   │   ├── route.ts
│   │   │   └── progress/route.ts
│   │   ├── chapters/                # Problem/Chapter endpoints
│   │   │   ├── route.ts
│   │   │   ├── [id]/route.ts
│   │   │   └── [id]/submit/route.ts
│   │   ├── daily-cases/             # Daily challenge endpoints
│   │   │   ├── route.ts
│   │   │   └── [id]/submit/route.ts
│   │   ├── coins/                   # Coin shop endpoints
│   │   │   └── shop/
│   │   │       ├── route.ts
│   │   │       └── [id]/purchase/route.ts
│   │   ├── community/               # Community/forum endpoints
│   │   │   └── posts/
│   │   │       ├── route.ts
│   │   │       └── [id]/comments/route.ts
│   │   └── leaderboard/             # Leaderboard endpoints
│   │       ├── route.ts
│   │       └── weekly/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── middleware.ts                # CORS middleware
├── lib/
│   ├── db.ts                        # Prisma client
│   ├── auth.ts                      # JWT & password utilities
│   ├── middleware.ts                # Auth middleware
│   └── utils.ts                     # Helper functions
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── seed.ts                      # Sample data
├── .env.local                       # Environment variables
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🔐 Authentication

Semua endpoint yang memerlukan autentikasi harus mengirim JWT token di header:

```bash
Authorization: Bearer <token>
```

### Example Request:

```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## 🗄️ Database Schema

Lihat `prisma/schema.prisma` untuk model lengkap:

- **User** - User profile dan stats
- **Chapter** - Problem/tantangan coding
- **Submission** - User's solution submissions
- **DailyCase** - Daily challenges
- **ShopItem** - Coin shop items
- **CommunityPost** - Forum posts
- **Comment** - Comments on posts
- **Follow** - User follow system
- **Achievement** - Badges/achievements

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/auth/register` | Daftar user baru |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (requires auth) |
| POST | `/api/auth/logout` | Logout user |

### Users

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile (requires auth) |
| GET | `/api/users/:id/progress` | Get user progress stats |

### Chapters (Problems)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/chapters` | Get all chapters |
| GET | `/api/chapters/:id` | Get chapter details |
| POST | `/api/chapters/:id/submit` | Submit solution (requires auth) |

**Query Parameters untuk GET /api/chapters:**
- `category`: ALGORITHM, DATABASE, WEB, etc.
- `difficulty`: EASY, MEDIUM, HARD

### Daily Cases

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/daily-cases` | Get today's challenge |
| POST | `/api/daily-cases/:id/submit` | Submit daily case (requires auth) |

### Coin Shop

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/coins/shop` | Get all shop items |
| POST | `/api/coins/shop/:id/purchase` | Buy item (requires auth) |

### Community

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/community/posts` | Get posts |
| POST | `/api/community/posts` | Create post (requires auth) |
| POST | `/api/community/posts/:id/comments` | Add comment (requires auth) |

**Query Parameters untuk GET /api/community/posts:**
- `category`: DISCUSSION, TUTORIAL, SHARING, HELP
- `limit`: hasil per halaman (default 20)
- `skip`: pagination offset

### Leaderboard

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/leaderboard` | Get top users |
| GET | `/api/leaderboard/weekly` | Get weekly rankings |

## 🧪 Testing Endpoints

Gunakan curl, Postman, atau REST Client extension:

### Example 1: Register User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123"
  }'
```

### Example 2: Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Example 3: Get Chapters

```bash
curl http://localhost:3001/api/chapters?difficulty=EASY
```

### Example 4: Submit Chapter Solution

```bash
curl -X POST http://localhost:3001/api/chapters/{chapterId}/submit \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function twoSum(nums, target) { ... }",
    "language": "javascript"
  }'
```

## 🌐 Connecting Frontend

Di folder `frontend`, update your API calls:

```typescript
const API_URL = 'http://localhost:3001/api';

// Example: Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { token } = await response.json();

// Store token di localStorage
localStorage.setItem('token', token);

// Gunakan token untuk authenticated requests
const userResponse = await fetch(`${API_URL}/auth/me`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## 🔧 Environment Variables

Update `.env.local`:

```env
# Database Connection
DATABASE_URL="sqlite:./prisma/dev.db"

# JWT Secret (GANTI INI DI PRODUCTION!)
JWT_SECRET="super-secret-key"

# Frontend URL untuk CORS
NEXT_PUBLIC_FRONTEND_URL="http://localhost:3000"
```

## 📖 Useful Commands

```bash
# Run development server
npm run dev

# Build production
npm run build

# Start production server
npm start

# Manage database with Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# View database schema
npx prisma db push
```

## 🐛 Troubleshooting

### Port 3001 Already in Use

Edit `package.json` script:
```json
"dev": "next dev -p 3002"
```

### Database Error

Reset database:
```bash
npx prisma migrate reset
```

### CORS Error

Pastikan `NEXT_PUBLIC_FRONTEND_URL` di `.env.local` sesuai dengan URL frontend Anda.

### Seed Data Not Working

```bash
npm install ts-node
npx prisma db seed
```

## 📦 Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Connect ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Manual Deployment

1. Build: `npm run build`
2. Set production environment variables
3. Run: `npm start`

## 📝 Notes

- Backend menggunakan SQLite untuk development. Untuk production, gunakan PostgreSQL
- Autentikasi menggunakan JWT tokens dengan expiry 7 hari
- CORS enabled untuk development localhost
- Password di-hash dengan bcryptjs
- Semua submission/code hanya disimulasikan, untuk production integrate dengan code execution engine

## 🤝 Support

Jika ada error atau pertanyaan, cek:
1. Terminal logs
2. Browser console network tab
3. Prisma Studio: `npx prisma studio`

Happy coding! 🎉
