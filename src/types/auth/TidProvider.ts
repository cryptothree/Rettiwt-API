/**
 * Service responsible for generating the `x-client-transaction-id` header.
 */
export interface TidProvider {
	/**
	 * Generates new `x-client-transaction-id` header.
	 *
	 * @param method - Request method.
	 * @param path - Endpoint path without query parameters.
	 */
	generate(method: string, path: string): Promise<string>;

	/**
	 * Refresh arguments obtained from parsing the HTML page, if any.
	 */
	refreshDynamicArgs(): Promise<void>
}