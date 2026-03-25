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
      coins: 100000
    }
  });

  // Create chapters based on grade levels
  await prisma.chapter.createMany({
    data: [
      // KELAS 10
      {
        title: 'Pertidaksamaan Linear',
        description: 'Materi pembahasan dan kuis tentang pertidaksamaan (Linear, Kuadrat, Mutlak, dll)',
        content: "Silakan klik tombol Let's Start untuk mempelajari materi tentang Pertidaksamaan Linear dan mengerjakan soal kuisnya.",
        difficulty: 'MEDIUM',
        category: 'KELAS_10',
        examples: '[]'
      },
      {
        title: 'Sistem Persamaan Linear',
        description: 'Materi pembahasan dan kuis khusus tentang SPLDV',
        content: "Silakan klik tombol Let's Start untuk mempelajari materi tentang SPLDV dan mengerjakan soal kuisnya.",
        difficulty: 'MEDIUM',
        category: 'KELAS_10',
        examples: '[]'
      },
      {
        title: 'Persamaan Garis Lurus',
        description: 'Materi pembahasan tentang Persamaan Garis Lurus dan Sifat Kemiringan',
        content: "Silakan klik tombol Let's Start untuk mempelajari materi Geometri Analitik PGL dan mengerjakan soal kuisnya.",
        difficulty: 'HARD',
        category: 'KELAS_10',
        examples: '[]'
      },
      // KELAS 11
      {
        title: 'Logika Matematika',
        description: 'Pernyataan, Negasi, Konjungsi, Disjungsi, Implikasi, Biimplikasi, dan Penarikan Kesimpulan',
        content: "Silakan klik tombol Let's Start untuk mempelajari Logika Matematika dan mengerjakan soal kuisnya.",
        difficulty: 'MEDIUM',
        category: 'KELAS_11',
        examples: '[]'
      },
      {
        title: 'Induksi Matematika',
        description: 'Prinsip Induksi Matematika dan Penerapannya pada Barisan dan Pembagian',
        content: "Silakan klik tombol Let's Start untuk mempelajari Induksi Matematika dan mengerjakan soal kuisnya.",
        difficulty: 'HARD',
        category: 'KELAS_11',
        examples: '[]'
      },
      // KELAS 12
      {
        title: 'Geometri Bidang Datar',
        description: 'Sifat titik, garis, dan bidang, Kesebangunan, Kekongruenan serta Luas Bangun Datar',
        content: "Silakan klik tombol Let's Start untuk mempelajari Geometri Bidang Datar dan mengerjakan soal kuisnya.",
        difficulty: 'MEDIUM',
        category: 'KELAS_12',
        examples: '[]'
      },
      {
        title: 'Geometri Bidang Ruang',
        description: 'Jarak dalam Ruang, Sudut dalam Ruang, Luas Permukaan dan Volume Bangun Ruang',
        content: "Silakan klik tombol Let's Start untuk mempelajari Geometri Bidang Ruang dan mengerjakan soal kuisnya.",
        difficulty: 'HARD',
        category: 'KELAS_12',
        examples: '[]'
      }
    ]
  });

  // Create sample shop items
  await prisma.shopItem.createMany({
    data: [
      {
        name: 'Dark Theme',
        description: 'Unlock stunning dark mode interface.',
        price: 1000,
        icon: '🌙',
        category: 'THEME'
      },
      {
        name: 'Bronze Star',
        description: 'Beginner achiever badge.',
        price: 100,
        icon: '/badges/bronze_star.png',
        category: 'BADGE'
      },
      {
        name: 'Silver Star',
        description: 'Intermediate achiever badge.',
        price: 200,
        icon: '/badges/silver_star.png',
        category: 'BADGE'
      },
      {
        name: 'Gold Star',
        description: 'Advanced achiever badge.',
        price: 500,
        icon: '/badges/gold_star.png',
        category: 'BADGE'
      },
      {
        name: 'Diamond Star',
        description: 'Elite achiever badge.',
        price: 1000,
        icon: '/badges/diamond_star.png',
        category: 'BADGE'
      },
      {
        name: 'Ruby Star',
        description: 'Supreme achiever badge.',
        price: 2000,
        icon: '/badges/ruby_star.png',
        category: 'BADGE'
      },
      {
        name: 'Grand Master',
        description: 'Special Title displayed next to your name.',
        price: 5000,
        icon: '👑',
        category: 'TITLE'
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
