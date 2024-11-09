import { EditTransactionForm } from "@/components/transaction-form"
import { fetchAllCategories } from "../../actions"
import { fetchTransaction } from "./actions"
import getUserId from "@/utils/get-user"
import Transactions from "@/types/transactions"
import styles from "@/styles/form.module.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance App | Edit Transaction",
  description: "Edit transaction.",
}

type Category = {
  name: string
  id: string
}

export default async function EditPage({
  params,
}: {
  params: { transactionId: string }
}) {
  const userId = await getUserId()
  const data: [Transactions[] | { message: string }, Category[]] =
    await Promise.all([
      fetchTransaction(params.transactionId),
      fetchAllCategories(userId),
    ])

  const transactionData = data[0]
  const categories = data[1]

  if ("message" in transactionData) {
    console.error(transactionData.message)
    return <div>Error: {transactionData.message}</div>
  }

  console.log(data)
  return (
    <div className={styles.mainContainer}>
      <h1>Edit Transaction</h1>
      <EditTransactionForm
        transaction={transactionData[0]}
        categories={categories}
      />
    </div>
  )
}
