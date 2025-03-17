import axios from 'axios';
import https, { Agent } from 'https';
import { EApiErrors } from '../../enums/Api';
import { AuthCredential } from '../../models/auth/AuthCredential';
import { IRettiwtConfig } from '../../types/RettiwtConfig';

import { HttpsProxyAgent } from 'https-proxy-agent';
import puppeteer from 'puppeteer';

/**
 * The services that handles authentication.
 *
 * @public
 */
export class AuthService {
	/** The HTTPS Agent to use for requests to Twitter API. */
	private readonly httpsAgent: Agent;

	/**
	 * @param config - The config object for configuring the `Rettiwt` instance.
	 *
	 * @internal
	 */
	public constructor(config?: IRettiwtConfig) {
		this.httpsAgent = config?.proxyUrl ? new HttpsProxyAgent(config.proxyUrl) : new https.Agent();
	}

	/**
	 * Decodes the encoded cookie string.
	 *
	 * @param encodedCookies - The encoded cookie string to decode.
	 * @returns The decoded cookie string.
	 */
	public static decodeCookie(encodedCookies: string): string {
		// Decoding the encoded cookie string
		const decodedCookies: string = Buffer.from(encodedCookies, 'base64').toString('ascii');

		return decodedCookies;
	}

	/**
	 * Encodes the given cookie string.
	 *
	 * @param cookieString - The cookie string to encode.
	 * @returns The encoded cookie string.
	 */
	public static encodeCookie(cookieString: string): string {
		// Encoding the cookie string to base64
		const encodedCookies: string = Buffer.from(cookieString).toString('base64');

		return encodedCookies;
	}

	/**
	 * Gets the user's id from the given API key.
	 *
	 * @param apiKey - The API key.
	 * @returns The user id associated with the API key.
	 */
	public static getUserId(apiKey: string): string {
		// Getting the cookie string from the API key
		const cookieString: string = AuthService.decodeCookie(apiKey);

		// Searching for the user id in the cookie string
		const searchResults: string[] | null = cookieString.match(
			/((?<=twid="u=)(\d+)(?="))|((?<=twid=u%3D)(\d+)(?=;))/,
		);

		// If user id was found
		if (searchResults) {
			return searchResults[0];
		}
		// If user id was not found
		else {
			throw new Error(EApiErrors.BAD_AUTHENTICATION);
		}
	}

	/**
	 * Login to twitter as guest.
	 *
	 * @returns A new guest key.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance
	 * const rettiwt = new Rettiwt();
	 *
	 * // Logging in an getting a new guest key
	 * rettiwt.auth.guest()
	 * .then(guestKey => {
	 * 	// Use the guest key
	 * 	...
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 */
	public async guest(): Promise<AuthCredential> {
		// Creating a new blank credential
		const cred: AuthCredential = new AuthCredential();

		// Getting the guest token
		await axios
			.get<{ guest_token: string }>('https://api.twitter.com/1.1/guest/activate.json', {
				headers: cred.toHeader(),
				httpsAgent: this.httpsAgent,
			})
			.then((res) => {
				cred.guestToken = res.data.guest_token;
			});

		return cred;
	}

	/**
	 * Login to twitter using account credentials.
	 *
	 * @param email - The email id associated with the Twitter account.
	 * @param userName - The username associated with the Twitter account.
	 * @param password - The password to the Twitter account.
	 *
	 * @returns The `API_KEY` for the Twitter account.
	 *
	 * @example
	 * ```
	 * import { Rettiwt } from 'rettiwt-api';
	 *
	 * // Creating a new Rettiwt instance
	 * const rettiwt = new Rettiwt();
	 *
	 * // Logging in an getting the API_KEY
	 * rettiwt.auth.login("email@domain.com", "username", "password")
	 * .then(apiKey => {
	 * 	// Use the API_KEY
	 * 	...
	 * })
	 * .catch(err => {
	 * 	console.log(err);
	 * });
	 * ```
	 *
	 * @remarks
	 * Interchanging `email` and `userName` works too.
	 */
	public async login(email: string, userName: string, password: string): Promise<string> {
		// Launch browser
		const browser = await puppeteer.launch({
			headless: true,
			defaultViewport: null,
		});

		const page = await browser.newPage();
		await page.goto('https://x.com/i/flow/login');

		// Wait for username field and type
		await page.waitForSelector('input[autocomplete="username"]');
		await page.type('input[autocomplete="username"]', userName);

		// Click the Next button using background color
		await page.waitForSelector('button[style*="background-color: rgb(15, 20, 25)"]');
		await page.click('button[style*="background-color: rgb(15, 20, 25)"]');

		// Wait for password field and type
		await page.waitForSelector('input[name="password"]');
		await page.type('input[name="password"]', password);

		// Click the Next button using background color
		await page.waitForSelector('button[style*="background-color: rgb(15, 20, 25)"]');
		await page.click('button[style*="background-color: rgb(15, 20, 25)"]');

		// Wait for navigation to complete
		await page.waitForNavigation();

		// Getting the cookies
		const cookies = (await browser.cookies()).filter((cookie) => cookie.domain.includes('x.com'));

		return AuthService.encodeCookie(new AuthCredential(cookies).cookies ?? '');
	}
}
