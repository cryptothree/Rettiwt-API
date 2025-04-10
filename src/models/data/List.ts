import { IList } from '../../types/data/List';
import { IList as IRawList } from '../../types/raw/base/List';

/**
 * The details of a single Twitter List.
 *
 * @public
 */
export class List implements IList {
	public createdAt: string;
	public createdBy: string;
	public description?: string;
	public id: string;
	public memberCount: number;
	public name: string;
	public subscriberCount: number;

	/**
	 * @param list - The raw list details.
	 */
	public constructor(list: IRawList) {
		this.id = list.id_str;
		this.name = list.name;
		this.createdAt = new Date(list.created_at).toISOString();
		this.description = list.description.length ? list.description : undefined;
		this.memberCount = list.member_count;
		this.subscriberCount = list.subscriber_count;
		this.createdBy = list.user_results.result.id;
	}
}
