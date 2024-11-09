import TransactionsTable from "@/components/transactions-table"
import styles from "@/styles/transactions.module.css"
import { PlusIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance App | Transactions",
  description: "Transactions of the user.",
}

async function Transactions() {
  return (
    <div className={styles.mainContainer}>
      <h1>Transactions</h1>
      <div className={styles.btnContainer}>
        <Link href="/dashboard/transactions/new" className={styles.btn}>
          <PlusIcon className={styles.icon} />
          <span>Create New Transaction</span>
        </Link>
      </div>
      <TransactionsTable />
    </div>
  )
}

export default Transactions
