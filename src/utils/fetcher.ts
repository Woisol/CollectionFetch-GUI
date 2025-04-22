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
	SERVER_URL: 'http://localhost:3000',
	DEBUG_MODE: true,
	permissionToken: '',
	fetchCollection: async (path: Path) => {
		// @todo use testHTML instead
		if (fetcher.DEBUG_MODE) return testIndex
		const res = await fetch(`${fetcher.SERVER_URL}/api/collection`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ path: `/${path.join('/')}`, permissionToken: fetcher.permissionToken })
		})
		return decodeAutoindex(await res.text())
	}

}