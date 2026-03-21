#!/bin/bash
# test-api-simple.sh
# Script untuk testing backend API dengan curl

BASE_URL="http://localhost:3001/api"

echo "🚀 Testing FICPACT Backend API"
echo "================================\n"

# 1. Register User
echo "1️⃣ Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test'$(date +%s)'@example.com",
    "username": "testuser'$(date +%s)'",
    "password": "password123"
  }')

echo "Response: $REGISTER_RESPONSE\n"

# Extract token (simple bash extraction)
TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to get token"
  exit 1
fi

echo "✅ Token obtained: ${TOKEN:0:30}...\n"

# 2. Get Current User
echo "2️⃣ Getting current user..."
curl -s -X GET "$BASE_URL/auth/me" \
  -H "Authorization: Bearer $TOKEN" | jq .
echo "\n"

# 3. Get Chapters
echo "3️⃣ Getting chapters..."
curl -s "$BASE_URL/chapters" | jq '.[0]'
echo "\n"

# 4. Get Leaderboard
echo "4️⃣ Getting leaderboard..."
curl -s "$BASE_URL/leaderboard" | jq '.[0]'
echo "\n"

# 5. Get Shop Items
echo "5️⃣ Getting shop items..."
curl -s "$BASE_URL/coins/shop" | jq '.[0]'
echo "\n"

echo "✅ All tests completed!"
