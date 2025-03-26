import { ELogActions } from '../../enums/Logging';

/**
 * Handles logging of data for debug purpose.
 *
 * @internal
 */
export class LogService {
	/** Whether logging is enabled or not. */
	public static enabled: boolean = false;

	/**
	 * Logs the given data.
	 *
	 * @param action - The action to be logged.
	 *
	 * @param data - The data to be logged.
	 */
	public static log(action: ELogActions, data: NonNullable<unknown>): void {
		// Proceed to log only if logging is enabled
		if (this.enabled) {
			// Preparing the log message
			const logPrefix: string = 'Rettiwt-API';
			const logTime: string = new Date().toISOString();
			const logAction: string = action;
			const logData: string = JSON.stringify(data);

			const logMessage: string = `[${logPrefix}] [${logTime}] [${logAction}] ${logData}`;

			// Logging
			console.log(logMessage);
		}
	}
}
