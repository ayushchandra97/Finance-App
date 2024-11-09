import Link from "next/link"
import styles from "../styles/root.module.css"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export default async function Home() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    revalidatePath("/")
    redirect(`/dashboard/overview`)
  }

  return (
    <main className={styles.bg}>
      <Navbar />
      <section className={styles.mainWrapper}>
        <div className={styles.splitContainer}>
          <div>
            <div>
              <h1>Manage your finances effortlessly with the Finance App</h1>
              <p className={styles.para}>
                Gain a clear, organized view of your finances with the Finance
                App. Log in to access a personalized dashboard that instantly
                shows your income, expenses, and spending breakdowns by
                category. Visualize your financial activity through intuitive
                charts and manage every detail with ease.
              </p>
            </div>
            <div>
              <div className={styles.btnWrapper}>
                <Link
                  className={`${styles.signInBtn} ${styles.btnLarge}`}
                  href="/login"
                >
                  Sign In
                </Link>
                <Link
                  className={`${styles.signUpBtn} ${styles.btnLarge}`}
                  href="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/pngegg.png"
              alt="Money Image"
              width={300}
              height={300}
              className={styles.hero}
              priority={true}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
