# FICPACT Backend

Backend untuk aplikasi FICPACT menggunakan Next.js dan Prisma.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.local.example` ke `.env.local`:
```bash
cp .env.local.example .env.local
```

### 3. Setup Database
```bash
npx prisma migrate dev --name init
npx prisma db seed  # Optional: untuk seeding data
```

### 4. Run Development Server
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3001`

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── users/          # User endpoints
│   │   ├── chapters/       # Chapter/Problem endpoints
│   │   ├── daily-cases/    # Daily challenge endpoints
│   │   ├── coins/          # Coin shop endpoints
│   │   ├── community/      # Community/forum endpoints
│   │   └── leaderboard/    # Leaderboard endpoints
│   └── middleware.ts       # Authentication middleware
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # Auth utilities
│   └── utils.ts           # Helper functions
├── db/
│   └── schema.prisma      # Database schema
└── prisma/               # Prisma migrations & seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/:id/progress` - Get user progress

### Chapters
- `GET /api/chapters` - Get all chapters
- `GET /api/chapters/:id` - Get chapter details
- `POST /api/chapters/:id/submit` - Submit solution

### Daily Cases
- `GET /api/daily-cases` - Get today's challenge
- `POST /api/daily-cases/:id/submit` - Submit daily case

### Coins
- `GET /api/coins/shop` - Get available items
- `POST /api/coins/shop/:id/purchase` - Purchase item

### Community
- `GET /api/community/posts` - Get all posts
- `POST /api/community/posts` - Create post
- `POST /api/community/posts/:id/comments` - Add comment

### Leaderboard
- `GET /api/leaderboard` - Get top users
- `GET /api/leaderboard/weekly` - Get weekly rankings

## Development

### Database Diagram
Lihat `prisma/schema.prisma` untuk struktur database lengkap.

### Adding New Features
1. Update schema di `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Create API route di `app/api/[feature]`
4. Add types di `lib/types.ts`

### Testing
```bash
# Run with curl atau Postman
curl -X POST http://localhost:3001/api/auth/login
```

## Troubleshooting

### Database Error
```bash
# Reset database
npx prisma migrate reset
```

### Port Already in Use
Backend berjalan di port 3001. Jika port sudah digunakan, ubah di `package.json` scripts.

## Production Deployment

1. Update `DATABASE_URL` ke production database (PostgreSQL recommended)
2. Set `JWT_SECRET` ke string yang kuat
3. Build: `npm run build`
4. Start: `npm start`
