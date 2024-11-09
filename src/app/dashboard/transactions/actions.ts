"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

export async function fetchAllTransactions() {
  const supabase = createClient()
  const { data, error } = await supabase.from("transactions").select()
  if (error) throw error

  const { data: categories, error: err } = await supabase
    .from("categories")
    .select()
  if (err) throw err

  data.forEach((item) => {
    categories.forEach((category) => {
      if (item.category_id === category.id) {
        item.category = category.name
      }
    })
  })

  return data
}

export async function deleteTransaction(id: string) {
  const supabase = createClient()
  const response = await supabase.from("transactions").delete().eq("id", id)

  if (response.error) {
    throw new Error(`Failed to delete the transaction`)
  }
  revalidatePath("/dashboard")
}

const FormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Please enter a valid amount",
    })
    .gt(0, { message: "Please enter an amount greater than $0" }),
  category_id: z
    .string({
      invalid_type_error: "Please select a valid category",
      required_error: "Category is required",
    })
    .min(1, { message: "ID cannot have zero characters" }),
  user_id: z.string({
    invalid_type_error: "Please enter a valid user id",
    required_error: "User ID is required",
  }),
  description: z.string({
    invalid_type_error: "Please enter a valid description",
  }),
  type: z.enum(["Income", "Expenses"], {
    invalid_type_error: "Please select a valid category",
    required_error: "Type is required",
  }),
  date: z
    .string({
      invalid_type_error: "Please enter a valid date",
      required_error: "Date is required",
    })
    .date("Incorrect date format"),
})

export type State = {
  errors?: {
    amount?: string[]
    category_id?: string[]
    date?: string[]
    description?: string[]
    type?: string[]
    user_id?: string[]
  }
  message?: string | null
}

export async function createTransaction(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    amount: formData.get("amount"),
    category_id: formData.get("category_id"),
    date: formData.get("date"),
    description: formData.get("description"),
    type: formData.get("type"),
    user_id: formData.get("user_id"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { amount, category_id, date, description, type, user_id } =
    validatedFields.data

  const supabase = createClient()

  const { error } = await supabase
    .from("transactions")
    .insert({ amount, category_id, date, description, type, user_id })

  if (error) return { message: "Database Error: Failed to Create Transaction." }

  revalidatePath("/dashboard")
  redirect("/dashboard/transactions")
}

export type EditState = {
  errors?: {
    id?: string[]
    amount?: string[]
    category_id?: string[]
    date?: string[]
    description?: string[]
    type?: string[]
  }
  message?: string | null
}

const EditFormSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Please enter a valid amount",
    })
    .gt(0, { message: "Please enter an amount greater than $0" }),
  category_id: z
    .string({
      invalid_type_error: "Please select a valid category",
      required_error: "Category is required",
    })
    .min(1, { message: "Id cannot have zero characters" }),
  id: z.string({
    invalid_type_error: "Please enter a valid transaction ID",
    required_error: "Transaction ID is required",
  }),
  description: z.string({
    invalid_type_error: "Please enter a valid description",
  }),
  type: z.enum(["Income", "Expenses"], {
    invalid_type_error: "Please select a valid category",
    required_error: "Type is required",
  }),
  date: z
    .string({
      invalid_type_error: "Please enter a valid date",
      required_error: "Date is required",
    })
    .date("Incorrect date format"),
})

export async function editTransaction(
  prevState: EditState,
  formData: FormData
) {
  const validatedFields = EditFormSchema.safeParse({
    id: formData.get("id"),
    amount: formData.get("amount"),
    category_id: formData.get("category_id"),
    date: formData.get("date"),
    description: formData.get("description"),
    type: formData.get("type"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { amount, category_id, date, description, type, id } =
    validatedFields.data

  const supabase = createClient()

  const { error } = await supabase
    .from("transactions")
    .update({ amount, category_id, date, description, type })
    .eq("id", id)

  if (error) return { message: "Database Error: Failed to Create Transaction." }

  revalidatePath("/dashboard")
  redirect("/dashboard/transactions")
}

export async function fetchAllCategories(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("categories")
    .select("name, id")
    .or(`created_by.eq.${id},created_by.is.null`)

  if (error) throw error
  return data
}
