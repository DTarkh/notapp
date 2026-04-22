import { useSignIn } from '#/hooks/useSignIn'
import { getUser } from '#/lib/server'
import { Button } from '#/shared/ui/Button/Button'
import { createFileRoute, redirect } from '@tanstack/react-router'

import styles from './Login.module.css'

export const Route = createFileRoute('/login/')({
  component: Login,
  beforeLoad: async () => {
    const user = await getUser()
    if (user.id) {
      throw redirect({ to: '/' })
    }
    return { user }
  },
})

function Login() {
  const { mutate: signIn, isPending } = useSignIn()
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Sign in to Not<span className={styles.accent}>App</span>
        </h1>
        <p className={styles.subtitle}>
          Continue with your Google account to sync notes across devices.
        </p>
        <div className={styles.actions}>
          <Button
            isPending={isPending}
            onPress={() => signIn()}
            isDisabled={isPending}
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
}
