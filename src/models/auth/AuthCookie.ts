import { Cookie } from 'puppeteer';

/**
 * The cookie containing the tokens that are used to authenticate against Twitter.
 */
export class AuthCookie {
	/* eslint-disable @typescript-eslint/naming-convention */

	/** The bearer token from twitter.com. */
	public auth_token = '';

	/** The CSRF token for the session. */
	public ct0 = '';

	/** Token used to authenticate a device. */
	public kdt = '';

	/** Token used to authenticate a user using a Twitter ID. */
	public twid = '';

	/* eslint-enable @typescript-eslint/naming-convention */

	/**
	 * @param cookies - The cookie list obtained from the browser.
	 */
	public constructor(cookies: Cookie[]) {
		// Parsing the cookies
		for (const cookie of cookies) {
			if (cookie.name == 'kdt') {
				this.kdt = cookie.value;
			} else if (cookie.name == 'twid') {
				this.twid = cookie.value;
			} else if (cookie.name == 'ct0') {
				this.ct0 = cookie.value;
			} else if (cookie.name == 'auth_token') {
				this.auth_token = cookie.value;
			}
		}
	}

	/**
	 * @returns the string representation of 'this' object.
	 */
	public toString(): string {
		/** The string representation of 'this' object. */
		let outStr = '';

		// Iterating through the (key, value) pairs of this cookie
		for (const [key, value] of Object.entries(this)) {
			outStr += `${key}=${value as string};`;
		}

		return outStr;
	}
}
