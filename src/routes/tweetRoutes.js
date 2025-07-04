const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const { user } = require('../prisma/client');

router.get('/', (req, res, next) => { 
    console.log('Fetching all tweets');
    tweetController.getAlltweets(req, res, next);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
});

router.get('/latest', (req, res, next) => {
    console.log('Fetching latests tweets');
    tweetController.getLatestTweet(req, res, next);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
});

router.get('/user/:userId', (req, res, next) => {
    const tweetId = req.params.userId;
    console.log(`Fetching all tweets from the user with ID: ${userId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.getTweetByUserId(req, res, next);
});

router.get('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    console.log(`Fetching tweet with ID: ${tweetId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.getTweetById(req, res, next);
});

router.post('/', (req, res, next) => {
    const authorId = req.body.authorID;
    console.log(`Posting a tweet with: ${authorId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.createTweet(req, res, next);
});

router.post('/:id/like', (req, res, next) => {
    const tweetId = req.params.id;
    const userId = req.body.userId;
    console.log(`User : ${userId} liked the tweet: ${tweetId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.liketweet(req, res, next);
});

router.post('/:id/dislike', (req, res, next) => {
    const tweetId = req.params.id;
    const userId = req.body.userId;
    console.log(`User : ${userId} disliked the tweet: ${tweetId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.dislikeTweet(req, res, next);
});

router.delete('/:id', (req, res) => {
    const tweetId = req.params.id;
    console.log(`Deleting tweet with: ${tweetId}`);
    res.on('finish', () => {
        console.log('Final response status code:', res.statusCode);
    });
    tweetController.deleteTweet(req, res, next);
});

module.exports = router;