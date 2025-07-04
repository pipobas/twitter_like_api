const prisma = require('../prisma/client');
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require('@prisma/client/runtime/library');

async function fetchAllTweets() {

    const tweets = await prisma.tweet.findMany()
    return tweets;
}

async function fetchLatestTweet() {
    const latestTweets = await prisma.tweet.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 20,
    });
    return latestTweets;
}

async function fetchTweetById(tweetId) {
    try {
        const tweet = await prisma.tweet.findUniqueOrThrow({
            where: { id: tweetId },
            include: {
                id: true,
                content: true,
                hashtags: true,
                createdAt: false,
                authorId: true,
                numberOfLikes: true,
            },
        });
        console.log('Tweet fetched successfully:', tweet);
        return tweet;
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                const error = new Error(`Tweet not found with id: ${tweetId}`);
                error.status = 404;
                throw error;
            }
        }
        throw err;
    }
}

async function fetchTweetByUserId(userId) {
    try {
        const tweets = await prisma.tweet.findMany({
            where: { authorId: userId },
            select: {
                id: true,
                content: true,
                hashtags: true,
                createdAt: false,
                authorId: true,
                numberOfLikes: true,
            },
        });
        console.log('Tweets fetched successfully:', tweets);
        return tweets;
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                const error = new Error(`Tweets not found for user with id: ${userId}`);
                error.status = 404;
                throw error;
            }
        }
        throw err;
    }
}

async function createTweet(tweetData) {
    authorId = parseInt(tweetData.authorId, 10);
    try {
        await prisma.user.findUniqueOrThrow({
            where: { id: authorId },
        });

        const tweet = await prisma.tweet.create({
            data: {
                content: tweetData.content,
                hashtags: tweetData.hashtags ? tweetData.hashtags : [],
                numberOfLikes: 0,
                author: { connect: { id: authorId } }
            },
            include: {
                author: true,
            },
        });
        console.log('Tweet created successfully:', tweet);
        return tweet;
    } catch (err) {
        console.error('Error creating tweet:', err);
        if (err instanceof PrismaClientValidationError) {
            const error = new Error('Invalid tweet data');
            error.status = 400;
            throw error;
        }
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                const error = new Error(`User not found with id: ${authorId}`);
                error.status = 404;
                throw error;
            }
        }
        throw err;
    }
}


module.exports = {
    fetchAllTweets,
    fetchLatestTweet, 
    fetchTweetById,  
    fetchTweetByUserId, 
    createTweet

}
/*
  liketweet,
  dislikeTweet,
  deleteTweet*/