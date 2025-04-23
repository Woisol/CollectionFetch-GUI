import { useState } from "react";
import { fetcher } from "./fetcher";
import { PathManager, Dir, Autoindex_Raw, Path } from "./types";

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
	let [dir, setDir] = useState<Dir[]>([])
	const [indexes, setIndexes] = useState<Autoindex_Raw[]>([])
	const _push = (newDir: Dir, autoindex: Autoindex_Raw[]) => {
		setDir([...dir, newDir])
		setIndexes(autoindex)
	}
	const next = (path: Dir) => {
		fetcher.fetchCollection([...dir.map(path => path.href), path.href]).then((res) => {
			_push(path, res as Autoindex_Raw[])
		})
	}
	const prev = () => {
		setDir(dir.slice(0, -1))
		fetcher.fetchCollection(dir.slice(0, -1).map(path => path.href)).then((res) => {
			setIndexes(res as Autoindex_Raw[])
		})
	}
	const set = (dirs: Dir[]) => {
		fetcher.fetchCollection(dirs.map(path => path.href)).then((res) => {
			setDir(dirs)
			setIndexes(res as Autoindex_Raw[])
		})
	}
	return { dir, indexes, _push, next, prev, set }
}