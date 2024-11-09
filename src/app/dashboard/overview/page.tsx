import { BarChartComponent, PieChartComponent } from "@/components/charts"
import { fetchTotalAmountByType } from "./actions"
import styles from "@/styles/overview.module.css"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/16/solid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance App | Overview",
  description: "Overview of the user dashboard.",
}

async function Overview() {
  const data = await Promise.all([
    fetchTotalAmountByType("Income"),
    fetchTotalAmountByType("Expenses"),
  ])

  return (
    <div className={styles.mainInfoContainer}>
      <h1>Overview</h1>
      <section className={styles.numSection}>
        <div className={`${styles.amountContainer} ${styles.incomeContainer}`}>
          <h2 className={styles.heading}>Total Income</h2>
          <div className={styles.info}>
            <ArrowUpCircleIcon className={styles.icon} />
            <p>₹{data[0][0].sum !== null ? data[0][0].sum : "0"}</p>
          </div>
        </div>
        <div
          className={`${styles.amountContainer} ${styles.expensesContainer}`}
        >
          <h2 className={styles.heading}>Total Expenses</h2>
          <div className={styles.info}>
            <ArrowDownCircleIcon className={styles.icon} />
            <p>₹{data[1][0].sum !== null ? data[1][0].sum : "0"}</p>
          </div>
        </div>
      </section>
      <section className={styles.chartMainContainer}>
        <div className={styles.chartContainer}>
          <BarChartComponent />
        </div>
        <div className={styles.chartContainer}>
          <PieChartComponent />
        </div>
      </section>
    </div>
  )
}

export default Overview
