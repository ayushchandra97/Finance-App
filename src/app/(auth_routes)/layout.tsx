import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import styles from "@/styles/auth.module.css"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finance App | Authenticate",
  description: "Authenticate to continue.",
}

export default async function layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    revalidatePath("/")
    redirect(`/dashboard/overview`)
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.formWrapper}>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
