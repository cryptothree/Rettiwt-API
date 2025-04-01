import { ESearchResultType, TweetFilter } from 'rettiwt-core';

import { EResourceType } from '../../enums/Resource';
import { IFetchArgs } from '../../types/args/FetchArgs';

/**
 * Options specifying the data that is to be fetched.
 *
 * @public
 */
export class FetchArgs implements IFetchArgs {
	public count?: number;
	public cursor?: string;
	public filter?: TweetFilter;
	public id?: string;
	public results?: ESearchResultType;

	/**
	 * @param resource - The resource to be fetched.
	 * @param args - Additional user-defined arguments for fetching the resource.
	 */
	public constructor(resource: EResourceType, args: IFetchArgs) {
		this.id = args.id;
		this.count = args.count;
		this.cursor = args.cursor;
		this.filter = args.filter ? new TweetFilter(args.filter) : undefined;
		this.results = args.results;
	}
}
