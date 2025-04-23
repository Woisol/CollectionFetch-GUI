export type Autoindex_Raw = {
	name: string,
	href: string,
	size: string,
	modifiedAt?: Date,
}
export type Indexes = Autoindex_Raw[]

export type Path = string[]
export type Dir = {
	name: string,
	href: string
	// subPath: Path[],
}
export type PathManager = {
	paths: Dir[],
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
	fetchCollection: (path: Path, index_only?: boolean) => Promise<(Autoindex_Raw | Dir)[]>,
}