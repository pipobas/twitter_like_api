const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
    console.log(res.status);
  } catch (error) {
    console.log(error.status);
    next(error);
  }
}

exports.getUserById = async (req, res, next) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.getUserByUsername = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await userService.fetchUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}