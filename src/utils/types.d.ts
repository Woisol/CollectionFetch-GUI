export type Autoindex_Raw = {
	name: string,
	href: string,
	size: string,
	modifiedAt?: Date,
}
export type Indexes = Autoindex_Raw[]

export type Path = string[]
export type PathColect = {
	cur: string,
	collect: string[]
	// subPath: Path[],
}
export type PathManager = {
	paths: PathColect[],
	indexes: Indexes
	_push: (newPath: string, autoindex: Autoindex_Raw[]) => void,
	next: (path: string) => void,
	prev: () => void,
}

export type Fetcher = {
	DEBUG_MODE: boolean,
	SERVER_URL: string,
	QUERY_METHOD: 'nginx' | 'server'
	permissionToken: string,
	fetchCollection: (path: Path) => Promise<Autoindex_Raw[]>,
}