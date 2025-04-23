import {JSDOM} from 'jsdom'
import { Autoindex_Raw, Dir } from './types'
const DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'
export function decodeAutoindex(html: string, index_only?: boolean): (Autoindex_Raw | Dir)[] {
	const res: (Autoindex_Raw | Dir)[] = []

	const dom = new JSDOM(html)
	const bodylines = dom.window.document.body.innerHTML.split('\n')
	for (var i in bodylines) {
		if (bodylines[i].search(/<script>/) !== -1)
			break
		if (index_only) {
			const m = /\s*<a href="(.+?\/)">(.+?\/)<\/a>/.exec(bodylines[i])
			if (m) {
				const href: string = m[1]
				const name: string = m[2]
				res.push({ name, href })
			}
		} else {
			const m = /\s*<a href="(.+?)">(.+?)<\/a>\s*(\S+)\s+(\S+)\s+(\S+)\s*/.exec(bodylines[i])
			if (m) {
				const href: string = m[1]
				const name: string = m[2]
				const size: string = m[5]
				const _parse = new Date(m[3] + ' ' + m[4])
				const modifiedAt: Date = _parse === undefined ? new Date(0) : _parse // 解析错误则1970/1/1 00:00:00
				res.push({ name, href, modifiedAt, size })
			} else {
				const m = /\s*<a href="(.+?)">(.+?)<\/a>/.exec(bodylines[i])
				if (m) {
					const href: string = m[1]
					const name: string = m[2]
					res.push({ name, href, size: '' })
				}
			}
		}
	}
	return res
}
export function formatDate(date?: Date, DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S') {
	if (date === undefined) return ''
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
export function decodeDir(dir: string): Dir[] {
	const dirs = dir.split('/').filter((item) => item !== '')
	const res: Dir[] = []
	for (var i in dirs) {
		res.push({ name: dirs[i], href: encodeURIComponent(dirs[i]) })
	}
	return res
}