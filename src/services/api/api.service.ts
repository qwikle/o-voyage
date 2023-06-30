import axios, { Axios, AxiosError, type AxiosResponse } from 'axios'

class ApiService implements ApiInterface {
  private axios: Axios

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    this.graphQlInterceptor()
  }

  /**
   * @description Remove tokens from localStorage and axios headers
   * @returns  { void }
   * */
  removeTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.axios.defaults.headers.common.Authorization = ''
  }

  /**
   * @description Set interceptor for graphql requests
   * @returns  { void }
   * */
  private graphQlInterceptor(): void {
    this.axios.interceptors.request.use((config) => {
      config.headers.Authorization = `${localStorage.getItem('accessToken')}`
      return config
    })

    this.axios.interceptors.response.use(async (response) => {
      if (response.data.errors) {
        if (response.data.errors[0].message === 'jwt expired') {
          const refreshed = await this.refreshToken()
          if (refreshed) {
            return this.axios.request(response.config)
          }
        }
        return Promise.reject(
          new AxiosError(
            response.data.errors[0].message,
            response.status.toString(),
            response.config,
            response.headers,
            response
          )
        )
      }
      return response.data.data
    })
  }

  /**
   * @description Refresh token
   * @returns  { boolean }
   * */
  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      const { data } = await this.axios.post('', {
        query: `
        mutation {
            refreshToken(refreshToken: "${refreshToken}") {
                accessToken
                refreshToken
            }
        }
        `
      })
      this.setAccessToken(data.data.refreshToken.accessToken)
      this.setRefreshToken(data.data.refreshToken.refreshToken)
      return true
    } catch (_) {
      this.removeTokens()
      return false
    }
  }

  /**
   * @description Set access token
   * @param token { string }
   * @returns  { void }
   * */
  public setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token)
    this.axios.defaults.headers.common.Authorization = token
  }

  /**
   * @description Set refresh token
   * @param token { string }
   * @returns  { void }
   * */
  public setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token)
  }

  /**
   * @description Send graphql query
   * @param query { string }
   * @param operationName { string }
   * @param variables { Record<string, unknown> }
   * @returns  { Promise<AxiosResponse<unknown>> }
   * */
  public query({ query, operationName, variables }: GraphQlQuery): Promise<AxiosResponse<unknown>> {
    return this.axios.post('', {
      query,
      operationName,
      variables
    }) as Promise<AxiosResponse<unknown>>
  }

  public mutation({ query, operationName, variables }: GraphQlQuery) {
    return this.axios.post('', {
      query,
      operationName,
      variables
    }) as Promise<AxiosResponse<unknown>>
  }
}

export interface GraphQlQuery {
  operationName?: string
  query: string
  variables?: Record<string, unknown>
}

export interface ApiInterface {
  query(query: GraphQlQuery): Promise<AxiosResponse<unknown>>
  mutation(query: GraphQlQuery): Promise<AxiosResponse<unknown>>
  setAccessToken(token: string): void
  setRefreshToken(token: string): void
  removeTokens(): void
}

export default new ApiService()
