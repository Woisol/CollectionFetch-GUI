import { PathManagerContext } from "@/app/page";
import { Breadcrumb as BreadcrumbShadcn, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Dir } from "@/utils/types";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Slash } from "lucide-react";
import { useContext, useState } from "react";

interface breadcrumbProps{
	paths: Dir[],
	className?: string,
}
export default function Breadcrumb({ paths, className }: breadcrumbProps) {
	const pathManager = useContext(PathManagerContext)
	const [dropdown, setDropdown] = useState<Dir[]>([])
	return (
		<BreadcrumbShadcn className={cn('select-none', className)} >
			<BreadcrumbList>
				{paths.map((path, index_path) =>
					<BreadcrumbItem key={index_path}>
						{/* <></> */}
						{/* {dropdown?.[index_path] && dropdown?.[index_path].length > 0 ? */}
						<DropdownMenu>
							<DropdownMenuTrigger className="px-2 py-0.5 rounded-full btn-primary btn-scale">
								{path.name}
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{dropdown.map((item, index_dropdown) =>
									<DropdownMenuItem key={index_dropdown} onClick={() => {
										pathManager.set([...paths.slice(0, index_path), item])
									}}>
										{item.name}
									</DropdownMenuItem>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
						{/* :<span className="px-2 py-0.5 rounded-full text-foreground border-2 border-primary btn-scale">{path}</span> */}
						{/* // } */}
						{index_path !== paths.length - 1 && <Sep />}
					</BreadcrumbItem>)}
			</BreadcrumbList>
		</BreadcrumbShadcn>

	)
}
function Sep() {
	return (
		<BreadcrumbSeparator>
			<Slash/>
		</BreadcrumbSeparator>
	)
}