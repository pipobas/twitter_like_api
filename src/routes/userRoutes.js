const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res, next) => {
  console.log('Fetching all users');
  userController.getUsers(req, res, next);
  console.log('logs', res.statusCode);
});

router.get('/:id', (req, res, next) => {
  const userId = req.params.id;
  console.log(`Fetching user with ID: ${userId}`);
  res.on('finish', () => {
    console.log('Final response status code:', res.statusCode);
  });
  userController.getUserById(req, res, next);
}); 

router.get('/:username', (req, res, next)=> {
  const username = req.params.username;
  res.send(`User profile for: ${username}`);
});

router.post('/', (req, res, next) => {
  const newUser = req.body;
  res.status(201).send(`User created with name: ${newUser.name}`);
}); 

router.put('/:id', (req, res, next) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  res.send(`User ID ${userId} updated with name: ${updatedUser.name}`);
});     

router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID ${userId} deleted`);
});

module.exports = router;