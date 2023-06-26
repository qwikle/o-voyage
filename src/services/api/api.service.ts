import axios, { Axios, AxiosError, type AxiosResponse } from 'axios'

class ApiService {
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

  private graphQlInterceptor() {
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
      return response
    })
  }

  private async refreshToken() {
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
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return false
    }
  }

  public setAccessToken(token: string) {
    localStorage.setItem('accessToken', token)
    this.axios.defaults.headers.common.Authorization = token
  }

  public setRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token)
  }

  public query({ query, operationName, variables }: GraphQlQuery) {
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
}

export default new ApiService()
