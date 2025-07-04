const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res, next) => {
  userController.getUsers(req, res, next);
});

router.get('/:id', (req, res, next) => {
  userController.getUserById(req, res, next);
});

router.get('/username/:username', (req, res, next) => {
  userController.getUserByUserName(req, res, next);
});

router.get('/:id/tweets', (req, res, next) => {
  userController.getTweetByUserId(req, res, next);
});

router.post('/', (req, res, next) => {
  userController.createUser(req, res, next);
});

router.put('/:id', (req, res, next) => {
  userController.updateUser(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  userController.deleteUser(req, res, next);
});

module.exports = router;