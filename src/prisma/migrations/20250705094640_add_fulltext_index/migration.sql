-- full text on content and hashtags
CREATE INDEX CONCURRENTLY tweet_search_idx
ON "Tweet"
USING GIN (
  to_tsvector('english', content || ' ' || array_to_string(hashtags, ' '))
);

DROP INDEX CONCURRENTLY IF EXISTS tweet_content_fulltext_idx;