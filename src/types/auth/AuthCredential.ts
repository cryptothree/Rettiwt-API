import { EAuthenticationType } from '../../enums/Authentication';

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
export interface IAuthCredential {
	/** The bearer token from twitter.com. */
	authToken?: string;

	/** The type of authentication. */
	authenticationType?: EAuthenticationType;

	/** The cookie of the twitter account, which is used to authenticate against twitter. */
	cookies?: string;

	/** The CSRF token for the session. */
	csrfToken?: string;

	/** The guest token provided by Twitter API. */
	guestToken?: string;
}
