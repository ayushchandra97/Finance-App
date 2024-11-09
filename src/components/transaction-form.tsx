"use client"

import {
  createTransaction,
  EditState,
  editTransaction,
  State,
} from "@/app/dashboard/transactions/actions"
import Transactions from "@/types/transactions"

import { useState } from "react"

import styles from "@/styles/form.module.css"

import { ExclamationCircleIcon } from "@heroicons/react/16/solid"

type Categories = {
  name: string
  id: string
}

export function NewTransactionForm({
  userId,
  categories,
}: {
  userId: string
  categories: Categories[]
}) {
  const [formState, setFormState] = useState<State>({})

  async function handleSubmit(formData: FormData) {
    formData.set("user_id", userId)
    const categoryName = formData.get("category")
    const matchingCategory = categories.find(
      (category) => category.name === categoryName
    )
    formData.set("category_id", matchingCategory?.id || "")
    formData.delete("category")
    const response = await createTransaction(formState, formData)
    setFormState(response)
  }

  return (
    <form action={handleSubmit} className={styles.formContainer}>
      <div className={styles.formElement}>
        <label htmlFor="amount">Amount</label>
        <div>
          <input
            name="amount"
            id="amount"
            type="number"
            placeholder="Enter the amount"
            required
            onWheel={(e) => e.currentTarget.blur()}
          />
          {formState?.errors?.amount && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.amount}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="type">Type</label>
        <div>
          <select defaultValue="Select" required name="type" id="type">
            <option disabled value="Select">
              --Select--
            </option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          {formState?.errors?.type && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.type}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="category">Category</label>
        <div>
          <select defaultValue="Select" required name="category" id="category">
            <option disabled value="Select">
              --Select--
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {formState?.errors?.category_id && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.category_id}
            </p>
          )}
        </div>
      </div>
      <div className={`${styles.formElement}`}>
        <label htmlFor="description">Description</label>
        <div className={styles.taContainer}>
          <textarea
            id="description"
            name="description"
            placeholder="Enter the description"
          />
          {formState?.errors?.description && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.description}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="date">Date</label>
        <div>
          <input required id="date" type="date" name="date" />
          {formState?.errors?.date && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.date}
            </p>
          )}
        </div>
      </div>
      <button className={styles.formBtn} type="submit">
        New Transaction
      </button>
    </form>
  )
}
export function EditTransactionForm({
  transaction,
  categories,
}: {
  transaction: Transactions
  categories: Categories[]
}) {
  const [formState, setFormState] = useState<EditState>({})

  async function handleSubmit(formData: FormData) {
    formData.set("id", transaction.id)
    const categoryName = formData.get("category")
    const matchingCategory = categories.find(
      (category) => category.name === categoryName
    )
    formData.set("category_id", matchingCategory?.id || "")
    formData.delete("category")
    console.log("date is: ", formData.get("date"))
    const response = await editTransaction(formState, formData)
    setFormState(response)
  }

  const matchedCategory = categories.find(
    (category) => category.id === transaction.category_id
  )

  const matchedCategoryName = matchedCategory?.name

  return (
    <form action={handleSubmit} className={styles.formContainer}>
      <div className={styles.formElement}>
        <label htmlFor="amount">Amount</label>
        <div>
          <input
            name="amount"
            id="amount"
            type="number"
            placeholder="Enter the amount"
            defaultValue={transaction.amount}
            required
            onWheel={(e) => e.currentTarget.blur()}
          />
          {formState?.errors?.amount && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.amount}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="type">Type</label>
        <div>
          <select
            required
            name="type"
            id="type"
            defaultValue={transaction.type}
          >
            <option disabled value="Select">
              --Select--
            </option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          {formState?.errors?.type && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.type}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="category">Category</label>
        <div>
          <select
            required
            name="category"
            id="category"
            defaultValue={matchedCategoryName}
          >
            <option disabled value="Select">
              --Select--
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {formState?.errors?.category_id && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.category_id}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="description">Description</label>
        <div className={styles.taContainer}>
          <textarea
            id="description"
            name="description"
            placeholder="Enter the description"
            defaultValue={transaction.description || undefined}
          />
          {formState?.errors?.description && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.description}
            </p>
          )}
        </div>
      </div>
      <div className={styles.formElement}>
        <label htmlFor="date">Date</label>
        <div>
          <input
            required
            id="date"
            type="date"
            name="date"
            defaultValue={transaction.date.split("T")[0]}
          />
          {formState?.errors?.date && (
            <p className={styles.err}>
              <ExclamationCircleIcon className={styles.icon} />
              {formState.errors.date}
            </p>
          )}
        </div>
      </div>
      <button className={styles.formBtn} type="submit">
        Edit Transaction
      </button>
    </form>
  )
}
