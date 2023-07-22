import { useAuthStore } from '@/stores/auth.store'
import apiService from '@/services/api/api.service'
import jwtDecode from 'jwt-decode'
export async function isAuth() {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && (await checkAuth())) {
    await authStore.setAuthenticated()
  }
  return authStore.isAuthenticated
}

function getTokens() {
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  if (accessToken && refreshToken) {
    return decodeTokens(accessToken, refreshToken)
  }
  return null
}

function decodeTokens(
  accessToken: string,
  refreshtoken: string
): { accessToken: JwtToken; refreshToken: JwtToken } {
  return {
    accessToken: jwtDecode<JwtToken>(accessToken),
    refreshToken: jwtDecode<JwtToken>(refreshtoken)
  }
}

async function checkAuth() {
  const tokens = getTokens()
  if (tokens) {
    const { accessToken, refreshToken } = tokens
    const now = Date.now().valueOf() / 1000
    if (accessToken.exp < now) {
      if (refreshToken.exp < now) {
        return false
      }
      return await apiService.refreshToken()
    }
    return apiService.refreshToken()
  }
  return false
}

interface JwtToken {
  id: number
  role?: number
  ip: string
  exp: number
  iat: number
}
