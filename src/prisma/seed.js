const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.tweet.deleteMany({});
    await prisma.user.deleteMany({});
 

  const user1 = await prisma.user.create({
    data: {
      userName: 'john_doe',
      name: 'John Doe',
      email: 'jd@gmail.com',
    }
  });
  const user2 = await prisma.user.create({
    data: {
      userName: 'john_smith',
      name: 'John Smith',
      email: 'smithjohn@gmail.com',
    }
  });
  const tweet = await prisma.tweet.createMany({
    data: [
    {
      content: 'Hello, world!',
      authorId: user1.id,
    },
    {
      content: 'This is my #second tweet!',
      authorId: user1.id,
      hashtags: ['second'],
    },
    {
      content: 'I have a very unique name',
      authorId: user2.id,
    }
    
    ]
  });

  console.log('Seeded user:', user1);
  console.log('Seeded user:', user2);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
