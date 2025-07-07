const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');

router.get('/', (req, res, next) => { 
    tweetController.getAllTweets(req, res, next);
});

router.get('/latest', (req, res, next) => {
    tweetController.getLatestTweet(req, res, next);
});

router.get('/:id', (req, res, next) => {
    tweetController.getTweetById(req, res, next);
});

router.get('/user/:userId', (req, res, next) => {
    tweetController.getTweetsByUserId(req, res, next);
});

router.post('/', (req, res, next) => {
    tweetController.createTweet(req, res, next);
});

router.post('/:id/like', (req, res, next) => {
    tweetController.liketweet(req, res, next);
});

router.post('/:id/dislike', (req, res, next) => {
    tweetController.dislikeTweet(req, res, next);
});

module.exports = router;