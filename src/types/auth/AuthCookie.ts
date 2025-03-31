/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 */
export interface IAuthCookie {
	/* eslint-disable @typescript-eslint/naming-convention */

	/** The bearer token from twitter.com. */
	auth_token: string;

	/** The CSRF token for the session. */
	ct0: string;

	/** Token used to authenticate a device. */
	kdt: string;

	/** Token used to authenticate a user using a Twitter ID. */
	twid: string;

	/* eslint-enable @typescript-eslint/naming-convention */
}
