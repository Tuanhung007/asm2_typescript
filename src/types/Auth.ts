export type SignInForm = {
    email: string
    password: string
    // todo
    fullName?: string
    avatar?: string
  }

  export type LoginForm = {
    email: string
    password: string
  }

  export type AuthResponse = {
    accessToken: string
  }