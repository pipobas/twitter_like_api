const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

exports.getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await userService.fetchUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(404).json({ error: error.message });
  }
};