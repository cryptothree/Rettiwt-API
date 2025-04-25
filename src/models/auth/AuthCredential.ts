import { AxiosHeaders, AxiosRequestHeaders } from 'axios';

import { Cookie } from 'cookiejar';

import { EAuthenticationType } from '../../enums/Authentication';
import { ELogActions } from '../../enums/Logging';
import { LogService } from '../../services/internal/LogService';
import { IAuthCredential } from '../../types/auth/AuthCredential';

import { AuthCookie } from './AuthCookie';

/**
 * The credentials for authenticating against Twitter.
 *
 * Depending on which tokens are present, the authentication type is determined as follows:
 * - authToken, guestToken =\> Guest authentication.
 * - authToken, csrfToken, cookie =\> User authentication.
 * - authToken, guestToken, cookie =\> Guest authentication while logging in.
 *
 * @public
 */
export class AuthCredential implements IAuthCredential {
	private static readonly _authTokens: string[] = [
		'AAAAAAAAAAAAAAAAAAAAAG5LOQEAAAAAbEKsIYYIhrfOQqm4H8u7xcahRkU%3Dz98HKmzbeXdKqBfUDmElcqYl0cmmKY9KdS2UoNIz3Phapgsowi',
		'AAAAAAAAAAAAAAAAAAAAAFQODgEAAAAAVHTp76lzh3rFzcHbmHVvQxYYpTw%3DckAlMINMjmCwxUcaXbAN4XqJVdgMJaHqNOFgPMK0zN1qLqLQCF',
		'AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
	];
	private static _currentAuthTokenIndex = 0;

	public authToken?: string;
	public authenticationType?: EAuthenticationType;
	public cookies?: string;
	public csrfToken?: string;
	public guestToken?: string;

	/**
	 * @param cookies - The list of cookies to be used for authenticating against Twitter.
	 * @param guestToken - The guest token to be used to authenticate a guest session.
	 */
	public constructor(cookies?: Cookie[], guestToken?: string) {
		this.authToken = AuthCredential._authTokens[AuthCredential._currentAuthTokenIndex];
		// If guest credentials given
		if (!cookies && guestToken) {
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.GUEST;
		}
		// If login credentials given
		else if (cookies && guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.guestToken = guestToken;
			this.authenticationType = EAuthenticationType.LOGIN;
		}
		// If user credentials given
		else if (cookies && !guestToken) {
			// Parsing the cookies
			const parsedCookie: AuthCookie = new AuthCookie(cookies);

			this.cookies = parsedCookie.toString();
			this.csrfToken = parsedCookie.ct0;
			this.authenticationType = EAuthenticationType.USER;
		}
	}

	/**
	 * Switches the current auth token to the next one.
	 */
	public static switchAuthToken(): void {
		AuthCredential._currentAuthTokenIndex =
			(AuthCredential._currentAuthTokenIndex + 1) % AuthCredential._authTokens.length;

		// Logging
		LogService.log(ELogActions.AUTHORIZATION, {
			action: ELogActions.AUTHORIZATION,
			message: `Switching auth token to ${AuthCredential._authTokens[AuthCredential._currentAuthTokenIndex]}`,
		});
	}

	/**
	 * @returns The HTTP header representation of 'this' object.
	 */
	public toHeader(): AxiosRequestHeaders {
		const headers = new AxiosHeaders();

		/**
		 * Conditionally initializing only those data which are supplied.
		 *
		 * This is done to ensure that the data that is not supplied, is not included in output, not even undefined.
		 */
		if (this.authToken) {
			headers.set('authorization', `Bearer ${this.authToken}`);
		}
		if (this.guestToken) {
			headers.set('x-guest-token', this.guestToken);
		}
		if (this.csrfToken) {
			headers.set('x-csrf-token', this.csrfToken);
		}
		if (this.cookies) {
			headers.set('cookie', this.cookies);
		}

		return headers;
	}
}
