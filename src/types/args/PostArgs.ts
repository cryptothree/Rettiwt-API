import { INewTweet } from 'rettiwt-core';

/**
 * Options specifying the media file to be uploaded.
 *
 * @public
 */
export interface IUploadArgs {
	/** The id allocated to the media file to be uploaded. */
	id?: string;

	/** The media file to be uploaded. */
	media?: string | ArrayBuffer;

	/**
	 * The size (in bytes) of the media file to be uploaded.
	 *
	 * @remarks The size must be \<= 5242880 bytes.
	 */
	size?: number;
}

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export interface IPostArgs {
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
	id?: string;

	/**
	 * The tweet that is to be posted.
	 *
	 * @remarks
	 * Required only when posting a tweet using {@link EResourceType.TWEET_POST}
	 */
	tweet?: INewTweet;

	/**
	 * The media file to be uploaded.
	 *
	 * @remarks
	 * Required only when uploading a media using the following resources:
	 * - {@link EResourceType.MEDIA_UPLOAD_APPEND}
	 * - {@link EResourceType.MEDIA_UPLOAD_FINALIZE}
	 * - {@link EResourceType.MEDIA_UPLOAD_INITIALIZE}
	 */
	upload?: IUploadArgs;
}
