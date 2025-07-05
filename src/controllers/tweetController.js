const tweetService = require('../services/tweetService');

async function getAllTweets(req, res, next) {
  try {
    console.log('Fetching all tweets');
    const { q: contentQuery, hashtags } = req.query;
    const hashtagsArray = Array.isArray(hashtags)
     ? hashtags
     : hashtags
     ? [hashtags]
     : [];
    let tweets;
    if (contentQuery || hashtagsArray.length > 0  ) {
      console.log('Advanced search with:', { contentQuery, hashtagsArray });

      tweets = await tweetService.advancedTweetSearch(
        contentQuery ?? '',
        hashtagsArray
      );
    }else{
      tweets = await tweetService.fetchAllTweets();
    }
    res.status(200).json(tweets);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function getLatestTweet(req, res, next) {
  try {
    console.log('Fetching latest tweets');
    const { q: contentQuery, hashtags } = req.query;
    const hashtagsArray = Array.isArray(hashtags)
     ? hashtags
     : hashtags
     ? [hashtags]
     : [];
    let tweets;
    if (contentQuery || hashtagsArray.length > 0  ) {
      console.log('Advanced search with:', { contentQuery, hashtagsArray });

      tweets = await tweetService.advancedTweetSearch(
        contentQuery ?? '',
        hashtagsArray
      );
    }else{
      tweets = await tweetService.fetchLatestTweet();
    }
    res.status(200).json(tweets);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function getTweetById(req, res, next) {
  try {
    const tweetId = parseInt(req.params.id, 10);
    console.log(`Fetching tweet with ID: ${tweetId}`);
    const tweet = await tweetService.fetchTweetById(tweetId);
    res.status(200).json(tweet);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}
async function getTweetsByUserId(req, res, next) {
  try {
    const userId = parseInt(req.params.userId, 10);
    console.log(`Fetching tweets from user with ID: ${userId}`);
    const tweets = await tweetService.fetchTweetsByUserId(userId);
    res.status(200).json(tweets);
    console.log('Final response status code:', res.statusCode);
  } catch (error) {
    console.log('Final response status code:', res.statusCode);
    next(error);
  }
}

async function createTweet(req, res, next) {
  try {
    const newTweet = await tweetService.createTweet(req.body);
    res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
}

async function liketweet(req, res, next) { 
  try {
    const userId = parseInt(req.body.userId, 10);
    const tweetId = parseInt(req.params.id, 10);
    const newTweet = await tweetService.likeTweet(tweetId, userId);
    res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
}
async function dislikeTweet(req, res, next) {   try {
    const userId = parseInt(req.body.userId, 10);
    const tweetId = parseInt(req.params.id, 10);
    const newTweet = await tweetService.dislikeTweet(tweetId, userId);
    res.status(201).json(newTweet);
  } catch (error) {
    next(error);
  }
}


module.exports = {
  getAllTweets,
  getLatestTweet,
  getTweetById,
  getTweetsByUserId,
  createTweet,
  liketweet,
  dislikeTweet,
}