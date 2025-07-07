const prisma = require('../prisma/client');
const { PrismaClientKnownRequestError, PrismaClientValidationError } = require('@prisma/client/runtime/library');

async function fetchAllTweets() {

    const tweets = await prisma.tweet.findMany({take: 20})
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

async function fetchTweetsByUserId(userId) {
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
            orderBy: {
                createdAt: 'desc',
            },
            take: 20,
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

async function advancedTweetSearch(content, hashtags) {
    const combinedQuery = content + (hashtags?.length ? ' ' + hashtags.join(' ') : '');

    const tweets = await prisma.$queryRaw`
        SELECT
            *,
            ts_rank(
            to_tsvector('english', content || ' ' || array_to_string(hashtags, ' ')),
            plainto_tsquery('english', ${combinedQuery})
            ) AS rank
        FROM "Tweet"
        WHERE to_tsvector('english', content || ' ' || array_to_string(hashtags, ' '))
            @@ plainto_tsquery('english', ${combinedQuery})
        ORDER BY rank DESC, "createdAt" DESC
        LIMIT 20;`;
    return tweets;
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

async function likeTweet(tweetId, userId) {
    try {
        const alreadyLiked = await prisma.tweet.findFirst({
            where: {
                id: tweetId,
                likers: {
                    some: { id: userId },
                },
            },
        });

        if (alreadyLiked) {
            const error = new Error(`User ${userId} has already liked tweet ${tweetId}`);
            error.status = 400;
            throw error;
        }

        const tweet = await prisma.tweet.update({
            where: { id: tweetId },
            data: {
                numberOfLikes: {
                    increment: 1,
                },
                likers: {
                    connect: { id: userId },
                },
            },
        });

        console.log(`Tweet with ID ${tweetId} liked by user ${userId}`);
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

async function dislikeTweet(tweetId, userId) {
    try {
        const alreadyLiked = await prisma.tweet.findFirst({
            where: {
                id: tweetId,
                likers: {
                    some: { id: userId },
                },
            },
        });

        if (!alreadyLiked) {
            const error = new Error(`User ${userId} has not liked tweet ${tweetId}`);
            error.status = 400;
            throw error;
        }

        const tweet = await prisma.tweet.update({
            where: { id: tweetId },
            data: {
                numberOfLikes: {
                    decrement: 1,
                },
                likers: {
                    disconnect: { id: userId },
                },
            },
        });

        console.log(`Tweet with ID ${tweetId} has lost a like by user ${userId}`);
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


module.exports = {
    fetchAllTweets,
    fetchLatestTweet,
    fetchTweetById,
    fetchTweetsByUserId,
    advancedTweetSearch,
    createTweet,
    likeTweet,
    dislikeTweet
    // deleteTweet -> no delete beacuse take your responsibility when you write a tweet
    }
