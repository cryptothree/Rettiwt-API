import { INotification } from './Notification';
import { ITweet } from './Tweet';
import { IUser } from './User';

/**
 * The data that is fetched batch-wise using a cursor.
 *
 * @typeParam T - Type of data to be stored.
 *
 * @public
 */
export interface ICursoredData<T extends INotification | ITweet | IUser> {
	/** The batch of data of the given type. */
	list: T[];

	/** The cursor to the next batch of data. */
	next: string;

	/** The cursor to the previous batch of data. */
	previous: string;
}
