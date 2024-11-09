import { fetchAllTransactions } from "@/app/dashboard/transactions/actions"

export type ChartType = {
  category: string | null
  amount: number
  type: "Income" | "Expenses"
}

export type PieChartType = {
  category: string | null
  Income: number | null
  Expenses: number | null
}

export async function fetchData() {
  try {
    const transactions = await fetchAllTransactions()
    console.log("Fetched transactions:", transactions)

    // Aggregate data by category and type
    const aggregatedData = transactions.reduce((acc, transaction) => {
      const { category, type, amount } = transaction

      // Find existing entry for the category
      const existing = acc.find(
        (item) => item.category === category && item.type === type
      )

      if (existing) {
        // If it exists, add to the existing amount
        existing.amount += amount
      } else {
        // Otherwise, create a new entry for the category and type
        acc.push({
          category,
          amount,
          type,
        })
      }

      return acc
    }, [] as ChartType[])

    return aggregatedData as ChartType[]
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
export async function pieChartData() {
  try {
    const transactions = await fetchAllTransactions()
    console.log("Fetched transactions:", transactions)

    // Aggregate data by category and type
    const aggregatedData = transactions.reduce((acc, transaction) => {
      const { category, type, amount } = transaction

      // Find existing entry for the category
      const existing = acc.find((item) => item.category === category)

      if (existing) {
        // If it exists, add to the existing amount
        existing[type] = (existing[type] || 0) + amount
      } else {
        // Otherwise, create a new entry for the category and type
        const newEntry: PieChartType = {
          category,
          Income: null,
          Expenses: null,
        }

        // Conditionally add Income or Expenses if non-zero
        if (type === "Income" && amount > 0) {
          newEntry.Income = amount
        }
        if (type === "Expenses" && amount > 0) {
          newEntry.Expenses = amount
        }

        acc.push(newEntry)
      }
      return acc
    }, [] as PieChartType[])

    return aggregatedData as PieChartType[]
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}
