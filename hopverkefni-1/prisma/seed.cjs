const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Try to load .env file if DATABASE_URL is not provided
if (!process.env.DATABASE_URL) {
  try {
    const envPath = path.resolve(__dirname, '../.env');
    if (fs.existsSync(envPath)) {
      require('dotenv').config({ path: envPath });
      console.log('Loaded environment variables from .env file');
    } else {
      console.log('No .env file found, please ensure DATABASE_URL is set');
    }
  } catch (error) {
    console.error('Error loading .env file:', error);
  }
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Pass123!', 10);
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      isAdmin: true,
    },
  });

  // Create other users
  for (let i = 1; i <= 49; i++) {
    await prisma.user.create({
      data: {
        username: `user${i}`,
        password: await bcrypt.hash('password', 10),
        isAdmin: false,
      },
    });
  }

  // Create categories
  for (let i = 1; i <= 50; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
      },
    });
  }

  // Create tags
  for (let i = 1; i <= 50; i++) {
    await prisma.tag.create({
      data: {
        name: `Tag ${i}`,
      },
    });
  }

  // Create posts
  for (let i = 1; i <= 50; i++) {
    await prisma.post.create({
      data: {
        title: `Post ${i}`,
        content: `Content of post ${i}`,
        authorId: (i % 50) + 1,
        categories: {
          connect: [{ id: (i % 50) + 1 }, { id: ((i + 1) % 50) + 1 }],
        },
        tags: {
          connect: [{ id: (i % 50) + 1 }, { id: ((i + 1) % 50) + 1 }],
        },
      },
    });
  }

  // Create comments
  for (let i = 1; i <= 50; i++) {
    await prisma.comment.create({
      data: {
        content: `Comment on post ${i}`,
        postId: (i % 50) + 1,
        authorId: ((i + 1) % 50) + 1,
      },
    });
  }

  // Create likes
  for (let i = 1; i <= 50; i++) {
    await prisma.like.create({
      data: {
        postId: (i % 50) + 1,
        userId: ((i + 1) % 50) + 1,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });