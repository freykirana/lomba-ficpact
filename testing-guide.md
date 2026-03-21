# 🧪 Testing Backend - Panduan Lengkap

Backend Anda sudah running di: **http://localhost:3001**

Panduan ini mengajarkan cara testing backend dan connecting ke frontend dengan benar.

---

## 📋 Daftar Isi
1. [Testing dengan Browser/Postman](#testing-dengan-browser)
2. [Testing dengan JavaScript](#testing-dengan-javascript)
3. [Connecting ke Frontend](#connecting-ke-frontend)
4. [Seed Data Awal](#seed-data-awal)
5. [Troubleshooting](#troubleshooting)

---

## 🌐 Testing dengan Browser/Postman {#testing-dengan-browser}

### Metode 1: Browser (GET requests only)

Buka browser dan kunjungi:
```
http://localhost:3001/api/chapters
http://localhost:3001/api/coins/shop
http://localhost:3001/api/leaderboard
```

### Metode 2: Postman (RECOMMENDED)

Postman lebih mudah untuk testing semua tipe request (GET, POST, PUT, DELETE).

#### Install Postman
1. Download dari https://www.postman.com/downloads/
2. Install dan buka Postman
3. Import collection atau buat requests manual

#### Contoh Testing di Postman

**Request 1: Register User**
```
Method: POST
URL: http://localhost:3001/api/auth/register
Header:
  Content-Type: application/json

Body (JSON):
{
  "email": "test@example.com",
  "username": "testuser123",
  "password": "password123"
}

Expected Response (201):
{
  "message": "User registered successfully",
  "user": {
    "id": "cuid123...",
    "email": "test@example.com",
    "username": "testuser123",
    "level": 1,
    "xp": 0,
    "coins": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Simpan Token!**
Ambil token dari response di atas, kita akan gunakan untuk authenticated requests.

**Request 2: Get Current User (requires token)**
```
Method: GET
URL: http://localhost:3001/api/auth/me
Header:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  (paste token yang disimpan)

Expected Response (200):
{
  "id": "cuid123...",
  "email": "test@example.com",
  "username": "testuser123",
  "level": 1,
  "xp": 0,
  "coins": 0,
  "createdAt": "2026-03-21T..."
}
```

**Request 3: Get All Chapters**
```
Method: GET
URL: http://localhost:3001/api/chapters

Expected Response (200):
[
  {
    "id": "cuid...",
    "title": "Two Sum",
    "description": "Find two numbers...",
    "difficulty": "EASY",
    "category": "ALGORITHM",
    ...
  }
]
```

---

## 🎯 Testing dengan JavaScript {#testing-dengan-javascript}

### Metode Cepat: Buat file `test-backend.js`

```javascript
// test-backend.js
const API_URL = 'http://localhost:3001/api';
let token = '';

async function test() {
  try {
    console.log('=== TESTING BACKEND ===\n');

    // 1. Test Register
    console.log('1️⃣ Testing Register...');
    const registerRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `user${Date.now()}@test.com`,
        username: `user${Date.now()}`,
        password: 'password123'
      })
    });
    const registerData = await registerRes.json();
    token = registerData.token;
    console.log('✅ Register success:', registerData.user.username);
    console.log('📝 Token:', token.substring(0, 20) + '...\n');

    // 2. Test Get Current User
    console.log('2️⃣ Testing Get Current User...');
    const meRes = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    console.log('✅ Get user success:', meData.username, '(Level', meData.level + ')\n');

    // 3. Test Get Chapters
    console.log('3️⃣ Testing Get Chapters...');
    const chaptersRes = await fetch(`${API_URL}/chapters`);
    const chapters = await chaptersRes.json();
    console.log(`✅ Found ${chapters.length} chapters`);
    if (chapters.length > 0) {
      console.log('First chapter:', chapters[0].title, '-', chapters[0].difficulty + '\n');
    }

    // 4. Test Get Leaderboard
    console.log('4️⃣ Testing Get Leaderboard...');
    const leaderboardRes = await fetch(`${API_URL}/leaderboard`);
    const leaderboard = await leaderboardRes.json();
    console.log(`✅ Found ${leaderboard.length} users in leaderboard\n`);

    // 5. Test Get Shop Items
    console.log('5️⃣ Testing Get Shop Items...');
    const shopRes = await fetch(`${API_URL}/coins/shop`);
    const shop = await shopRes.json();
    console.log(`✅ Found ${shop.length} shop items`);
    if (shop.length > 0) {
      console.log('First item:', shop[0].name, '-', shop[0].price, 'coins\n');
    }

    // 6. Test Get Community Posts
    console.log('6️⃣ Testing Get Community Posts...');
    const postsRes = await fetch(`${API_URL}/community/posts`);
    const posts = await postsRes.json();
    console.log(`✅ Found ${posts.length} community posts\n`);

    console.log('=== ✅ ALL TESTS PASSED ===');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();
```

### Jalankan Test

Di terminal:
```bash
node test-backend.js
```

Expected Output:
```
=== TESTING BACKEND ===

1️⃣ Testing Register...
✅ Register success: user1674321...
📝 Token: eyJhbGciOiJIUzI1NiIsInR5cC...

2️⃣ Testing Get Current User...
✅ Get user success: user1674321... (Level 1)

3️⃣ Testing Get Chapters...
✅ Found 3 chapters
First chapter: Two Sum - EASY

4️⃣ Testing Get Leaderboard...
✅ Found 3 users in leaderboard

5️⃣ Testing Get Shop Items...
✅ Found 3 shop items
First item: Dark Theme Badge - 100 coins

6️⃣ Testing Get Community Posts...
✅ Found 0 community posts

=== ✅ ALL TESTS PASSED ===
```

---

## 🔗 Connecting ke Frontend {#connecting-ke-frontend}

### Step 1: Setup Environment di Frontend

File: `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_JWT_KEY=token
```

### Step 2: Buat API Helper di Frontend

File: `frontend/lib/api.ts`
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export async function getToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(process.env.NEXT_PUBLIC_JWT_KEY || 'token');
}

export async function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(process.env.NEXT_PUBLIC_JWT_KEY || 'token', token);
}

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    // Add token jika ada
    const token = await getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || 'An error occurred' };
    }

    return { data };
  } catch (error) {
    return { error: 'Network error' };
  }
}

// Auth APIs
export async function register(
  email: string,
  username: string,
  password: string
) {
  const response = await apiCall<any>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
  });

  if (response.data?.token) {
    await setToken(response.data.token);
  }

  return response;
}

export async function login(email: string, password: string) {
  const response = await apiCall<any>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.data?.token) {
    await setToken(response.data.token);
  }

  return response;
}

export async function getMe() {
  return apiCall('/auth/me');
}

export async function logout() {
  localStorage.removeItem(process.env.NEXT_PUBLIC_JWT_KEY || 'token');
}

// Chapters APIs
export async function getChapters() {
  return apiCall('/chapters');
}

export async function getChapter(id: string) {
  return apiCall(`/chapters/${id}`);
}

export async function submitChapter(id: string, code: string, language: string) {
  return apiCall(`/chapters/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify({ code, language }),
  });
}

