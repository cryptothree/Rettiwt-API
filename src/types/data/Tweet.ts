import { EMediaType } from 'rettiwt-core';

import { IUser } from './User';

/**
 * The details of a single tweet.
 *
 * @public
 */
export interface ITweet {
	/** The number of bookmarks of a tweet. */
	bookmarkCount: number;

	/** The date and time of creation of the tweet, in UTC string format. */
	createdAt: string;

	/** Additional tweet entities like urls, mentions, etc. */
	entities: ITweetEntities;

	/** The full text content of the tweet. */
	fullText: string;

	/** The rest id of the tweet. */
	id: string;

	/** The language in which the tweet is written. */
	lang: string;

	/** The number of likes of the tweet. */
	likeCount: number;

	/** The urls of the media contents of the tweet (if any). */
	media?: ITweetMedia[];

	/** The number of quotes of the tweet. */
	quoteCount: number;

	/** The tweet which is quoted in the tweet. */
	quoted?: ITweet;

	/** The number of replies to the tweet. */
	replyCount: number;

	/** The rest id of the tweet to which the tweet is a reply. */
	replyTo?: string;

	/** The number of retweets of the tweet. */
	retweetCount: number;

	/** The tweet which is retweeted in this tweet (if any). */
	retweetedTweet?: ITweet;

	/** The details of the user who made the tweet. */
	tweetBy: IUser;

	/** The URL to the tweet. */
	url: string;

	/** The number of views of a tweet. */
	viewCount: number;
}

/**
 * The different types parsed entities like urls, media, mentions, hashtags, etc.
 *
 * @public
 */
export interface ITweetEntities {
	/** The list of hashtags mentioned in the tweet. */
	hashtags: string[];

	/** The list of IDs of users mentioned in the tweet. */
	mentionedUsers: string[];

	/** The list of urls mentioned in the tweet. */
	urls: string[];
}

/**
 * The details of a single media content included in a tweet.
 *
 * @public
 */
export interface ITweetMedia {
	/** The thumbnail URL for the video content of the tweet. */
	thumbnailUrl?: string;

	/** The type of media. */
	type: EMediaType;

	/** The direct URL to the media. */
	url: string;
}
