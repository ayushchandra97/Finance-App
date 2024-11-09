type AuthState = {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export default AuthState
