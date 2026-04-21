import { signIn } from '#/lib/auth-client'
import { useMutation } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

export const useSignIn = () => {
  return useMutation({
    mutationFn: () => signIn.social({ provider: 'google', callbackURL: '/' }),
    onSuccess: () => {
      sessionStorage.setItem('pendingSignIn', '1')
      redirect({ to: '/' })
    },
    onError: (error) => {
      alert(error.message)
    },
  })
}
