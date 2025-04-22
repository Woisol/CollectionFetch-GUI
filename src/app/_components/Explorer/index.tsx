import { Autoindex_Raw } from "@/utils/types";
import Breadcrumb from "./Breadcrumb";
import ExplorerTable from "./Table";

export default function Explorer() {
	const testIndex: Autoindex_Raw[] = [
		{
			name: 'base',
			href: '/base',
			size: '20M',
			// !出现过完全不动却一直在更新数据的问题
			modifiedAt: new Date()
		},
		{
			name: 'Code',
			href: '/base/Code',
			size: '10M',
			modifiedAt: new Date(),
		}
	]

	return (
		<div className="size-full bg-white rounded-2xl overflow-hidden">
			<Breadcrumb className="p-3 bg-primary" paths={['base', 'Code', 'FrontEnd']} dropdown={[['Code', 'System'], ['FrontEnd', 'Java', 'Go']]} />
			<ExplorerTable data={testIndex} className={"mt2"} />
		</div>
	);
}