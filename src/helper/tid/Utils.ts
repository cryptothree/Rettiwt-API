import axios, { AxiosRequestConfig } from 'axios';
import Jsdom from 'jsdom';

export async function handleXMigration(config: AxiosRequestConfig): Promise<Jsdom.JSDOM> {
	const migrationRedirectionRegex: RegExp = new RegExp(
		`(http(?:s)?://(?:www\.)?(twitter|x){1}\.com(/x)?/migrate([/?])?tok=[a-zA-Z0-9%\-_]+)+`,
	);

	let response = await axios.request({
		...config,
		method: 'GET',
		url: 'https://x.com',
	});

	let homePage: Jsdom.JSDOM = new Jsdom.JSDOM(response.data);

	const migrationUrl = homePage.window.document.querySelector(`meta[http-equiv='refresh']`);

	const migrationRedirectionUrl =
		migrationUrl?.getHTML().match(migrationRedirectionRegex)?.[0] ??
		String(response.data).match(migrationRedirectionRegex)?.[0];

	if (migrationRedirectionUrl) {
		response = await axios.request({
			...config,
			method: 'GET',
			url: migrationRedirectionUrl,
		});

		homePage = new Jsdom.JSDOM(response.data);
	}

	const migrationForm =
		homePage.window.document.querySelector(`form[name='f']`) ??
		homePage.window.document.querySelector(`form[action='https://x.com/x/migrate']`);

	if (migrationForm) {
		const url = migrationForm.getAttribute('action') ?? 'https://x.com/x/migrate';
		const method = migrationForm.getAttribute('method') ?? 'POST';
		let requestPayload: { [key: string]: string } = {};
		migrationForm.querySelectorAll('input').forEach((item) => {
			requestPayload[item.getAttribute('name') as string] = item.getAttribute('value') as string;
		});

		response = await axios.request({
			...config,
			method: method,
			url: url,
			data: requestPayload,
		});

		homePage = new Jsdom.JSDOM(response.data);
	}

	return homePage;
}

export function floatToHex(x: number): string | undefined {
	const result: string[] = [];
	let quotient = parseInt(String(x));
	let fraction = x - quotient;

	while (quotient > 0) {
		quotient = parseInt(String(x / 16));
		const remainder = parseInt(String(x - quotient * 16));

		if (remainder > 9) {
			result.splice(0, 0, String.fromCharCode(remainder + 55));
		} else {
			result.splice(0, 0, String(remainder));
		}

		x = quotient;
	}

	if (fraction == 0) {
		return result.join();
	}

	result.push('.');

	while (fraction > 0) {
		fraction = fraction * 16;
		const integer = parseInt(String(fraction));
		fraction = fraction - integer;

		if (integer > 9) {
			result.push(String.fromCharCode(integer + 55));
		} else {
			result.push(String(integer));
		}
	}

	return result.join();
}
