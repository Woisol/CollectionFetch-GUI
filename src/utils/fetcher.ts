import { testHTML } from "./constant_test"
import { decodeAutoindex } from "./decode"
import { Autoindex_Raw, Fetcher, Path } from "./types"

export const testIndex: Autoindex_Raw[] = [
	{
		name: '../',
		href: '../',
		size: '-',
		modifiedAt: new Date()
	},
	{
		name: 'base',
		href: '/base',
		size: '20M',
		// !出现过完全不动却一直在更新数据的问题
		modifiedAt: new Date()
	},
	{
		name: 'Code',
		href: '/Code',
		size: '10M',
		modifiedAt: new Date(),
	},
	{
		name: 'Frontend',
		href: '/Frontend',
		size: '5M',
		modifiedAt: new Date(),
	}
]

export const fetcher: Fetcher = {
	DEBUG_MODE: false,
	SERVER_URL: 'http://woisol-pc:80',
	QUERY_METHOD: 'nginx',
	permissionToken: '',
	fetchCollection: async (path: Path) => {
		// @todo use testHTML instead
		if (fetcher.DEBUG_MODE) return decodeAutoindex(testHTML)
		let res
		switch (fetcher.QUERY_METHOD) {
			case 'nginx': res = await fetch(`${fetcher.SERVER_URL}/files/${path.join('/')}`, { mode: 'cors' }); break
			case 'server':
				res = await fetch(`${fetcher.SERVER_URL}/api/collect/`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ path: `/${path.join('/')}`, permissionToken: fetcher.permissionToken })
				})
				break
		}
		// @todo ？默认怎么是上面的cors？
		if (res.type === 'opaqueredirect') {
			window.location.href = res.url
			return []
		}
		return decodeAutoindex(await res.text())
	}

}