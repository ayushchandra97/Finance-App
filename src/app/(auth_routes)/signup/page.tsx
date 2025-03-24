"use client"
import Link from "next/link"
import signUp from "./actions"
import styles from "@/styles/auth.module.css"
import { useState } from "react"
import AuthState from "@/types/auth-state"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid"
import { useSearchParams } from "next/navigation"

export default function SignUpPage() {
  const [formState, setFormState] = useState<AuthState>({})

  const searchParams = useSearchParams()

  const serverError = searchParams.get("error") || null

  async function handleSubmit(formData: FormData) {
    const res = await signUp(formState, formData)
    setFormState(res)
  }
  return (
    <>
      <h3>Sign up to continue</h3>
      <form action={handleSubmit} className={styles.form}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="email@example.com"
          required
          className={styles.formInput}
        />
        {formState?.errors?.email && (
          <p className={styles.err}>
            <ExclamationCircleIcon className={styles.icon} />
            {formState?.errors.email}
          </p>
        )}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="@PassWord123"
          required
          className={styles.formInput}
        />
        {formState?.errors?.password && (
          <p className={styles.err}>
            <ExclamationCircleIcon className={styles.icon} />
            {formState?.errors.password}
          </p>
        )}
        <button type="submit" className={styles.formBtn}>
          Sign up
        </button>
        {formState?.message && (
          <p className={styles.err}>
            <ExclamationCircleIcon className={styles.icon} />
            {formState.message}
          </p>
        )}
        {serverError && (
          <p className={styles.err}>
            <ExclamationCircleIcon className={styles.icon} />
            {serverError}
          </p>
        )}
        <small>
          Already have an account? <Link href="/login">Sign In</Link>
        </small>
      </form>
    </>
  )
}
