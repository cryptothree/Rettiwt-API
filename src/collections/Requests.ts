import { AxiosRequestConfig } from 'axios';
import { Request } from 'rettiwt-core';

import { EResourceType } from '../enums/Resource';
import { IFetchArgs } from '../types/args/FetchArgs';
import { IPostArgs } from '../types/args/PostArgs';

/**
 * The request generator from rettiwt-core.
 *
 * @internal
 */
const request = new Request();

/**
 * The collection of requests to various resources.
 *
 * @internal
 */
export const requests: { [key in keyof typeof EResourceType]: (args: IFetchArgs | IPostArgs) => AxiosRequestConfig } = {
	/* eslint-disable @typescript-eslint/naming-convention */
	LIST_MEMBERS: (args: IFetchArgs) => request.list.members(args.id!, args.count, args.cursor),
	LIST_TWEETS: (args: IFetchArgs) => request.list.tweets(args.id!, args.count, args.cursor),

	MEDIA_UPLOAD_APPEND: (args: IPostArgs) => request.media.appendUpload(args.upload!.id!, args.upload!.media!),
	MEDIA_UPLOAD_FINALIZE: (args: IPostArgs) => request.media.finalizeUpload(args.upload!.id!),
	MEDIA_UPLOAD_INITIALIZE: (args: IPostArgs) => request.media.initializeUpload(args.upload!.size!),

	TWEET_DETAILS: (args: IFetchArgs) => request.tweet.details(args.id!),
	TWEET_DETAILS_ALT: (args: IFetchArgs) => request.tweet.replies(args.id!),
	TWEET_LIKE: (args: IPostArgs) => request.tweet.like(args.id!),
	TWEET_POST: (args: IPostArgs) => request.tweet.post(args.tweet!),
	TWEET_REPLIES: (args: IFetchArgs) => request.tweet.replies(args.id!, args.cursor),
	TWEET_RETWEET: (args: IPostArgs) => request.tweet.retweet(args.id!),
	TWEET_RETWEETERS: (args: IFetchArgs) => request.tweet.retweeters(args.id!, args.count, args.cursor),
	TWEET_SCHEDULE: (args: IPostArgs) => request.tweet.schedule(args.tweet!),
	TWEET_SEARCH: (args: IFetchArgs) => request.tweet.search(args.filter!, args.count, args.cursor),
	TWEET_UNLIKE: (args: IPostArgs) => request.tweet.unlike(args.id!),
	TWEET_UNPOST: (args: IPostArgs) => request.tweet.unpost(args.id!),
	TWEET_UNRETWEET: (args: IPostArgs) => request.tweet.unretweet(args.id!),
	TWEET_UNSCHEDULE: (args: IPostArgs) => request.tweet.unschedule(args.id!),

	USER_BOOKMARKS: (args: IFetchArgs) => request.user.bookmarks(args.count, args.cursor),
	USER_DETAILS_BY_USERNAME: (args: IFetchArgs) => request.user.detailsByUsername(args.id!),
	USER_DETAILS_BY_ID: (args: IFetchArgs) => request.user.detailsById(args.id!),
	USER_FEED_FOLLOWED: (args: IFetchArgs) => request.user.followed(args.count, args.cursor),
	USER_FEED_RECOMMENDED: (args: IFetchArgs) => request.user.recommended(args.count, args.cursor),
	USER_FOLLOW: (args: IPostArgs) => request.user.follow(args.id!),
	USER_FOLLOWING: (args: IFetchArgs) => request.user.following(args.id!, args.count, args.cursor),
	USER_FOLLOWERS: (args: IFetchArgs) => request.user.followers(args.id!, args.count, args.cursor),
	USER_HIGHLIGHTS: (args: IFetchArgs) => request.user.highlights(args.id!, args.count, args.cursor),
	USER_LIKES: (args: IFetchArgs) => request.user.likes(args.id!, args.count, args.cursor),
	USER_MEDIA: (args: IFetchArgs) => request.user.media(args.id!, args.count, args.cursor),
	USER_NOTIFICATIONS: (args: IFetchArgs) => request.user.notifications(args.count, args.cursor),
	USER_SUBSCRIPTIONS: (args: IFetchArgs) => request.user.subscriptions(args.id!, args.count, args.cursor),
	USER_TIMELINE: (args: IFetchArgs) => request.user.tweets(args.id!, args.count, args.cursor),
	USER_TIMELINE_AND_REPLIES: (args: IFetchArgs) => request.user.tweetsAndReplies(args.id!, args.count, args.cursor),
	USER_UNFOLLOW: (args: IPostArgs) => request.user.unfollow(args.id!),
	/* eslint-enable @typescript-eslint/naming-convention */
};
