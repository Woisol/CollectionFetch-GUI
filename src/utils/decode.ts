import {JSDOM} from 'jsdom'
import { Autoindex_Raw, Dir, FileType } from './types'
const DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'
export function decodeAutoindex(html: string, index_only?: boolean): (Autoindex_Raw | Dir)[] {
	const res: (Autoindex_Raw | Dir)[] = []

	// @todo Error: Could not parse CSS stylesheet
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
	// !以/分隔但是保留/！
	// const dirs = dir.split(/(?<=\/)/g).filter((item) => item !== '/')
	const dirs = dir.split('/').filter((item) => item !== '')
	const res: Dir[] = []
	for (var i in dirs) {
		res.push({ name: dirs[i], href: encodeURIComponent(dirs[i]) + '/' })
	}
	return res
}

export function decodeFileType(name: string): FileType {
	if (name === '../') {
		return 'prev'
	} else if (/\/$/.test(name)) {
		return 'directory'
	} else if (/\.(zip|7z|bz2|gz|tar|tgz|tbz2|xz|cab)$/.test(name)) {
		return 'zip'
	} else if (/\.(py|js|php|pl|rb|sh|bash|lua|sql|go|rs|java|c|h|cpp|cxx|hpp)$/.test(name)) {
		return 'code'
	} else if (/\.(jpg|png|bmp|gif|ico|webp)$/.test(name)) {
		return 'media'
	} else if (/\.(flv|mp4|mkv|avi|mkv|vp9)$/.test(name)) {
		return 'video'
		// use startsWith instead
		// } else if (/^http/.test(name)) {
	} else if (name.startsWith('http')) {
		return 'url'
	} else {
		return 'file'
	}

}