"use client"
import styles from "@/styles/dashboard.module.css"

export default function OffcanvasHeader({
  toggle,
  isSidebarActive,
}: {
  toggle: () => void
  isSidebarActive: boolean
}) {
  return (
    <>
      <div
        className={`${styles.bgOffcanvas} ${
          isSidebarActive ? styles.bgOffcanvasVisible : ""
        }`}
      />
      <header className={styles.mainHeader}>
        <nav className={styles.navbar}>
          <button onClick={toggle} className={styles.hamburger}>
            &#9776;
          </button>
          <h1 className={styles.mainHeading}>Finance App</h1>
        </nav>
      </header>
    </>
  )
}
