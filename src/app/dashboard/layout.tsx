import styles from "@/styles/dashboard.module.css"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import OffcanvasWrapper from "@/components/offcanvas-wrapper"

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/`)
  }

  return (
    <main className={styles.main}>
      <OffcanvasWrapper />
      <div className={styles.contentContainer}>{children}</div>
    </main>
  )
}

export default DashboardLayout
