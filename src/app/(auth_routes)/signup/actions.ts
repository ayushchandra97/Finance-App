"use server"

import AuthState from "@/types/auth-state"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const FormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Please enter a valid email",
      required_error: "Please enter a valid email",
    })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({
      invalid_type_error: "Please enter a valid password",
      required_error: "Please enter a valid password",
    })
    .min(6, { message: "Must contain atleast 6 characters" }),
})

export default async function signup(prevState: AuthState, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp(validatedFields.data)

  if (error) {
    redirect(
      `/signup?error=${encodeURIComponent(error.message)}&status=${
        error.status
      }`
    )
  }

  revalidatePath("/", "layout")
  redirect("/dashboard/overview")
}
