import { useState } from "react";
import { fetcher } from "./fetcher";
import { PathManager, PathColect, Autoindex_Raw, Path } from "./types";

// !还是不习惯用class……只有一个实例应该还是对象更合适？
// export const pathManager: PathManager = {
// 	// !混乱……在对象中存储又会导致React不渲染……
// 	paths: [],
// 	indexes: [],
// 	_push(newPath, autoindex) {
// 		this.paths.push({ cur: newPath, collect: autoindex.map(item => item.name) })
// 		this.indexes = autoindex
// 	},
// 	next(path: string) {
// 		fetcher.fetchCollection([...this.paths.map(path => path.cur), path]).then((res) => {
// 			// !所以说你还是没有想清楚……
// 			this._push(path, res)
// 		})
// 	},
// 	prev() {
// 		this.paths.pop()
// 	}
// }

// export const  AutoIndexManager ={
// 	pathManager = pathManager;
// 	fetcher = new Fetcher();
// }
// export const autoIndexManager = new AutoIndexManager();

export default function usePathManager() {
	// @todo 完善从localStorage初始化逻辑
	let [pathColect, setPathColect] = useState<PathColect[]>([])
	const [indexes, setIndexes] = useState<Autoindex_Raw[]>([])
	const _push = (newPath: string, autoindex: Autoindex_Raw[]) => {
		setPathColect([...pathColect, { cur: newPath, collect: indexes.map(item => item.name) }])
		setIndexes(autoindex)
	}
	const next = (path: string) => {
		fetcher.fetchCollection([...pathColect.map(path => path.cur), path]).then((res) => {
			_push(path, res)
		})
	}
	const prev = () => {
		setPathColect(pathColect.slice(0, -1))
		fetcher.fetchCollection(pathColect.slice(0, -1).map(path => path.cur)).then((res) => {
			setIndexes(res)
		})
	}
	const set = (paths: Path) => {
		pathColect = paths.slice(0, -1).map((path, index) => { return { cur: path, collect: pathColect?.[index].cur === path ? pathColect?.[index].collect : [] } })
		fetcher.fetchCollection(paths).then((res) => {
			setPathColect([...pathColect, { cur: paths[paths.length - 1], collect: res.map(item => item.name) }])
			setIndexes(res)
		})
	}
	return { pathColect, indexes, _push, next, prev, set }
}