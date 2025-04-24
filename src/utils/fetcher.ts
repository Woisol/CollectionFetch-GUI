import { toast } from "sonner"
import { testHTML } from "./constant_test"
import { decodeAutoindex, decodeAutoindex_IndexOnly } from "./decode"
import { Autoindex_Raw, Fetcher, Path } from "./types"

export const fetcher: Fetcher = {
	DEBUG_MODE: false,
	SERVER_URL: 'http://woisol-pc',
	QUERY_METHOD: 'nginx',
	permissionToken: '',
	fetchCollection: async (path, index_only) => {
		// @todo use testHTML instead
		if (fetcher.DEBUG_MODE) return decodeAutoindex(testHTML)
		const isURL = path[path.length - 1].startsWith('http')
		const isDir = path.length === 0 || path[path.length - 1].endsWith('/') || path[path.length - 1] === ''
		if (isURL) { window.open(path[path.length - 1]); return; }
		if (!isDir) { window.open(`${fetcher.SERVER_URL}/files/${path.join('/')}`); return; }
		let res
		switch (fetcher.QUERY_METHOD) {
			case 'nginx': res = await fetch(`${fetcher.SERVER_URL}/files/${path.join('/')}`, { mode: 'cors' })
				.catch(() => { toast.error(`Network Error：\n无法获取路径${path.join('/')}的数据`, {}) }); break
			case 'server':
				res = await fetch(`${fetcher.SERVER_URL}/api/collect/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ path: `/${path.join('/')}`, permissionToken: fetcher.permissionToken })
				})
				break
		}
		// @todo ？默认怎么是上面的cors？
		// if (res.type === 'opaqueredirect') {
		// 	window.location.href = res.url
		// 	return []
		// }
		return decodeAutoindex(await res!.text(), index_only)
	},
	fetchFile: async (path) => {
		const res = await fetch(`${fetcher.SERVER_URL}/files/${path.join('/')}`, { mode: 'cors' })
			.catch(() => { toast.error(`Network Error：\n无法获取路径${path.join('/')}的数据`, {}) })
		return await res?.text() ?? 'Failed to Fetch' + path.join('/')
	}

}