"use client"
import "./globals.css"
import styles from "@/styles/error.module.css"

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.errContainer}>
        <h2 className={styles.heading}>Something went wrong!</h2>
        <button className={styles.btn} onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  )
}
