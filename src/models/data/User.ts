import { ELogActions } from '../../enums/Logging';
import { findByFilter } from '../../helper/JsonUtils';
import { LogService } from '../../services/internal/LogService';
import { IUser } from '../../types/data/User';
import { IUser as IRawUser } from '../../types/raw/base/User';
import { ITimelineUser as IRawTimelineUser } from '../../types/raw/composite/TimelineUser';

/**
 * The details of a single user.
 *
 * @public
 */
export class User implements IUser {
	public createdAt: string;
	public description?: string;
	public followersCount: number;
	public followingsCount: number;
	public fullName: string;
	public id: string;
	public isVerified: boolean;
	public likeCount: number;
	public location?: string;
	public pinnedTweet?: string;
	public profileBanner?: string;
	public profileImage: string;
	public statusesCount: number;
	public userName: string;

	/**
	 * @param user - The raw user details.
	 */
	public constructor(user: IRawUser) {
		this.id = user.rest_id;
		this.userName = user.legacy.screen_name;
		this.fullName = user.legacy.name;
		this.createdAt = user.legacy.created_at;
		this.description = user.legacy.description.length ? user.legacy.description : undefined;
		this.isVerified = user.is_blue_verified;
		this.likeCount = user.legacy.favourites_count;
		this.followersCount = user.legacy.followers_count;
		this.followingsCount = user.legacy.friends_count;
		this.statusesCount = user.legacy.statuses_count;
		this.location = user.legacy.location.length ? user.legacy.location : undefined;
		this.pinnedTweet = user.legacy.pinned_tweet_ids_str[0];
		this.profileBanner = user.legacy.profile_banner_url;
		this.profileImage = user.legacy.profile_image_url_https;
	}

	/**
	 * Extracts and deserializes the list of users from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The deserialized list of users.
	 */
	public static list(response: NonNullable<unknown>): User[] {
		const users: User[] = [];

		// Extracting the matching data
		const extract = findByFilter<IRawTimelineUser>(response, '__typename', 'TimelineUser');

		// Deserializing valid data
		for (const item of extract) {
			if (item.user_results?.result?.legacy) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.user_results.result.rest_id });

				users.push(new User(item.user_results.result));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `User not found, skipping`,
				});
			}
		}

		return users;
	}

	/**
	 * Extracts and deserializes a single target user from the given raw response data.
	 *
	 * @param response - The raw response data.
	 *
	 * @returns The target deserialized user.
	 */
	public static single(response: NonNullable<unknown>): User | undefined {
		const users: User[] = [];

		// Extracting the matching data
		const extract = findByFilter<IRawUser>(response, '__typename', 'User');

		// Deserializing valid data
		for (const item of extract) {
			if (item.legacy && item.legacy.created_at) {
				// Logging
				LogService.log(ELogActions.DESERIALIZE, { id: item.rest_id });

				users.push(new User(item));
			} else {
				// Logging
				LogService.log(ELogActions.WARNING, {
					action: ELogActions.DESERIALIZE,
					message: `User not found, skipping`,
				});
			}
		}

		return users.length ? users[0] : undefined;
	}
}
