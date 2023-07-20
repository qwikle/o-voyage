import type { User } from '@/models'
import { ClientService } from '../api/client.service'

class AuthService extends ClientService {
  /**
   * @description Sign in user
   * @param signInInput { email: string; password: string }
   * @returns  { User }
   */
  async signIn({ email, password }: SignInInput): Promise<User> {
    const { signIn } = (await this.client.mutation({
      query: `
        mutation Mutation($signInInput: SignInInput!) {
          signIn(signInInput: $signInInput) {
            user {
              id
              email
              firstname
              lastname
            }
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
    })) as unknown as {
      signIn: { token: { accessToken: string; refreshToken: string }; user: User }
    }
    this.client.setAccessToken(signIn.token.accessToken)
    this.client.setRefreshToken(signIn.token.refreshToken)

    return signIn.user
  }

  /**
   * @description Sign up user
   * @param signUpInput { email: string; password: string; confirmPassword: string; firstName: string; lastName: string }
   * @returns  { accessToken: string; refreshToken: string }
   *  */
  async signUp({
    email,
    password,
    confirmPassword,
    firstname,
    lastname
  }: SignUpInput): Promise<User> {
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
        firstname,
        lastname
      }
    }

    const { signUp } = (await this.client.mutation({
      query: mutation,
      variables
    })) as unknown as {
      signUp: { token: { accessToken: string; refreshToken: string }; user: User }
    }
    this.client.setAccessToken(signUp.token.accessToken)
    this.client.setRefreshToken(signUp.token.refreshToken)

    return signUp.user
  }

  /**
   * @description Sign out user
   * @returns  { boolean }
   * */
  signOut(): boolean {
    this.client.removeTokens()
    return true
  }

  /**
   * @description Get user
   * @returns  { User }
   * */
  async getUser(): Promise<User> {
    const { me } = (await this.client.query({
      query: `
        query Query {
          me {
            id
            email
            firstname
            lastname
          }
        }
      `
    })) as unknown as { me: User }
    return me
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
  firstname: string
  lastname: string
}

export default new AuthService()
