'use client'
import { PathManagerContext } from "@/app/page"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { pathManager } from "@/utils/usePathManager"
import { formatDate } from "@/utils/decode"
import { fetcher } from "@/utils/fetcher"
import { Autoindex_Raw, Indexes } from "@/utils/types"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, TableOptions, useReactTable } from '@tanstack/react-table'
import { useContext } from "react"

interface DataTableProps<TData, TValue> {
	data: Indexes,
	className?: string,
}

const defaultColumn: Partial<ColumnDef<Autoindex_Raw>> = {
	// 原代码中 `column.columnDef` 直接渲染会显示 [object Object]，不符合预期。通常我们需要显示列的 `accessorKey` 或者自定义的表头名称。
	// 假设我们希望显示 `accessorKey` 的首字母大写形式，以下是修改后的代码。
	header: ({ column }) => {
		// !逆天，报错不存在但是实际就是这么跑
		// @ts-expect-error 不存在属性
		const accessorKey = column.columnDef.accessorKey;
		const formattedHeader = accessorKey ? accessorKey.charAt(0).toUpperCase() + accessorKey.slice(1) : '';
		return <p className="text-lg font-bold ">{formattedHeader}</p>;
	},
	enableResizing: true,
	enableSorting: true,
	enableHiding: true,
	minSize: 60
}
const columns: ColumnDef<Autoindex_Raw, keyof Autoindex_Raw>[] = [
	{
		accessorKey: 'name',
		header: () => <p className="text-xl font-bold ">📄Name</p>,
		size: 200,
	},
	{
		accessorKey: 'size',
		header: () => <p className="text-xl font-bold ">🔣Size</p>,
		size: 30
	},
	{
		accessorKey: 'modifiedAt',
		header: () => <p className="text-xl font-bold ">⌚Modified At</p>,
		cell: ({ cell }) => formatDate(cell.getValue() as unknown as Date),
		size: 60
	}
]

export default function ExplorerTable<TData, TValue>({ data, className }: DataTableProps<TData, TValue>) {
	const pathManager = useContext(PathManagerContext)
	const table = useReactTable({
		data, columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn,
		getPaginationRowModel: getPaginationRowModel(),
		enableSorting: true,
		state: {
			pagination: {
				pageIndex: 0,
				pageSize: 10
			}
		},
	})
	return (
		// !在Table上border和overflow-hidden冲突()
		<div className={cn("w-full h-fit border-1 border-gray-300 overflow-hidden select-none", className)} >
			<Table >
				<TableHeader className="bg-background">
					{table.getHeaderGroups().map(headerGroup => {
						return (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header, _index) => {
									return (
										<TableHead key={header.id} className="relative select-none overflow-visible" style={{ width: header.column.getSize() }}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
											<div
												className="absolute right-0 top-0 h-full w-2 cursor-col-resize bg-blue-300 opacity-0 hover:opacity-100 transition-colors duration-200 active:bg-blue-500"
												onMouseDown={header.getResizeHandler()}
												onTouchStart={header.getResizeHandler()}
											/>
										</TableHead>
									)
								})}
							</TableRow>
						)
					})}
				</TableHeader>
				<TableBody>
					{table.getRowCount() ?
						table.getRowModel().rows.map(row => {
							return (
								<TableRow key={row.id} onClick={() => {
									row.original.href === '../' ?
										pathManager.prev() :
										pathManager.next(row.original.href.replace(/^\//, ''))
								}}>
									{row.getVisibleCells().map(cell => {
										return (
											<TableCell key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										)
									})}
								</TableRow>
							)
						}) : <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No Result</TableCell></TableRow>}
				</TableBody>
				<div className="mt-4 flex justify-center">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#" />
							</PaginationItem>
							{table.getPageCount()}
						</PaginationContent>
					</Pagination>
				</div>
			</Table>
		</div>
	)
}