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
	next: ICursor;

	/** The cursor to the previous batch of data. */
	previous: ICursor;
}

/**
 * The cursor to the batch of data to fetch.
 *
 * @public
 */
export interface ICursor {
	/** The cursor string. */
	value: string;
}
