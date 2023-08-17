import authService from '@/services/auth/auth.service'
import { test, expect } from 'vitest'

test('authService.signIn', async () => {
  const user = await authService.signIn({
    email: 'test@test',
    password: 'Test123'
  })
  expect(user.email).toEqual('test')
})
