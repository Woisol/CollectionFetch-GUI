import { PathManagerContext } from "@/app/page";
import { Breadcrumb as BreadcrumbShadcn, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { fetcher } from "@/utils/fetcher";
import { Dir } from "@/utils/types";
import { useContext, useState } from "react";

interface BreadcrumbProps {
	paths: Dir[],
	className?: string,
}
// !Readonly from sonarqube
export default function Breadcrumb({ paths, className }: Readonly<BreadcrumbProps>) {
	const pathManager = useContext(PathManagerContext)
	const [dropdown, setDropdown] = useState<Dir[]>([])
	function handleDirFetch(paths: Dir[]) {
		fetcher.fetchCollection(paths.slice(0, -1).map(path => path.href), true).then((dirs) => {
			setDropdown(dirs!.filter(dir => dir.href !== '../' && dir.href !== paths[paths.length - 1].href))
		})
	}
	return (
		<BreadcrumbShadcn className={cn('w-full h-12 select-none overflow-x-auto overflow-y-hidden', className)} onWheel={(event) => { event.preventDefault(); event.currentTarget.scrollLeft += event.deltaY }}>
			{/* @todo 文本编辑？ */}
			<BreadcrumbList className="gap-1 sm:gap-1 flex-nowrap">
				{paths.map((path, index_path) =>
					// @todo 维护一下Home的问题……
					<BreadcrumbItem key={index_path} className="gap-1">
						{/* <></> */}
						{/* {dropdown?.[index_path] && dropdown?.[index_path].length > 0 ? */}
						<HoverCard openDelay={100}>
							<HoverCardTrigger className="h-6 px-2 rounded-full btn-primary btn-offset"
								onClick={() => { pathManager.set(paths.slice(0, index_path + 1)) }}
								// @todo 补丁……考虑优化
								onMouseEnter={() => { if (paths[index_path].href === '') { setDropdown([]); return; } handleDirFetch(paths.slice(0, index_path + 1)) }}
							// onMouseLeave={() => { setDropdown([]) }}
							>
								{path.name.replaceAll('/', '')}
							</HoverCardTrigger>
							{dropdown.length > 0 &&
							// @todo 容易出现不同切换的串台问题……
								<HoverCardContent align="start" className="max-h-[min(80vh,400px)] overflow-y-auto">
									{dropdown.map((item, index_dropdown) =>
										<button key={index_dropdown} className="block px-1 py-0.5 rounded-default hover:text-primary-dark! transition-colors" onClick={() => {
											const newPaths = [...paths.slice(0, index_path), item]
											pathManager.set(newPaths)
											handleDirFetch(newPaths)
										}}>
											{item.name.replaceAll('/', '')}
										</button>
									)}
								</HoverCardContent>
							}
						</HoverCard>
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
			/
		</BreadcrumbSeparator>
	)
}