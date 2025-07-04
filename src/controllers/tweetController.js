const tweetService = require('../services/tweetService');

async function getAllTweets(req, res, next) {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function getLatestTweet(req, res, next) { }
async function getTweetByUserId(req, res, next) { }
async function getTweetById(req, res, next) { }
async function createTweet(req, res, next) {
  try {
    const newTweet = await tweetService.createTweet(req.body);
    res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
}
async function liketweet(req, res, next) { }
async function dislikeTweet(req, res, next) { }
async function deleteTweet(req, res, next) { }


module.exports = {
  getAllTweets,
  getLatestTweet,
  getTweetByUserId,
  getTweetById,
  createTweet,
  liketweet,
  dislikeTweet,
  deleteTweet
}