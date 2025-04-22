import { Autoindex_Data } from "@/utils/types";
import Breadcrumb from "./Breadcrumb";
import ExplorerTable from "./Table";
import { useContext } from "react";
import { PathManagerContext } from "@/app/page";
import { testIndex } from "@/utils/fetcher";
import usePathManager from "@/utils/usePathManager";

export default function Explorer() {
	const pathManager = useContext(PathManagerContext)
	return (
		<div className="size-full p-3 bg-white rounded-2xl overflow-hidden">
			<Breadcrumb className="p-3 bg-" paths={pathManager.paths.map(paths => paths.cur)} dropdown={pathManager.paths.map(paths => paths.collect)} />
			<ExplorerTable data={pathManager.indexes} className={"mt2 rounded-default"} />
		</div>
	);
}