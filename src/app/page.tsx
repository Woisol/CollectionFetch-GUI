'use client'
import Image from "next/image";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import Explorer from "./_components/Explorer";
import { useContext, useEffect } from "react";
import { createContext } from "react";
import { Path, Dir, PathManager } from "@/utils/types";
import path from "path";
import usePathManager from "@/utils/usePathManager";

// export const PathManagerContext = createContext<PathColect>([])
// @ts-expect-error empty now
// ！使用返回值作为类型！
export const PathManagerContext = createContext<ReturnType<typeof usePathManager>>({})// | object
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
