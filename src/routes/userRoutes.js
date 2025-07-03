const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res, next) => {
  console.log('Fetching all users');
  userController.getUsers(req, res, next);
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
});

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  console.log(`Fetching user with ID: ${userId}`);
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.getUserById(req, res, next);
});

router.get('/:username', (req, res, next) => {
  const username = req.params.username;
  console.log(`User profile for: ${username}`);
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.getUserByUserName(req, res, next);
});

router.post('/', (req, res, next) => {
  console.log(`Creating user with: ${req.body.userName}`);
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.createUser(req, res, next);
});

router.put('/:id', (req, res, next) => {
  const userId = req.params.id;
  console.log(`Updateing user with: ${userId}`);  
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.updateUser(req, res, next);
});

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Deleting user with: ${userId}`);  
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.deleteUser(req, res, next);
});

module.exports = router;