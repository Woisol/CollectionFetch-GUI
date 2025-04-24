'use client'
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Explorer from "./_components/Explorer";
import { useEffect, createContext } from "react";

import usePathManager from "@/utils/usePathManager";
import { Dir, Autoindex_Raw } from "@/utils/types";

// export const PathManagerContext = createContext<PathColect>([])
// @ts-expect-erro empty now
// type testContext = { name: string }
// export const testContext = createContext({})
// export const testContext = createContext<{ name: string }>({})
// export const testContext = createContext<{ name: string }>({ name: '1' })
// export const testContext = createContext<testContext>({ name: '1' })
// export const testContext = createContext({ name: '1' })
// export const testContext = createContext({ name: '1' } as React.Context<{ name: string }>)//const
// ！使用返回值作为类型！
interface PathManagerContext {
  dir: Dir[],
  indexes: Autoindex_Raw[],
  _push: (newDir: Dir, autoindex: Autoindex_Raw[]) => void,
  next: (path: Dir) => void, prev: () => void,
  set: (dirs: Dir[]) => void
}
// export const PathManagerContext = createContext<Partial<ReturnType<typeof usePathManager>>>({ dir: [], indexes: [], _push: () => { }, next: () => { }, prev: () => { }, set: () => { } })// | object
// export const PathManagerContext = createContext<Partial<{ dir: Dir[], indexes: Autoindex_Raw[], _push: (newDir: Dir, autoindex: Autoindex_Raw[]) => void, next: (path: Dir) => void, prev: () => void, set: (dirs: Dir[]) => void }>>({})// | object
// export const PathManagerContext = createContext<{dir: Dir[],indexes: Autoindex_Raw[],_push: (newDir: Dir, autoindex: Autoindex_Raw[]) => void,next: (path: Dir) => void, prev: () => void,set: (dirs: Dir[]) => void
export const PathManagerContext = createContext<PathManagerContext>({
  dir: [],
  indexes: [],
  _push: () => { },
  next: () => { },
  prev: () => { },
  set: () => { }
})// | object
export default function Home() {
  const pathManager = usePathManager()
  useEffect(() => {
    // const { next } = pathManager
    // next()
    pathManager.set([
      { name: 'Home', href: '' },
    ])
  }, [])
  return (
    <main className="">
      <Header />
      <div className="h-content p-5 bg-background flex gap-5">
        <PathManagerContext.Provider value={pathManager}>
          <Sidebar />
          <Explorer />
        </PathManagerContext.Provider>
      </div>
    </main>
  );
}
