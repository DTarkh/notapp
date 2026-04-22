import { Link, useRouteContext } from '@tanstack/react-router'
import styles from './Header.module.css'
import { useSignOut } from '#/hooks/useAuth'
import { Button } from '#/shared/ui/Button/Button'

export const Header = () => {
  const { mutate: signOut, isPending } = useSignOut()
  const { user } = useRouteContext({ from: '__root__' })
  const initial = (user.name ?? user.email ?? '?').slice(0, 1).toUpperCase()
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand}>
          Not<span className={styles.accent}>App</span>
        </Link>
        {user.id && (
          <div className={styles.userRow}>
            <Link to="/notes/new">New note</Link>
            <div className={styles.avatar}>
              {user.image ? (
                <img src={user.image} alt="" />
              ) : (
                <span className={styles.avatarInitial}>{initial}</span>
              )}
            </div>
            <Button onPress={() => signOut()} isDisabled={isPending}>
              Sign out
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
