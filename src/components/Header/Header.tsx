import { useRouteContext } from '@tanstack/react-router'

import styles from './Header.module.css'
import { useSignOut } from '#/hooks/useSignOut'
import { Button } from '#/shared/ui/Button/Button'

export const Header = () => {
  const { mutate: signOut, isPending } = useSignOut()
  const { user } = useRouteContext({ from: '__root__' })
  const initial = (user.name ?? user.email ?? '?').slice(0, 1).toUpperCase()
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          Not<span className={styles.accent}>App</span>
        </div>
        <nav className={styles.nav}>
          {user.id && (
            <div className={styles.userRow}>
              <div className={styles.avatar}>
                {user.image ? (
                  <img src={user.image} alt="" />
                ) : (
                  <span className={styles.avatarInitial}>{initial}</span>
                )}
              </div>
              <div className={styles.meta}>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.email}>{user.email}</span>
              </div>
              <Button onPress={() => signOut()} isDisabled={isPending}>
                Sign out
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
