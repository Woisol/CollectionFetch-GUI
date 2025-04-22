export type Autoindex_Raw = {
	name: string,
	href: string,
	size: string,
	modifiedAt: Date,
}
export type Autoindex = {
	name: string,
	href: string,
	size: string,
	modifiedAt: string,
	children: Autoindex[]
}