const userService = require('../services/userService');

async function getUsers(req, res, next){
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
    console.log(res.status);
  } catch (error) {
    console.log(error.status);
    next(error);
  }
}

async function getUserById(req, res, next){
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

async function getUserByUserName(req, res, next){
  const username = req.params.username;
  try {
    const user = await userService.fetchUserByUserName(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next){
  const newUser = req.body;
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next){
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  try {
    const user = await userService.updateUser(userId, updatedUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next){
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.deleteUser(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUserName,
  createUser,
  updateUser,
  deleteUser
}