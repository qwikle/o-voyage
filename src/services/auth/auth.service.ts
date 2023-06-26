import type { AxiosResponse } from 'axios'
import apiService, { type ApiInterface } from '../api/api.service'

class AuthService {
  client: ApiInterface

  constructor(client: ApiInterface) {
    this.client = client
  }

  /**
   * @description Sign in user
   * @param param0 { email: string; password: string }
   * @returns  { accessToken: string; refreshToken: string }
   */
  async signIn({ email, password }: SignInInput): Promise<{
    accessToken: string
    refreshToken: string
  }> {
    const { data } = (await this.client.mutation({
      query: `
        mutation Mutation($signInInput: SignInInput!) {
          signIn(signInInput: $signInInput) {
            token {
              accessToken
              refreshToken
            }
          }
        }
      `,
      variables: {
        signInInput: {
          email,
          password
        }
      }
    })) as AxiosResponse<{
      data: { signIn: { token: { accessToken: string; refreshToken: string } } }
    }>
    this.client.setAccessToken(data.data.signIn.token.accessToken)
    this.client.setRefreshToken(data.data.signIn.token.refreshToken)

    return data.data.signIn.token
  }

  /**
   * @description Sign up user
   * @param param0 { email: string; password: string; confirmPassword: string; firstName: string; lastName: string }
   * @returns  { accessToken: string; refreshToken: string }
   *  */
  async signUp({ email, password, confirmPassword, firstName, lastName }: SignUpInput): Promise<{
    token: { accessToken: string; refreshToken: string }
  }> {
    const mutation = `
    mutation Mutation($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    token {
      refreshToken
      accessToken
    }
    user {
      id
      email
      firstname
      lastname
    }
  }
}`
    const variables = {
      signUpInput: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
      }
    }

    const { data } = (await this.client.mutation({
      query: mutation,
      variables
    })) as AxiosResponse<{
      data: { signUp: { token: { accessToken: string; refreshToken: string } } }
    }>
    localStorage.setItem('accessToken', data.data.signUp.token.accessToken)
    localStorage.setItem('refreshToken', data.data.signUp.token.refreshToken)

    return data.data.signUp
  }

  /**
   * @description Sign out user
   * @returns  { boolean }
   * */
  signOut(): boolean {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

    return true
  }
}

export interface SignInInput {
  email: string
  password: string
}

export interface SignUpInput {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export default new AuthService(apiService)
