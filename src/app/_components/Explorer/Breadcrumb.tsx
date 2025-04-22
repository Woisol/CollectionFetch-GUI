import { Breadcrumb as BreadcrumbShadcn, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Slash } from "lucide-react";

interface breadcrumbProps{
	paths: string[],
	dropdown: string[][],
	className?: string,
}
export default function Breadcrumb( {paths,dropdown,className}:breadcrumbProps) {
	return (
		<BreadcrumbShadcn className={cn('select-none', className)} >
			<BreadcrumbList>
				{paths.map((path,index) =>
					<BreadcrumbItem key={index}>
						{/* <></> */}
						{dropdown.at(index) !== undefined && dropdown.at(index)!.length > 0 ?
							<DropdownMenu>
								<DropdownMenuTrigger className="px-2 py-0.5 rounded-full btn-primary btn-scale">
									{path}
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									{dropdown[index].map((item, index) =>
										<DropdownMenuItem key={index}>
											{item}
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>

							</DropdownMenu> :
							<span className="px-2 py-0.5 rounded-full text-foreground border-2 border-primary btn-scale">{path}</span>
						}
						{index !== paths.length - 1 && <Sep />}
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