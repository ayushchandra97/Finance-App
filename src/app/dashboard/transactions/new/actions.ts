// "use server"

// import { createClient } from "@/utils/supabase/server"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"
// import { z } from "zod"

// const FormSchema = z.object({
//   amount: z.coerce
//     .number()
//     .gt(0, { message: "Please enter an amount greater than $0" }),
//   category_id: z
//     .string({
//       invalid_type_error: "Please enter a valid category",
//     })
//     .min(1, { message: "Id cannot have zero characters" }),
//   user_id: z.string({
//     invalid_type_error: "Please enter a valid user id",
//   }),
//   description: z.string({
//     invalid_type_error: "Please enter a valid description",
//   }),
//   type: z.enum(["Income", "Expenses"], {
//     invalid_type_error: "Please enter a valid category",
//   }),
//   date: z.string({
//     invalid_type_error: "Please enter a valid date",
//   }),
// })

// export type State = {
//   errors?: {
//     amount?: string[]
//     category_id?: string[]
//     date?: string[]
//     description?: string[]
//     type?: string[]
//     user_id?: string[]
//   }
//   message?: string | null
// }

// export async function createTransaction(prevState: State, formData: FormData) {
//   const validatedFields = FormSchema.safeParse({
//     amount: formData.get("amount"),
//     category_id: formData.get("category_id"),
//     date: formData.get("date"),
//     description: formData.get("description"),
//     type: formData.get("type"),
//     user_id: formData.get("user_id"),
//   })

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Create Invoice.",
//     }
//   }

//   const { amount, category_id, date, description, type, user_id } =
//     validatedFields.data

//   const supabase = createClient()

//   const { error } = await supabase
//     .from("transactions")
//     .insert({ amount, category_id, date, description, type, user_id })

//   if (error) return { message: "Database Error: Failed to Create Transaction." }

//   revalidatePath("/dashboard")
//   redirect("//dashboard/transactions")
// }

// export async function fetchAllCategories(id: string) {
//   const supabase = createClient()

//   const { data, error } = await supabase
//     .from("categories")
//     .select("name, id")
//     .or(`created_by.eq.${id},created_by.is.null`)

//   if (error) throw error
//   return data
// }
