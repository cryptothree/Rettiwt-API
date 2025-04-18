import axios from 'axios';
import * as htmlParser from 'node-html-parser';

import { ELogActions } from '../../enums/Logging';

import { calculateClientTransactionIdHeader, IGenerateTransactionIdParams } from '../../helper/TidUtils';

import { TidProvider } from '../../types/auth/TidProvider';

import { LogService } from './LogService';


const cdnUrl = 'https://abs.twimg.com/responsive-web/client-web'
const initialRequestHeaders = {
	"Authority": "x.com",
	"Accept-Language": "en-US,en;q=0.9",
	"Cache-Control": "no-cache",
	"Referer": "https://x.com",
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
	"X-Twitter-Active-User": "yes",
	"X-Twitter-Client-Language": "en"
}

type DynamicArgs = Pick<IGenerateTransactionIdParams, 'verificationKey' | 'frames' | 'indices'>

export class TransactionIdService implements TidProvider {
	private _dynamicArgs?: DynamicArgs

	private async getDynamicArgs(): Promise<DynamicArgs> {
		const html = await this.getHomepageHtml()

		const root = htmlParser.parse(html)
		const keyElement = root.querySelector("[name='twitter-site-verification']")
		const frameElements = root.querySelectorAll("[id^='loading-x-anim']")

		return {
			verificationKey: keyElement?.getAttribute('content') ?? '',
			frames: frameElements.map((el) => this.parseFrameElement(el)),
			indices: await this.getKeyBytesIndices(html),
		}
	}

	private async getHomepageHtml(): Promise<string> {
		const response = await axios.get<string>('https://x.com', { headers: initialRequestHeaders })
		return response.data
	}

	private async getKeyBytesIndices(html: string): Promise<number[]> {
		const ondemandFileMatch = html.match(/ondemand\.s":"([^"]+)"/)
		if (!ondemandFileMatch || !ondemandFileMatch[1]) {
			LogService.log(ELogActions.WARNING, {message: 'ondemand.s file not found'})
			return [0, 0, 0, 0]
		}

		const onDemandFileHash = ondemandFileMatch ? ondemandFileMatch[1] : ''
		const response = await axios.get<string>(`${cdnUrl}/ondemand.s.${onDemandFileHash}a.js`)
		const match = response.data.matchAll(/(\(\w\[(\d{1,2})],\s*16\))+?/gm)
		return Array.from(match).map(m => Number(m[2]))
	}

	private parseFrameElement(element: htmlParser.HTMLElement): number[][] {
		const pathElement = element.children[0].children[1]
		const value = pathElement.getAttribute('d')
		if (!value) {
			return [[]]
		}

		const rawFrames = value.substring(9).split('C')
		return rawFrames
			.map((str) => str.replaceAll(/\D+/g, ' ').trim().split(' '))
			.map((arr) => arr.map(Number))
	}

	public async generate(method: string, path: string): Promise<string> {
		if (!this._dynamicArgs) {
			this._dynamicArgs = await this.getDynamicArgs()
		}

		const {verificationKey, frames, indices} = this._dynamicArgs
		return calculateClientTransactionIdHeader({
			keyword: 'obfiowerehiring',
			method: method,
			path: path,
			verificationKey: verificationKey,
			frames: frames,
			indices: indices,
			extraByte: 3,
		})
	}

	public async refreshDynamicArgs(): Promise<void> {
		this._dynamicArgs = await this.getDynamicArgs()
	}
}