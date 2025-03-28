import { ESearchResultType, ITweetFilter } from 'rettiwt-core';

/**
 * Options specifying the data that is to be fetched.
 *
 * @public
 */
export interface IFetchArgs {
	/**
	 * The number of data items to fetch.
	 *
	 * @remarks
	 * - Works only for cursored resources.
	 * - Must be \<= 20 for:
	 * 	- {@link EResourceType.USER_TIMELINE}
	 * 	- {@link EResourceType.USER_TIMELINE}
	 * 	- {@link EResourceType.USER_TIMELINE_AND_REPLIES}
	 * - Must be \<= 100 for all other cursored resources.
	 * - Due a bug on Twitter's end, count does not work for {@link EResourceType.USER_FOLLOWERS} and {@link EResourceType.USER_FOLLOWING}.
	 * - Has not effect for:
	 * 	- {@link EResourceType.USER_FEED_FOLLOWED}
	 * 	- {@link EResourceType.USER_FEED_RECOMMENDED}
	 */
	count?: number;

	/**
	 * The cursor to the batch of data to fetch.
	 *
	 * @remarks
	 * - May be used for cursored resources.
	 * - Has no effect for other resources.
	 */
	cursor?: string;

	/**
	 * The filter for searching tweets.
	 *
	 * @remarks
	 * Required when searching for tweets using {@link EResourceType.TWEET_SEARCH}.
	 */
	filter?: ITweetFilter;

	/**
	 * The id of the target resource.
	 *
	 * @remarks
	 * - Required for all resources except {@link EResourceType.TWEET_SEARCH} and {@link EResourceType.USER_TIMELINE_RECOMMENDED}.
	 * - For {@link EResourceType.USER_DETAILS_BY_USERNAME}, can be alphanumeric, while for others, is strictly numeric.
	 */
	id?: string;

	/**
	 * The type of search results to fetch. Can be one of:
	 * - {@link EResourceType.LATEST}, for latest search results.
	 * - {@link EResourceType.TOP}, for top search results.
	 *
	 * @defaultValue {@link ESearchResultType.LATEST}.
	 *
	 * @remarks
	 * - Applicable only for {@link EResourceType.TWEET_SEARCH}.
	 */
	results?: ESearchResultType;
}
