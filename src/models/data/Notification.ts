import { ENotificationType } from '../../enums/Data';
import { ENotificationType as ENotificationTypeOriginal } from '../../enums/Notification';
import { findKeyByValue } from '../../helper/JsonUtils';
import { INotification } from '../../types/data/Notification';
import { INotification as IRawNotification } from '../../types/raw/base/Notification';
import { IUserNotificationsResponse } from '../../types/raw/user/Notifications';

/**
 * The details of a single notification.
 *
 * @public
 */
export class Notification implements INotification {
	public from: string[];
	public id: string;
	public message: string;
	public receivedAt: Date;
	public target: string[];
	public type?: ENotificationType;

	/**
	 * @param notification - The raw notification details.
	 */
	public constructor(notification: IRawNotification) {
		// Getting the original notification type
		const notificationType: string | undefined = findKeyByValue(ENotificationTypeOriginal, notification.icon.id);

		this.from = notification.template?.aggregateUserActionsV1?.fromUsers
			? notification.template.aggregateUserActionsV1.fromUsers.map((item) => item.user.id)
			: [];
		this.id = notification.id;
		this.message = notification.message.text;
		this.receivedAt = new Date(Number(notification.timestampMs));
		this.target = notification.template?.aggregateUserActionsV1?.targetObjects
			? notification.template.aggregateUserActionsV1.targetObjects.map((item) => item.tweet.id)
			: [];
		this.type = notificationType
			? ENotificationType[notificationType as keyof typeof ENotificationType]
			: ENotificationType.UNDEFINED;
	}

	/**
	 * Extracts and deserializes the list of notifications from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of notifications.
	 *
	 * @internal
	 */
	public static list(response: NonNullable<unknown>): Notification[] {
		const notifications: Notification[] = [];

		// Extracting notifications
		if ((response as IUserNotificationsResponse).globalObjects.notifications) {
			// Iterating over the raw list of notifications
			for (const [, value] of Object.entries(
				(response as IUserNotificationsResponse).globalObjects.notifications,
			)) {
				notifications.push(new Notification(value as IRawNotification));
			}
		}

		return notifications;
	}
}
