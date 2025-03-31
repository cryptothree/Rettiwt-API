import { IAccountCredential } from '../../types/auth/AccountCredential';

/**
 * The credentials of the Twitter account to be logged into.
 */
export class AccountCredential implements IAccountCredential {
	public email: string;
	public password: string;
	public userName: string;

	/**
	 * @param cred - The credentials to the Twitter account.
	 */
	public constructor(cred: IAccountCredential) {
		this.email = cred.email;
		this.userName = cred.userName;
		this.password = cred.password;
	}
}
