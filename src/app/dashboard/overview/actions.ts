"use server"

import { createClient } from "@/utils/supabase/server"
import { PostgrestError } from "@supabase/supabase-js"

type Sum = { sum: number | null }

export async function fetchTotalAmountByType(type: string): Promise<Sum[]> {
  const supabase = createClient()
  const { data, error }: { data: unknown; error: PostgrestError | null } =
    await supabase.from("transactions").select("amount.sum()").eq("type", type)

  if (error) throw error
  return data as Sum[]
}

export async function fetchChartDataByType(type: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("transactions")
    .select()
    .eq("type", type)

  if (error) throw error
  return data
}

export async function fetchAllCategories() {
  const supabase = createClient()
  const { data, error } = await supabase.from("categories").select()

  if (error) throw error
  return data
}
