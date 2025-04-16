import { Breadcrumb as BreadcrumbShadcn, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Slash } from "lucide-react";

interface breadcrumbProps{
	paths: string[],
	dropdown: string[][]
}
export default function Breadcrumb( {paths,dropdown}:breadcrumbProps) {
	return (
		<BreadcrumbShadcn>
			<BreadcrumbList>
				{paths.map((path,index) =>
					<BreadcrumbItem key={index}>
						{dropdown.at(index) !== undefined ?
							<DropdownMenu>
								<DropdownMenuTrigger>
									{path}
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start">
									{dropdown.map((item,index) =>
										<DropdownMenuItem key={index}>
											{item}
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
								{index !== paths.length - 1 && <Sep/>}

						</DropdownMenu>
						:
							<span>{path}</span>
						}
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