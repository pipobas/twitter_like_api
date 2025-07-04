const userService = require('../services/userService');

async function getUsers(req, res, next) {
  try {
    console.log('Fetching all users');
    const users = await userService.fetchUsers();
    res.status(200).json(users);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);
    console.log(`Fetching user whit ID: ${userId}`);
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
};

async function getUserByUserName(req, res, next) {
  try {
    const userName = req.params.userName;
    console.log(`Fetching user whit userName: ${userName}`);
    const user = await userService.fetchUserByUserName(userName);
    res.status(200).json(user);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function getTweetsByUserId(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);
    console.log(`Fetching all tweets of the user with ID: ${userId}`);
    const tweets = await userService.fetchTweetsByUserId(userId);
    res.status(200).json(tweets);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
};

async function createUser(req, res, next) {
  try {
    console.log(`Creating user with: ${req.body.userName}`);
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);
    console.log(`Updating user with ID: ${userId}`)
    const user = await userService.updateUser(userId, req.body);
    res.status(200).json(user);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }

}

async function deleteUser(req, res, next) {
  try {
    const userId = parseInt(req.params.id, 10);
    console.log(`Deleting user with ID: ${userId}`);
    await userService.deleteUser(userId);
    res.status(204).send();
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUserName,
  getTweetsByUserId,
  createUser,
  updateUser,
  deleteUser
}