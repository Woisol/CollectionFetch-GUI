import { Home } from "lucide-react";
import Items, { SectionChild } from "./Items";
import Section from "./Section";

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
const recommend: SectionChild[] = [
  {content: "Home", url: "/", icon: <Home/>},
  {content: "About", url: "/about", icon: ""},
  {content: "Contact", url: "/contact", icon: ""},
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