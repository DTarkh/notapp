import { useMutation } from '@tanstack/react-query'
import { signOut } from '#/lib/auth-client'
import { useRouter } from '@tanstack/react-router'

export const useSignOut = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      router.navigate({ to: '/' })
      alert('Sign out successful')
    },
    onError: (error) => {
      alert(error.message)
    },
  })
}
