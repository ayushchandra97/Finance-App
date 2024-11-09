import styles from "@/styles/navbar.module.css"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className={styles.mainHeader}>
      <nav className={styles.navBar}>
        <div>
          <h1 className={styles.mainHeading}>Finance App</h1>
        </div>
        <div className={styles.btnWrapper}>
          <Link href="/login" className={styles.signInBtn}>
            Sign in
          </Link>
          <Link href="/signup" className={styles.signUpBtn}>
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  )
}
