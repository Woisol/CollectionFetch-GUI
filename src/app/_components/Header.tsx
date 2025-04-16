import { WEBSITE_TITLE } from "@/utils/constant";
import { Ellipsis, Moon, Search } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    // !wok这个@theme inline！！！
    <header className="h-header p-[8px] bg-primary-light flex items-center">
      <Image
        src="/img/avatar/user.svg"
        alt="avatar"
        width={32}
        height={32}
        priority/>
      <h1 className="">{WEBSITE_TITLE}</h1>
      <search className="group w-[200px] hover:w-md focus-within::w-md relative mx-auto bg-background/75 hover:bg-white focus-within::bg-white rounded-full transition-[width,opacity,background-color] duration-300">
          <input
            type="search"
            placeholder="搜索收藏..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        <button
          title="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Search/>
          </button>
      </search>
      <div className="ml-aut flex gap-1">
        <button title="Dark Mode" className="size-8"><Moon className="size-full"/></button>
        <button title="More" className="size-8"><Ellipsis className="size-full"/></button>
      </div>
    </header>
  );
}