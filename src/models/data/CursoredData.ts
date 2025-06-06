import { EBaseType } from '../../enums/Data';

import { findByFilter } from '../../helper/JsonUtils';

import { ICursoredData } from '../../types/data/CursoredData';
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
	public list: T[];
	public next: string;
	public previous: string;

	/**
	 * @param response - The raw response.
	 * @param type - The base type of the data included in the batch.
	 */
	public constructor(response: NonNullable<unknown>, type: EBaseType) {
		// Initializing defaults
		this.list = [];
		this.next = '';
		this.previous = '';

		switch (type) {
			case EBaseType.TWEET:
				this.list = Tweet.timeline(response) as T[];
				break;
			case EBaseType.USER:
				this.list = User.timeline(response) as T[];
				break;
			case EBaseType.NOTIFICATION:
				this.list = Notification.list(response) as T[];
				break;
		}

		this.next = findByFilter<IRawCursor>(response, 'cursorType', 'Bottom')[0]?.value ?? '';
		this.previous = findByFilter<IRawCursor>(response, 'cursorType', 'Top')[0]?.value ?? '';
	}

	/**
	 * @returns A serializable JSON representation of `this` object.
	 */
	public toJSON(): ICursoredData<T> {
		return {
			list: this.list.map((item) => item.toJSON() as T),
			next: this.next,
			previous: this.previous,
		};
	}
}
