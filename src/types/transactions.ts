import { Database } from "@/types/supabase"

type Transactions = {
  amount: number
  category_id: string | null
  category: string | null
  created_at: string
  date: string
  description: string | null
  id: string
  type: Database["public"]["Enums"]["Type"]
  user_id: string
}

export default Transactions
