import { AxiosRequestConfig } from 'axios';

import { EResourceType } from '../enums/Resource';
import { Request } from '../requests';
import { IFetchArgs } from '../types/args/FetchArgs';
import { IPostArgs } from '../types/args/PostArgs';

/**
 * The collection of requests to various resources.
 *
 * @internal
 */
export const requests: { [key in keyof typeof EResourceType]: (args: IFetchArgs | IPostArgs) => AxiosRequestConfig } = {
	/* eslint-disable @typescript-eslint/naming-convention */

	LIST_MEMBERS: (args: IFetchArgs) => Request.list.members(args.id!, args.count, args.cursor),
	LIST_TWEETS: (args: IFetchArgs) => Request.list.tweets(args.id!, args.count, args.cursor),

	MEDIA_UPLOAD_APPEND: (args: IPostArgs) => Request.media.appendUpload(args.upload!.id!, args.upload!.media!),
	MEDIA_UPLOAD_FINALIZE: (args: IPostArgs) => Request.media.finalizeUpload(args.upload!.id!),
	MEDIA_UPLOAD_INITIALIZE: (args: IPostArgs) => Request.media.initializeUpload(args.upload!.size!),

	TWEET_DETAILS: (args: IFetchArgs) => Request.tweet.details(args.id!),
	TWEET_DETAILS_ALT: (args: IFetchArgs) => Request.tweet.replies(args.id!),
	TWEET_LIKE: (args: IPostArgs) => Request.tweet.like(args.id!),
	TWEET_POST: (args: IPostArgs) => Request.tweet.post(args.tweet!),
	TWEET_REPLIES: (args: IFetchArgs) => Request.tweet.replies(args.id!, args.cursor),
	TWEET_RETWEET: (args: IPostArgs) => Request.tweet.retweet(args.id!),
	TWEET_RETWEETERS: (args: IFetchArgs) => Request.tweet.retweeters(args.id!, args.count, args.cursor),
	TWEET_SCHEDULE: (args: IPostArgs) => Request.tweet.schedule(args.tweet!),
	TWEET_SEARCH: (args: IFetchArgs) => Request.tweet.search(args.filter!, args.count, args.cursor),
	TWEET_UNLIKE: (args: IPostArgs) => Request.tweet.unlike(args.id!),
	TWEET_UNPOST: (args: IPostArgs) => Request.tweet.unpost(args.id!),
	TWEET_UNRETWEET: (args: IPostArgs) => Request.tweet.unretweet(args.id!),
	TWEET_UNSCHEDULE: (args: IPostArgs) => Request.tweet.unschedule(args.id!),

	USER_BOOKMARKS: (args: IFetchArgs) => Request.user.bookmarks(args.count, args.cursor),
	USER_DETAILS_BY_USERNAME: (args: IFetchArgs) => Request.user.detailsByUsername(args.id!),
	USER_DETAILS_BY_ID: (args: IFetchArgs) => Request.user.detailsById(args.id!),
	USER_FEED_FOLLOWED: (args: IFetchArgs) => Request.user.followed(args.count, args.cursor),
	USER_FEED_RECOMMENDED: (args: IFetchArgs) => Request.user.recommended(args.count, args.cursor),
	USER_FOLLOW: (args: IPostArgs) => Request.user.follow(args.id!),
	USER_FOLLOWING: (args: IFetchArgs) => Request.user.following(args.id!, args.count, args.cursor),
	USER_FOLLOWERS: (args: IFetchArgs) => Request.user.followers(args.id!, args.count, args.cursor),
	USER_HIGHLIGHTS: (args: IFetchArgs) => Request.user.highlights(args.id!, args.count, args.cursor),
	USER_LIKES: (args: IFetchArgs) => Request.user.likes(args.id!, args.count, args.cursor),
	USER_MEDIA: (args: IFetchArgs) => Request.user.media(args.id!, args.count, args.cursor),
	USER_NOTIFICATIONS: (args: IFetchArgs) => Request.user.notifications(args.count, args.cursor),
	USER_SUBSCRIPTIONS: (args: IFetchArgs) => Request.user.subscriptions(args.id!, args.count, args.cursor),
	USER_TIMELINE: (args: IFetchArgs) => Request.user.tweets(args.id!, args.count, args.cursor),
	USER_TIMELINE_AND_REPLIES: (args: IFetchArgs) => Request.user.tweetsAndReplies(args.id!, args.count, args.cursor),
	USER_UNFOLLOW: (args: IPostArgs) => Request.user.unfollow(args.id!),

	/* eslint-enable @typescript-eslint/naming-convention */
};
