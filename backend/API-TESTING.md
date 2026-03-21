# Testing Backend API

Ini adalah contoh-contoh request untuk testing backend API FICPACT.

## Prerequisites

- Backend sedang berjalan di `http://localhost:3001`
- Gunakan Postman atau curl untuk testing
- Atau gunakan VS Code REST Client extension

## Test Scenarios

### 1. Authentication Flow

#### Register User

```http
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "username": "newuser123",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id_here",
    "email": "newuser@example.com",
    "username": "newuser123",
    "fullName": "newuser123",
    "level": 1,
    "xp": 0,
    "coins": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User

```http
POST http://localhost:3001/api/auth/login
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET http://localhost:3001/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Logout

```http
POST http://localhost:3001/api/auth/logout
```

---

### 2. User Profile

#### Get User Profile

```http
GET http://localhost:3001/api/users/{userId}
```

#### Update User Profile

```http
PUT http://localhost:3001/api/users/{userId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "John Developer",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Passionate about coding!"
}
```

#### Get User Progress

```http
GET http://localhost:3001/api/users/{userId}/progress
```

---

### 3. Chapters (Problems)

#### Get All Chapters

```http
GET http://localhost:3001/api/chapters
```

#### Get Chapters with Filters

```http
GET http://localhost:3001/api/chapters?difficulty=EASY&category=ALGORITHM
```

#### Get Chapter Details

```http
GET http://localhost:3001/api/chapters/{chapterId}
```

#### Submit Solution

```http
POST http://localhost:3001/api/chapters/{chapterId}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
  "language": "javascript"
}
```

---

### 4. Daily Cases

#### Get Today's Challenge

```http
GET http://localhost:3001/api/daily-cases
```

#### Submit Daily Case

```http
POST http://localhost:3001/api/daily-cases/{dailyCaseId}/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "// Your solution code here",
  "language": "javascript"
}
```

---

### 5. Coin Shop

#### Get Shop Items

```http
GET http://localhost:3001/api/coins/shop
```

#### Purchase Item

```http
POST http://localhost:3001/api/coins/shop/{itemId}/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 1
}
```

---

### 6. Community

#### Get Community Posts

```http
GET http://localhost:3001/api/community/posts
```

#### Get Posts with Filters

```http
GET http://localhost:3001/api/community/posts?category=TUTORIAL&limit=10&skip=0
```

#### Create Post

```http
POST http://localhost:3001/api/community/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Tips for Dynamic Programming",
  "content": "Here are some useful tips for solving DP problems...",
  "category": "TUTORIAL",
  "tags": ["dp", "tips", "algorithm"]
}
```

#### Add Comment

```http
POST http://localhost:3001/api/community/posts/{postId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Great post! Thanks for the tips!"
}
```

---

### 7. Leaderboard

#### Get Global Leaderboard

```http
GET http://localhost:3001/api/leaderboard
```

#### Get with Pagination

```http
GET http://localhost:3001/api/leaderboard?limit=50&skip=0
```

#### Get Weekly Leaderboard

```http
GET http://localhost:3001/api/leaderboard/weekly
```

---

## Complete Testing Example (JavaScript)

```javascript
// Save this as test-api.js and run: node test-api.js

const API_URL = 'http://localhost:3001/api';

async function runTests() {
  try {
    // 1. Register
    console.log('1. Registering user...');
    const registerRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      })
    });
    const registerData = await registerRes.json();
    const token = registerData.token;
    console.log('✓ Registered:', registerData.user.username);

    // 2. Get current user
    console.log('\n2. Getting current user...');
    const meRes = await fetch(`${API_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const meData = await meRes.json();
    console.log('✓ Current user:', meData.username);

    // 3. Get chapters
    console.log('\n3. Getting chapters...');
    const chaptersRes = await fetch(`${API_URL}/chapters`);
    const chapters = await chaptersRes.json();
    console.log(`✓ Found ${chapters.length} chapters`);

    // 4. Get leaderboard
    console.log('\n4. Getting leaderboard...');
    const leaderboardRes = await fetch(`${API_URL}/leaderboard`);
    const leaderboard = await leaderboardRes.json();
    console.log(`✓ Top 3 users:`, leaderboard.slice(0, 3).map(u => u.username));

    // 5. Create community post
    console.log('\n5. Creating community post...');
    const postRes = await fetch(`${API_URL}/community/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: 'My Test Post',
        content: 'This is a test post',
        category: 'DISCUSSION',
        tags: ['test']
      })
    });
    const post = await postRes.json();
    console.log('✓ Created post:', post.title);

    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

runTests();
```

## Using VS Code REST Client

1. Install "REST Client" extension
2. Create file: `test.http`
3. Paste requests from above
4. Click "Send Request" above each request

Example `test.http` file:
```http
### Register User
POST http://localhost:3001/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "username": "testuser",
  "password": "password123"
}

###
GET http://localhost:3001/api/chapters
```

## Tips

- Save token dari login untuk future requests
- Test authenticated endpoints dengan Authorization header
- Check response status codes
- View full response in browser DevTools Network tab
- Use `?limit=5` untuk test pagination

## Expected Test Accounts (after seeding)

```
1. john_dev / password123
2. jane_coder / password123
3. bob_expert / password123
```
