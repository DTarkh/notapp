import { useSignOut } from '#/hooks/useAuth'
import { Menu, MenuItem, MenuSection, MenuTrigger } from '#/shared/ui/Menu/Menu'
import { useRouteContext, useRouter } from '@tanstack/react-router'
import { LogOut, User, FilePenLine } from 'lucide-react'
import { Button, Separator, Text } from 'react-aria-components'
import styles from './ProfileMenu.module.css'

export const ProfileMenu = () => {
  const { user } = useRouteContext({ from: '__root__' })
  const { mutate: signOut } = useSignOut()
  const router = useRouter()
  return (
    <MenuTrigger>
      <Button className={styles.avatar} aria-label="User menu">
        {user.image ? (
          <img src={user.image} alt="User avatar" />
        ) : (
          <User size={20} className={styles.icon} />
        )}
      </Button>

      <Menu>
        <MenuSection>
          <MenuItem isDisabled>
            <Text slot="label">{user.email}</Text>
          </MenuItem>
        </MenuSection>
        <Separator />
        <MenuSection>
          <MenuItem textValue="Profile">
            <FilePenLine />
            <Text
              slot="label"
              onClick={() => router.navigate({ to: '/notes/new' })}
            >
              New Note
            </Text>
          </MenuItem>
          <MenuItem onAction={() => signOut()} textValue="Sign Out">
            <LogOut />
            <Text slot="label">Sign Out</Text>
          </MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  )
}
