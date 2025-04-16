import { Link } from "lucide-react";
import React from "react";

export type SectionChild = {
	content: string;
	url: string;
	icon?: React.ReactNode;
}
interface SectionProps {
  title: string;
  items: SectionChild[];
}
export default function Section({ title, items }: SectionProps) {
  return (
    <section className="w-full my-5 align-middle">
		  <h2>{title}</h2>
      <hr className="my-1" />
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.url} className="text-gray-500 transition-colors">
              {item.icon ? React.cloneElement(item.icon as React.ReactElement, {
                className: "w-4 h-4 mr-1 inline-block align-middle"
              }) :
              <Link className="w-4 h-4 mr-1 inline-block align-middle"/>}
              {item.content}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}