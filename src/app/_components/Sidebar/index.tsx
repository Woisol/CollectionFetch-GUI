import { Home } from "lucide-react";
import Items, { SectionChild } from "./Items";
import Section from "./Section";
import { decodeDir } from "@/utils/decode";

// !通过本地文件定义？
const pinned : SectionChild[] = [
  { dir: [{ name: "Home", href: "" }], icon: <Home /> },
  { dir: decodeDir('/System/'), icon: "" },
  { dir: decodeDir('/Data'), icon: "" },
]
const recent: SectionChild[] = [
  { dir: [{ name: "Home", href: "" }], icon: <Home /> },
  { dir: decodeDir('/System/'), icon: "" },
  { dir: decodeDir('/Data'), icon: "" },
]
const recommend: SectionChild[] = [
  { dir: [{ name: "Home", href: "" }], icon: <Home /> },
  { dir: decodeDir('/System/'), icon: "" },
  { dir: decodeDir('/Data'), icon: "" },
]

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-5">
      <Section className="h-[300px]">
        <Items title="Pinned" items={pinned}/>
        <Items title="Recent" items={recent}/>
      </Section>
      <Section className="flex-1">
        <Items title="随便看看" items={recommend}/>
      </Section>
    </div>
  );
}