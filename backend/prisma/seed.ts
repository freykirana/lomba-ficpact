import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.shopItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.dailyCaseSubmission.deleteMany();
  await prisma.dailyCase.deleteMany();
  await prisma.testCase.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      username: 'john_dev',
      password: await hashPassword('password123'),
      fullName: 'John Developer',
      bio: 'Passionate about coding',
      level: 5,
      xp: 4500,
      coins: 1000
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      username: 'jane_coder',
      password: await hashPassword('password123'),
      fullName: 'Jane Coder',
      bio: 'Always learning',
      level: 3,
      xp: 2500,
      coins: 500
    }
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      username: 'bob_expert',
      password: await hashPassword('password123'),
      fullName: 'Bob Expert',
      bio: 'Expert problem solver',
      level: 7,
      xp: 6500,
      coins: 2000
    }
  });

  // Create sample chapters
  const chapter1 = await prisma.chapter.create({
    data: {
      title: 'Two Sum',
      description: 'Find two numbers that add up to a target',
      content: `Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9, so we return [0, 1].`,
      difficulty: 'EASY',
      category: 'ALGORITHM',
      examples: JSON.stringify([
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]'
        }
      ]),
      totalAttempts: 10,
      totalSucceeds: 7
    }
  });

  const chapter2 = await prisma.chapter.create({
    data: {
      title: 'Longest Substring Without Repeating Characters',
      description: 'Find the longest substring without repeating characters',
      content: `Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.`,
      difficulty: 'MEDIUM',
      category: 'ALGORITHM',
      examples: JSON.stringify([
        {
          input: 's = "abcabcbb"',
          output: '3'
        }
      ]),
      totalAttempts: 8,
      totalSucceeds: 5
    }
  });

  const chapter3 = await prisma.chapter.create({
    data: {
      title: 'Median of Two Sorted Arrays',
      description: 'Find the median of two sorted arrays',
      content: `Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`,
      difficulty: 'HARD',
      category: 'ALGORITHM',
      examples: JSON.stringify([
        {
          input: 'nums1 = [1,3], nums2 = [2]',
          output: '2.0'
        }
      ]),
      totalAttempts: 5,
      totalSucceeds: 2
    }
  });

  // Create test cases for chapter1
  await prisma.testCase.createMany({
    data: [
      {
        chapterId: chapter1.id,
        input: '[2,7,11,15], 9',
        expectedOutput: '[0,1]'
      },
      {
        chapterId: chapter1.id,
        input: '[3,2,4], 6',
        expectedOutput: '[1,2]'
      }
    ]
  });

  // Create sample shop items
  await prisma.shopItem.createMany({
    data: [
      {
        name: 'Dark Theme Badge',
        description: 'Unlock dark theme for your profile',
        price: 100,
        icon: '🌙',
        category: 'THEME'
      },
      {
        name: 'Gold Star Badge',
        description: 'Show off your achievement with a gold star',
        price: 50,
        icon: '⭐',
        category: 'BADGE'
      },
      {
        name: 'XP Multiplier (24h)',
        description: 'Double your XP for 24 hours',
        price: 200,
        icon: '2️⃣',
        category: 'POWER_UP'
      }
    ]
  });

  // Create sample community posts
  const post1 = await prisma.communityPost.create({
    data: {
      authorId: user1.id,
      title: 'Tips for solving dynamic programming problems',
      content: 'Here are some useful tips...',
      category: 'TUTORIAL',
      tags: 'dp,algorithm,tips'
    }
  });

  const post2 = await prisma.communityPost.create({
    data: {
      authorId: user2.id,
      title: 'Help with recursive algorithms',
      content: 'I am struggling with recursion. Can anyone help?',
      category: 'HELP',
      tags: 'recursion,help'
    }
  });

  // Create sample comment
  await prisma.comment.create({
    data: {
      authorId: user1.id,
      postId: post2.id,
      content: 'Try thinking about the base case first!'
    }
  });

  console.log('✅ Seed data created successfully!');
  console.log(`
Test Accounts:
1. john_dev / password123 (Level 5, 4500 XP)
2. jane_coder / password123 (Level 3, 2500 XP)
3. bob_expert / password123 (Level 7, 6500 XP)
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
