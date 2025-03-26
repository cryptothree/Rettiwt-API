import { NewTweet, NewTweetMedia } from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';

/**
 * Options specifying the media file to be uploaded.
 *
 * @internal
 */
export class UploadArgs {
	/** The id allocated to the media file to be uploaded. */
	public id?: string;

	/** The media file to be uploaded. */
	public media?: string | ArrayBuffer;

	/**
	 * The size (in bytes) of the media file to be uploaded.
	 *
	 * @remarks The size must be \<= 5242880 bytes.
	 */
	public size?: number;

	/**
	 * @param step - The upload step.
	 * @param args - The upload arguments for uploading the media file.
	 */
	public constructor(step: EResourceType, args: UploadArgs) {
		this.size = args.size;
		this.media = args.media;
		this.id = args.id;
	}
}

/**
 * Options specifying the media that is to be posted.
 *
 * @public
 */
export class TweetMediaArgs extends NewTweetMedia {
	/** The id of the media to post. */
	public id: string;

	/**
	 * The list of id of the users tagged in the media.
	 *
	 * @remarks
	 * Maximum number of users that can be tagged is 10.
	 */
	public tags?: string[];

	/**
	 * @param args - Arguments specifying the media to be posted.
	 */
	public constructor(args: TweetMediaArgs) {
		super(args);
		this.id = args.id;
		this.tags = args.tags ?? [];
	}
}

/**
 * Options specifying the tweet that is to be posted.
 *
 * @public
 */
export class TweetArgs extends NewTweet {
	/**
	 * The list of media to be uploaded.
	 *
	 * @remarks
	 * Maximum number of media items that can be posted is 4.
	 */
	public media?: TweetMediaArgs[];

	/** The id of the tweet to quote. */
	public quote?: string;

	/** The id of the tweet to which the given tweet must be a reply. */
	public replyTo?: string;

	/** The date/time at which the tweet must be scheduled to be posted. */
	public scheduleFor?: Date;

	/**
	 * The text for the tweet to be created.
	 *
	 * @remarks
	 * Length of the tweet must be \<= 280 characters.
	 */
	public text: string;

	/**
	 * @param args - Arguments specifying the tweet to be posted.
	 */
	public constructor(resource: EResourceType, args: TweetArgs) {
		super(args);
		this.media = args.media ? args.media.map((item) => new TweetMediaArgs(item)) : undefined;
		this.quote = args.quote;
		this.replyTo = args.replyTo;
		this.scheduleFor = args.scheduleFor;
		this.text = args.text;
	}
}

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export class PostArgs {
	/**
	 * The id of the target resource.
	 *
	 * @remarks
	 * Required only when posting using the following resources:
	 * - {@link EResourceType.TWEET_LIKE}
	 * - {@link EResourceType.TWEET_RETWEET}
	 * - {@link EResourceType.TWEET_UNLIKE}
	 * - {@link EResourceType.TWEET_UNPOST}
	 * - {@link EResourceType.TWEET_UNRETWEET}
	 * - {@link EResourceType.USER_FOLLOW}
	 * - {@link EResourceType.USER_UNFOLLOW}
	 */
	public id?: string;

	/**
	 * The tweet that is to be posted.
	 *
	 * @remarks
	 * Required only when posting a tweet using {@link EResourceType.TWEET_POST}
	 */
	public tweet?: TweetArgs;

	/**
	 * The media file to be uploaded.
	 *
	 * @remarks
	 * Required only when uploading a media using the following resources:
	 * - {@link EResourceType.MEDIA_UPLOAD_APPEND}
	 * - {@link EResourceType.MEDIA_UPLOAD_FINALIZE}
	 * - {@link EResourceType.MEDIA_UPLOAD_INITIALIZE}
	 */
	public upload?: UploadArgs;

	/**
	 * @param resource - The resource to be posted.
	 * @param args - Additional user-defined arguments for posting the resource.
	 */
	public constructor(resource: EResourceType, args: PostArgs) {
		this.id = args.id;
		this.tweet = args.tweet ? new TweetArgs(resource, args.tweet) : undefined;
		this.upload = args.upload ? new UploadArgs(resource, args.upload) : undefined;
	}
}
