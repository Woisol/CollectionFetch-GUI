import {JSDOM} from 'jsdom'
import { Autoindex_Data } from './types'
const DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'
export function decodeAutoindex(html: string): Autoindex_Data[] {
	const res: Autoindex_Data[] = []

	const dom = new JSDOM(html)
	const bodylines = dom.window.document.body.innerHTML.split('\n')
	dom.window.document.body.innerHTML = ''
	for (var i in bodylines) {
		const m = /\s*<a href="(.+?)">(.+?)<\/a>\s+(\S+)\s+(\S+)\s+(\S+)\s*/.exec(bodylines[i])
		if (m) {
			const href :string = m[0]
			const name :string = m[1]
			const size: string = m[5]
			const _parse = new Date(m[3] + ' ' + m[4])
			const modifiedAt: Date = _parse === undefined? new Date(0):_parse // 解析错误则1970/1/1 00:00:00
			res.push({ name,href, modifiedAt,size})
		}
	}
}

export function formatDate(date: Date, DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S') {
		const pad = function (s:number) { return s < 10 ? '0' + s : s }
		const mon = function (m:number) { return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m] }
		return DATETIME_FORMAT
			.replace('%Y', date.getFullYear().toString())
			.replace('%m', pad(date.getMonth() + 1))
			.replace('%d', pad(date.getDate()))
			.replace('%H', pad(date.getHours()))
			.replace('%M', pad(date.getMinutes()))
			.replace('%S', pad(date.getSeconds()))
			.replace('%b', mon(date.getMonth()))
}