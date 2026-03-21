-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "fullName" TEXT,
    "avatar" TEXT,
    "bio" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "examples" TEXT NOT NULL,
    "totalAttempts" INTEGER NOT NULL DEFAULT 0,
    "totalSucceeds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TestCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterId" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "expectedOutput" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TestCase_chapterId_fk" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "passedTests" INTEGER NOT NULL DEFAULT 0,
    "totalTests" INTEGER NOT NULL DEFAULT 0,
    "executionTime" REAL,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    "coinsEarned" INTEGER NOT NULL DEFAULT 0,
    "isFirstSolve" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Submission_userId_fk" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "Submission_chapterId_fk" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_submissionId_fk" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE CASCADE,
    CONSTRAINT "Review_reviewerId_fk" FOREIGN KEY ("reviewerId") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "DailyCase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "chapterId" TEXT NOT NULL,
    "xpReward" INTEGER NOT NULL DEFAULT 100,
    "coinReward" INTEGER NOT NULL DEFAULT 50,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyCase_chapterId_fk" FOREIGN KEY ("chapterId") REFERENCES "Chapter" ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyCase_date_key" ON "DailyCase"("date");

-- CreateTable
CREATE TABLE "DailyCaseSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dailyCaseId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "xpEarned" INTEGER NOT NULL,
    "coinsEarned" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DailyCaseSubmission_userId_fk" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "DailyCaseSubmission_dailyCaseId_fk" FOREIGN KEY ("dailyCaseId") REFERENCES "DailyCase" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "ShopItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Purchase_itemId_fk" FOREIGN KEY ("itemId") REFERENCES "ShopItem" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "CommunityPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CommunityPost_authorId_fk" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Comment_authorId_fk" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "Comment_postId_fk" FOREIGN KEY ("postId") REFERENCES "CommunityPost" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "criteria" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Follow_followerId_fk" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "Follow_followingId_fk" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateTable _AchievementToUser
CREATE TABLE "_AchievementToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AchievementToUser_A_fk" FOREIGN KEY ("A") REFERENCES "Achievement" ("id") ON DELETE CASCADE,
    CONSTRAINT "_AchievementToUser_B_fk" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToUser_AB_unique" ON "_AchievementToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToUser_B_index" ON "_AchievementToUser"("B");
