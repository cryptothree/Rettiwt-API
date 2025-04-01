import { Command, createCommand } from 'commander';

import { output } from '../helper/CliUtils';
import { Rettiwt } from '../Rettiwt';

/**
 * Creates a new 'auth' command which uses the given Rettiwt instance.
 *
 * @param rettiwt - The Rettiwt instance to use.
 * @returns The created 'auth' command.
 */
function createAuthCommand(rettiwt: Rettiwt): Command {
	// Creating the 'auth' command
	const auth = createCommand('auth').description('Manage authentication');

	// Guest
	auth.command('guest')
		.description('Generate a new guest key')
		.action(async () => {
			try {
				const guestKey: string = (await rettiwt.auth.guest()).guestToken ?? '';
				output(guestKey);
			} catch (error) {
				output(error);
			}
		});

	return auth;
}

export default createAuthCommand;
