import { redirect } from "next/navigation"
import { createClient } from "./supabase/server"
import { revalidatePath } from "next/cache"

export default async function getUserId() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) {
    revalidatePath("/")
    redirect(
      `/login?error=${encodeURIComponent(error!.message)}&status=${
        error?.status
      }`
    )
  }
  return user.id
}
