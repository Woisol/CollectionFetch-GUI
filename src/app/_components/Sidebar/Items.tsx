import { PathManagerContext } from "@/app/page";
import { Dir } from "@/utils/types";
import { Link } from "lucide-react";
import React, { useContext } from "react";

export type SectionChild = {
  dir: Dir[]
	icon?: React.ReactNode;
}
interface SectionProps {
  title: string;
  items: SectionChild[];
}
export default function Items({ title, items }: SectionProps) {
  const pathManager = useContext(PathManagerContext)
  return (
    <section className="w-full my-5 align-middle">
		  <h2>{title}</h2>
      <hr className="my-1" />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a className="text-gray-500 transition-colors" onClick={() => {
              pathManager.set(item.dir)
            }}>
              {item.icon ? React.cloneElement(item.icon as React.ReactElement, {
                className: "w-4 h-4 mr-1 inline-block align-middle"
              }) :
              <Link className="w-4 h-4 mr-1 inline-block align-middle"/>}
              {item.dir.map(dir => dir.name).join('/')}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}