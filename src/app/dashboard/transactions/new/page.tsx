import { NewTransactionForm } from "@/components/transaction-form"
import getUserId from "@/utils/get-user"
import { fetchAllCategories } from "../actions"
import styles from "@/styles/form.module.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance App | New Transaction",
  description: "Create a new transaction.",
}

export default async function NewTransaction() {
  const userId = await getUserId()
  const categories = await fetchAllCategories(userId)
  return (
    <div className={styles.mainContainer}>
      <h1>New Transaction</h1>
      <NewTransactionForm userId={userId} categories={categories} />
    </div>
  )
}
