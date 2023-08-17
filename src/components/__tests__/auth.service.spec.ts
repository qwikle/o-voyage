import authService from '@/services/auth/auth.service'
import { test, expect } from 'vitest'

test('authService.signIn', async () => {
  const user = await authService.signIn({
    email: 'ahmed@ovoyage.com',
    password: 'Ovoyage123'
  })
  expect(user.email).toEqual('ahmed@ovoyage.com')
})
