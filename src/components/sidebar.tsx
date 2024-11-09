"use client"

import signOut from "@/app/actions"
import {
  CurrencyRupeeIcon,
  HomeIcon,
  PowerIcon,
} from "@heroicons/react/16/solid"
import styles from "@/styles/dashboard.module.css"
import Link from "next/link"

export default function Sidebar({
  isSidebarActive,
  toggle,
}: {
  isSidebarActive: boolean
  toggle: () => void
}) {
  return (
    <>
      <div
        className={`${styles.sidebar} ${
          isSidebarActive ? styles.sidebarActive : ""
        }`}
      >
        <div className={styles.sidenav}>
          <div className={styles.headingBtn}>
            <h1>Finance App</h1>
            <button onClick={toggle}>&times;</button>
          </div>
          <Link className={styles.navBtn} href="/dashboard/overview">
            <HomeIcon className={styles.icon} />
            <span>Overview</span>
          </Link>
          <Link className={styles.navBtn} href="/dashboard/transactions">
            <CurrencyRupeeIcon className={styles.icon} />
            <span>Transactions</span>
          </Link>
        </div>
        <form className={styles.btnForm} action={signOut}>
          <button type="submit" className={`${styles.btnOff} ${styles.navBtn}`}>
            <PowerIcon className={styles.icon} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </>
  )
}
