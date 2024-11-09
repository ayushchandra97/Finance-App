"use client"
import styles from "@/styles/table.module.css"
import {
  deleteTransaction,
  fetchAllTransactions,
} from "@/app/dashboard/transactions/actions"
import Transactions from "@/types/transactions"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/16/solid"
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowData,
  useReactTable,
} from "@tanstack/react-table"
import Link from "next/link"
import { useEffect, useState } from "react"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select"
  }
}

export default function TransactionsTable() {
  async function handleDelete(id: string) {
    try {
      await deleteTransaction(id)
      fetchData()
    } catch (error) {
      console.error("Error deleting transaction:", error)
    }
  }

  async function fetchData() {
    const response = await fetchAllTransactions()
    setData(response)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const columnHelper = createColumnHelper<Transactions>()

  const columns = [
    columnHelper.accessor("category", {
      header: () => "Category",
      cell: (info) => info.renderValue(),
      meta: {
        filterVariant: "select",
      },
    }),
    columnHelper.accessor("amount", {
      header: () => "Amount (in Rupees)",
      cell: (info) => info.renderValue(),
      meta: {
        filterVariant: "range",
      },
    }),
    columnHelper.accessor("type", {
      header: () => "Type",
      cell: (info) => (
        <div
          className={`${styles.type} ${
            info.row.original.type === "Income"
              ? styles.income
              : styles.expenses
          }`}
        >
          {info.row.original.type === "Income" ? (
            <ArrowUpCircleIcon className={styles.icon} />
          ) : (
            <ArrowDownCircleIcon className={styles.icon} />
          )}
          <span>{info.renderValue()}</span>
        </div>
      ),

      meta: {
        filterVariant: "select",
      },
    }),
    columnHelper.accessor("description", {
      header: () => "Description",
      cell: (info) => info.renderValue() || "-",
    }),
    columnHelper.accessor("date", {
      header: () => "Date",
      cell: (info) => info.renderValue()?.split("T")[0],
      meta: {
        filterVariant: "range",
      },
    }),
    columnHelper.display({
      id: "edit",
      header: () => "Edit",
      cell: ({ row }) => {
        return (
          <Link
            href={`/dashboard/transactions/edit/${row.original.id}`}
            className={`${styles.btn} ${styles.editBtn}`}
          >
            Edit
          </Link>
        )
      },
      enableSorting: false,
      enableColumnFilter: false,
    }),
    columnHelper.display({
      id: "delete",
      header: () => "Delete",
      cell: ({ row }) => (
        <button
          className={`${styles.btn} ${styles.delBtn}`}
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      ),
      enableSorting: false,
      enableColumnFilter: false,
    }),
  ]
  const [data, setData] = useState<Transactions[]>([])
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
  })

  console.log(data)
  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.tb}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                    className={styles.tb_header}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            style: header.column.getCanSort()
                              ? { ...{ cursor: "pointer" } }
                              : {},
                            onClick: header.column.getToggleSortingHandler(),
                            className: styles.hcol,
                          }}
                        >
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          <div>
                            {{
                              asc: <ChevronUpIcon className={styles.icon} />,
                              desc: <ChevronDownIcon className={styles.icon} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </div>
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `${styles.resizer} ${
                              header.column.getIsResizing()
                                ? styles.isResizing
                                : ""
                            }
                          `,
                          }}
                        />
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={styles.cell}
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.paginationContainer}>
        <div>
          <button
            className={styles.pageBtn}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className={styles.pageBtn}
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <div>
          <span>Page </span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>
        {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
      </div>
    </div>
  )
}
