import * as listRequests from './List';
import * as mediaRequests from './Media';
import * as tweetRequests from './Tweet';
import * as userRequests from './User';

/**
 * The collection containing the different request configurations for different resources on Twitter API.
 *
 * @public
 */
export class Request {
	/** Collection of requests related to lists. */
	public static list = listRequests;

	/** Collection of requests related to media. */
	public static media = mediaRequests;

	/** Collection of requests related to tweets. */
	public static tweet = tweetRequests;

	/** Collection of requests related to users. */
	public static user = userRequests;
}
