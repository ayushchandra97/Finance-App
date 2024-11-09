"use server"

import { createClient } from "@/utils/supabase/server"

export async function fetchTransaction(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("transactions")
    .select()
    .eq("id", id)

  if (error) return { message: "Database Error: Failed to Fetch Transaction." }

  return data
}
