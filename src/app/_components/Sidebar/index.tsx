import { Home } from "lucide-react";
import Section, { SectionChild } from "./Section";

// !通过本地文件定义？
const pinned : SectionChild[] = [
  {content: "Home", url: "/", icon: <Home/>},
  {content: "About", url: "/about", icon: ""},
  {content: "Contact", url: "/contact", icon: ""},
]
const recent: SectionChild[] = [
  {content: "Home", url: "/", icon: <Home/>},
  {content: "About", url: "/about", icon: ""},
  {content: "Contact", url: "/contact", icon: ""},
]

export default function Sidebar() {
  return (
    <div className="w-[200px] h-full p-3 bg-white rounded-2xl">
      <Section title="Pinned" items={pinned}/>
      <Section title="Recent" items={recent}/>
    </div>
  );
}