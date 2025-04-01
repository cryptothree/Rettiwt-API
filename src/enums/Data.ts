/**
 * The different base types of data contained in response.
 *
 * @internal
 */
export enum EBaseType {
	NOTIFICATION = 'Notification',
	TWEET = 'Tweet',
	USER = 'User',
}

/**
 * The different types of notifications.
 *
 * @public
 */
export enum ENotificationType {
	RECOMMENDATION = 'RECOMMENDATION',
	INFORMATION = 'INFORMATION',
	LIVE = 'LIVE',
	ALERT = 'ALERT',
	UNDEFINED = 'UNDEFINED',
}
