'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/utils/decode"
import { Autoindex_Raw } from "@/utils/types"
import {ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, TableOptions, useReactTable } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const _columns: ColumnDef<Autoindex_Raw, keyof Autoindex_Raw>[] = [
	{
		accessorKey: 'name',
		header: ()=> <p className="text-xl font-bold ">Name</p>,
		size: 300,
		enableColumnFilter: true,
		enableSorting: true,
		enableResizing: true,
		enableGrouping: true
	},
	{
		accessorKey: 'size',
		header: ()=> <p className="text-xl font-bold ">Size</p>,
	},
	{
		accessorKey: 'modifiedAt',
		header: () => <p className="text-xl font-bold ">Modified At</p>,
		cell: ({ cell }) => formatDate(cell.getValue() as unknown as Date)
	}
]

export default function ExplorerTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {
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
	const table = useReactTable({
		data: testIndex,
		columns: _columns,
		getCoreRowModel: getCoreRowModel(),
		// getPaginationRowModel: getPaginationRowModel()
	})
	return (
			<Table className="size-full rounded-default border-2 border-background overflow-hidden">
				<TableHeader className="bg-primary">
					{table.getHeaderGroups().map(headerGroup => {
						return (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header,index) => {
									return (
										<TableHead key={header.id}  style={{width: header.column.getSize()}}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
								<TableRow key={row.id}>
									{row.getVisibleCells().map(cell => {
										return (
											<TableHead key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableHead>
										)
									})}
								</TableRow>
							)
					}):<TableRow><TableCell colSpan={_columns.length} className="h-24 text-center">No Result</TableCell></TableRow>}
				</TableBody>
			</Table>
	)
}