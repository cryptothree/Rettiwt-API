/* eslint-disable */

import { ERawNotificationType } from '../../../enums/raw/Notification';

/**
 * Represents the raw data of a single Notification.
 *
 * @public
 */
export interface INotification {
	id: string;
	timestampMs: string;
	icon: INotificationIcon;
	message: INotificationMessage;
	template: INotificationTemplate;
}

export interface INotificationIcon {
	id: ERawNotificationType;
}

export interface INotificationMessage {
	text: string;
	entities: INotificationMessageEntity[];
	rtl: boolean;
}

export interface INotificationMessageEntity {
	fromIndex: number;
	toIndex: number;
	format: string;
}

export interface INotificationTemplate {
	aggregateUserActionsV1: INotificationUserActions;
}

export interface INotificationUserActions {
	targetObjects: INotificationTargetObject[];
	fromUsers: INotificationFromUser[];
	additionalContext: INotificationAdditionalContext;
}

export interface INotificationTargetObject {
	tweet: INotificationTweet;
}

export interface INotificationTweet {
	id: string;
}

export interface INotificationFromUser {
	user: INotificationUser;
}

export interface INotificationUser {
	id: string;
}

export interface INotificationAdditionalContext {
	contextText: INotificationContextText;
}

export interface INotificationContextText {
	text: string;
	entities: any[];
}
