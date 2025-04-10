import { EBaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

import { ICursor, ICursoredData } from '../../types/data/CursoredData';
import { ICursor as IRawCursor } from '../../types/raw/base/Cursor';

import { Notification } from './Notification';
import { Tweet } from './Tweet';
import { User } from './User';

/**
 * The data that is fetched batch-wise using a cursor.
 *
 * @typeParam T - Type of data to be stored.
 *
 * @public
 */
export class CursoredData<T extends Notification | Tweet | User> implements ICursoredData<T> {
	public list: T[] = [];
	public next: Cursor = new Cursor('');

	/**
	 * @param response - The raw response.
	 * @param type - The base type of the data included in the batch.
	 */
	public constructor(response: NonNullable<unknown>, type: EBaseType) {
		// Initializing defaults
		this.list = [];
		this.next = new Cursor('');

		if (type == EBaseType.TWEET) {
			this.list = Tweet.list(response) as T[];
			this.next = new Cursor(findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '');
		} else if (type == EBaseType.USER) {
			this.list = User.list(response) as T[];
			this.next = new Cursor(findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '');
		} else if (type == EBaseType.NOTIFICATION) {
			this.list = Notification.list(response) as T[];
			this.next = new Cursor(findByFilter<IRawCursor>(response, 'cursorType', 'Top')[0]?.value ?? '');
		}
	}
}

/**
 * The cursor to the batch of data to fetch.
 *
 * @public
 */
export class Cursor implements ICursor {
	/** The cursor string. */
	public value: string;

	/**
	 * @param cursor - The cursor string.
	 */
	public constructor(cursor: string) {
		this.value = cursor;
	}
}
