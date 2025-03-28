import { NewTweet } from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';
import { IPostArgs, IUploadArgs } from '../../types/args/PostArgs';

/**
 * Options specifying the media file to be uploaded.
 *
 * @public
 */
export class UploadArgs implements IUploadArgs {
	public id?: string;
	public media?: string | ArrayBuffer;
	public size?: number;

	/**
	 * @param step - The upload step.
	 * @param args - The upload arguments for uploading the media file.
	 */
	public constructor(step: EResourceType, args: IUploadArgs) {
		this.size = args.size;
		this.media = args.media;
		this.id = args.id;
	}
}

/**
 * Options specifying the data that is to be posted.
 *
 * @public
 */
export class PostArgs implements IPostArgs {
	public id?: string;
	public tweet?: NewTweet;
	public upload?: UploadArgs;

	/**
	 * @param resource - The resource to be posted.
	 * @param args - Additional user-defined arguments for posting the resource.
	 */
	public constructor(resource: EResourceType, args: IPostArgs) {
		this.id = args.id;
		this.tweet = args.tweet ? new NewTweet(args.tweet) : undefined;
		this.upload = args.upload ? new UploadArgs(resource, args.upload) : undefined;
	}
}