// Leaderboard APIs
export async function getLeaderboard() {
  return apiCall('/leaderboard');
}

// Community APIs
export async function getCommunityPosts() {
  return apiCall('/community/posts');
}

export async function createPost(
  title: string,
  content: string,
  category: string,
  tags?: string[]
) {
  return apiCall('/community/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content, category, tags }),
  });
}
```

### Step 3: Gunakan di React Component

File: `frontend/app/auth/page.tsx`
```typescript
'use client';

import { useState } from 'react';
import { login, register } from '@/lib/api';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;

      if (isRegister) {
        response = await register(email, username, password);
      } else {
        response = await login(email, password);
      }

      if (response.error) {
        setError(response.error);
      } else {
        // Redirect ke dashboard
        window.location.href = '/dashboard';
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Register'}
      </button>
    </div>
  );
}
```

### Step 4: Get Chapters di Dashboard

File: `frontend/app/(dashboard)/dashboard/page.tsx`
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getChapters, getMe } from '@/lib/api';

export default function DashboardPage() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user info
        const userRes = await getMe();
        if (userRes.data) {
          setUser(userRes.data);
        }

        // Get chapters
        const chaptersRes = await getChapters();
        if (chaptersRes.data) {
          setChapters(chaptersRes.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user?.username || 'User'}!</h1>
      <p>Level: {user?.level} | XP: {user?.xp}</p>

      <h2>Chapters</h2>
      <div className="grid">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="card">
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <span>{chapter.difficulty}</span>
            <a href={`/chapters/${chapter.id}`}>Solve</a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🌱 Seed Data Awal {#seed-data-awal}

Untuk membuat data awal (users, chapters, posts), jalankan seeding script:

```bash
cd backend
npm exec -- ts-node prisma/seed.ts
```

Ini akan membuat:
- 3 test users (john_dev, jane_coder, bob_expert)
- 3 chapters (Two Sum, Longest Substring, Median of Two Sorted Arrays)
- 3 shop items
- 2 community posts

---

## 🔍 Troubleshooting {#troubleshooting}

### Error: "Cannot find module '@prisma/client'"
```bash
cd backend
npm install
```

### Error: "Port 3001 already in use"
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port di package.json
"dev": "next dev -p 3002"
```

### Error: "CORS error di browser"
Pastikan frontend `.env.local` memiliki:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Database tidak ter-sync
```bash
cd backend
npm exec -- prisma reset
npm exec -- ts-node prisma/seed.ts
```

### Token tidak valid
- Pastikan format Authorization header benar: `Bearer {token}`
- Pastikan token tidak expired (valid 7 hari)
- Cek localStorage di browser:
  ```javascript
  // Di browser console
  localStorage.getItem('token')
  ```

---

## ✅ Quick Checklist

- [ ] Backend running di http://localhost:3001
- [ ] Bisa access `/api/chapters` di browser
- [ ] Test register & login di Postman
- [ ] Setup `.env.local` di frontend
- [ ] Setup API helper di frontend
- [ ] Test API calls dari React component
- [ ] Seed data awal
- [ ] Token tersimpan & terpakai

---

## 📞 API Response Format

Semua responses dari backend punya format:

**Success (2xx):**
```json
{
  "data": { ... },
  "or": "message or token atau just the object"
}
```

**Error (4xx, 5xx):**
```json
{
  "error": "Error message here"
}
```

---

Happy Testing! 🚀
