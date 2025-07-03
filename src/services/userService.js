const prisma = require('../prisma/client');
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require('@prisma/client/runtime/library');

async function fetchUsers() {
  const users = await prisma.user.findMany();
  return users;
}

async function fetchUserById(userId) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        createdAt: false,
      },
    }
    );
    console.log('User fetched successfully:', user);
    return user;
  }
  catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        const error = new Error(`User not found with id: ${userId}`);
        error.status = 404;
        throw error;
      }
    }
    throw err;
  }
}

async function fetchUserByUserName(userName) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { userName: userName },
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        createdAt: false,
      },
    }
    );

    console.log('User fetched successfully:', user);
    return user;
  }
  catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        const error = new Error(`User not found with id: ${userId}`);
        error.status = 404;
        throw error;
      }
    }
    throw err;
  }
}

async function createUser(userData) {
  try {
    const user = await prisma.user.create({
      data: {
        userName: userData.userName,
        name: userData.name,
        email: userData.email,
      },
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        createdAt: false,
      },
    });
    return user;
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const match = err.message.match(/Argument `(.+?)` is missing/);
      const field = match ? match[1] : 'a required field';
      const error = new Error(`Missing required field: ${field}`);
      error.status = 400;
      throw error;

    }
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        const error = new Error(`User with that ${err.meta?.target?.join(', ')} already exists`);
        error.status = 400;
        throw error;
      }
      /*if (err.code === 'P2012') {
        const error = new Error(`Missing required field ${err.meta?.path}`);
        error.status = 400;
        throw error;
      }*/
    }
    throw err;
  }
}

async function updateUser(userId, userData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData,
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        createdAt: false,
      },
    });
    return updatedUser;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        const error = new Error(`User not found with id: ${userId}`);
        error.status = 404;
        throw error;
      }
      if (err.code === 'P2002') {
        const error = new Error(`Another user with that ${err.meta?.target?.join(', ')} already exists`);
        error.status = 400;
        throw error;
      }
    }

    if (err instanceof PrismaClientValidationError) {
      const error = new Error(`Validation error: ${err.message}`);
      error.status = 400;
      throw error;
    }

    throw err;
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        const error = new Error(`User not found with id: ${userId}`);
        error.status = 404;
        throw error;
      }
    }
    throw err;
  }
}


module.exports = {
  fetchUsers,
  fetchUserById,
  fetchUserByUserName,
  createUser,
  updateUser,
  deleteUser
};