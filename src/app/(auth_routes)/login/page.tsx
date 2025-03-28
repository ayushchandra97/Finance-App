"use client"
import Link from "next/link"
import login from "./actions"
import styles from "@/styles/auth.module.css"
import { useState } from "react"
import AuthState from "@/types/auth-state"
import { ExclamationCircleIcon } from "@heroicons/react/16/solid"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [formState, setFormState] = useState<AuthState>({})

  const searchParams = useSearchParams()

  const serverError = searchParams.get("error") || null

  async function handleSubmit(formData: FormData) {
    const res = await login(formState, formData)
    setFormState(res)
  }
  // console.log("Form state is:", formState)
  return (
    <>
      <h3>Login to continue</h3>
      <form action={handleSubmit} className={styles.form}>
        <label htmlFor="email">Email:</label>
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
            {formState.errors.email}
          </p>
        )}
        <label htmlFor="password">Password:</label>
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
            {formState.errors.password}
          </p>
        )}
        <button type="submit" className={styles.formBtn}>
          Log in
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
          Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
        </small>
      </form>
    </>
  )
}
