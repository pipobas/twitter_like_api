const prisma = require('../prisma/client');
const users = [];

async function fetchUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function fetchUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  }
  );

  if (!user) {
    const error = new Error(`User not found with id: ${userId}`);
    error.status = 404;
    throw error;
  }

  console.log('User fetched successfully:', user);
  return user;
}

module.exports = {
  fetchUsers,
  fetchUserById,
};