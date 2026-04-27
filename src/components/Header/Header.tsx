import { Link, useMatchRoute, useRouteContext } from '@tanstack/react-router'
import styles from './Header.module.css'
import { ThemeToggle } from '#/features/themeToggle/ui/ThemeToggle'
import { ProfileMenu } from '#/features/profileMenu/ui/ProfileMenu'
import { FilePenLine, Notebook } from 'lucide-react'

export const Header = () => {
  const { user } = useRouteContext({ from: '__root__' })

  const navigation = [
    {
      label: 'Explore',
      icon: Notebook,
      to: '/explore',
    },
    {
      label: 'New Note',
      icon: FilePenLine,
      to: '/notes/new',
    },
  ]

  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.brand}>
          Not<span className={styles.accent}>App</span>
        </Link>
        {user.id && (
          <>
            <div className={styles.userRow}>
              <ul>
                {navigation.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      activeProps={{ className: styles.active }}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ThemeToggle />
              {user.id && <ProfileMenu />}
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
