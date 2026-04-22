import { signIn, signOut } from '#/lib/auth-client'
import { getUser } from '#/lib/server'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { redirect, useRouter } from '@tanstack/react-router'

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

export const useSignOut = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      router.navigate({ to: '/login' })
      alert('Sign out successful')
    },
    onError: (error) => {
      alert(error.message)
    },
  })
}

export const getUserQueryOptions = () =>
  queryOptions({
    queryKey: ['user'],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5,
  })
