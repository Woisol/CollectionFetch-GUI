'use client'
import { PathManagerContext } from "@/app/page"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { pathManager } from "@/utils/usePathManager"
import { decodeFileType, formatDate } from "@/utils/decode"
import { fetcher } from "@/utils/fetcher"
import { Autoindex_Raw, Indexes } from "@/utils/types"
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, Row, TableOptions, useReactTable } from '@tanstack/react-table'
import { useContext, useState } from "react"
import { File, FileArchive, FolderClosed, Slash } from "lucide-react";

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
	minSize: 60,
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
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 20
	})
	const table = useReactTable({
		data, columns,
		getCoreRowModel: getCoreRowModel(),
		defaultColumn,
		getPaginationRowModel: getPaginationRowModel(),
		enableSorting: true,
		onPaginationChange: setPagination,
		state: {
			pagination,

			// !仅限于设置初始值……
			// pagination: {
			// 	pageIndex: 0,
			// 	pageSize: 20
			// }
		},
	})
	function handleRowClick(row: Row<Autoindex_Raw>) {
		row.original.href === '../' ?
			pathManager.prev() :
			pathManager.next({ name: row.original.name, href: row.original.href })
	}
	function PaginationPage({ index }: { index: number }) {
		return (
			<PaginationItem onClick={() => {
				table.setPageIndex(index)
				// console.log(table.getState().pagination.pageIndex)
			}}>
				<PaginationLink isActive={table.getState().pagination.pageIndex === index}>
					{index + 1}
				</PaginationLink>
			</PaginationItem>
		)
	}
	return (
		// !在Table上border和overflow-hidden冲突()
		<div className={cn("w-full h-[830px] max-h-[calc(100%-48px)] pb-4 border-1 border-gray-300 overflow-hidden select-none flex flex-col", className)} >
			<Table className="flex-1 relative" >
				{/* @todo sticky无法解决 */}
				<TableHeader className="bg-background sticky">
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
								<TableRow key={row.id} className={decodeFileType(row.original.href)} onClick={() => { handleRowClick(row) }}>
									{row.getVisibleCells().map(cell =>
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									)}
								</TableRow>
							)
						}) : <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">No Result</TableCell></TableRow>}
				</TableBody>
			</Table>
			{/* //dtodo 分页还没做呢…… */}
			{/* // ! 所以原来m-auto要flex上下文才能生效的？？？ */}
			<div className="block w-fit h-9 mt-auto mx-auto">
				<Pagination>
					<PaginationContent>
						<PaginationItem >
							<PaginationPrevious className={`${!table.getCanPreviousPage() && 'text-gray-300 hover:text-gray-400 cursor-not-allowed'}`} onClick={() => { if (!table.getCanPreviousPage()) return; table.previousPage() }} />
						</PaginationItem>
						{Array.from({ length: table.getPageCount() }).map((_, index) => <PaginationPage key={index} index={index} />)}
						<PaginationItem>
							<PaginationNext className={`${!table.getCanNextPage() && 'text-gray-300 hover:text-gray-400 cursor-not-allowed'}`} onClick={() => { if (!table.getCanNextPage()) return; table.nextPage() }} />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	)
}
