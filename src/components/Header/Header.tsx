import {
  Link,
  useLocation,
  useRouteContext,
  useRouter,
} from '@tanstack/react-router'
import styles from './Header.module.css'
import { useSignOut } from '#/hooks/useAuth'
import { Button } from '#/shared/ui/Button/Button'
import { ThemeToggle } from '#/features/themeToggle/ui/ThemeToggle'

export const Header = () => {
  const { mutate: signOut, isPending } = useSignOut()
  const { user } = useRouteContext({ from: '__root__' })
  const pathname = useLocation({ select: (l) => l.pathname })
  const router = useRouter()
  if (pathname.startsWith('/s/')) return null
  const initial = (user.name ?? user.email ?? '?').slice(0, 1).toUpperCase()
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          Not<span className={styles.accent}>App</span>
        </Link>
        {user.id && (
          <div className={styles.userRow}>
            <Button
              variant="tertiary"
              onPress={() => router.navigate({ to: '/notes/new' })}
            >
              New note
            </Button>

            <div className={styles.avatar}>
              {user.image ? (
                <img src={user.image} alt="" />
              ) : (
                <span className={styles.avatarInitial}>{initial}</span>
              )}
            </div>
            <Button
              variant="primary"
              onPress={() => signOut()}
              isDisabled={isPending}
            >
              Sign out
            </Button>
            <ThemeToggle />
          </div>
        )}
      </nav>
    </header>
  )
}
