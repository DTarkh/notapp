import { Link, useRouteContext, useRouter } from '@tanstack/react-router'
import styles from './Header.module.css'
import { Button } from '#/shared/ui/Button/Button'
import { ThemeToggle } from '#/features/themeToggle/ui/ThemeToggle'
import { ProfileMenu } from '#/features/profileMenu/ui/ProfileMenu'

export const Header = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const router = useRouter()

  return (
    <header className={styles.header}>
      <nav>
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
            <ThemeToggle />
            {user.id && <ProfileMenu />}
          </div>
        )}
      </nav>
    </header>
  )
}
