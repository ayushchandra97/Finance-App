import Link from "next/link"
import styles from "@/styles/error.module.css"

export default function NotFound() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.errContainer}>
        <h2 className={styles.heading}>Not Found</h2>
        <p className={styles.para}>Could not find the requested resource</p>
        <Link className={styles.btn} href="/">
          Return Home
        </Link>
      </div>
    </div>
  )
}
