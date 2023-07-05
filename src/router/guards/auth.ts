import { useAuthStore } from '@/stores/auth.store'
import jwtDecode from 'jwt-decode'
export function isAuth() {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && checkAuth()) {
    authStore.setAuthenticated()
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

function checkAuth() {
  const tokens = getTokens()
  if (tokens) {
    const { accessToken, refreshToken } = tokens
    const now = Date.now().valueOf() / 1000
    if (accessToken.exp < now) {
      if (refreshToken.exp < now) {
        return false
      }
      return true
    }
    return true
  }
  return false
}

interface JwtToken {
  id: string
  role?: number
  ip: string
  exp: number
  iat: number
}
