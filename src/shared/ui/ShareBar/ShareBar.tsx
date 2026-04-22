import { ToggleButton } from 'react-aria-components'
import styles from './ShareBar.module.css'

interface ShareBarProps {
  isPublic: boolean
  slug: string | null
  onToggle: () => void
  isPending?: boolean
}

export const ShareBar = ({
  isPublic,
  slug,
  onToggle,
  isPending = false,
}: ShareBarProps) => {
  const shareUrl =
    isPublic && slug
      ? `${typeof window !== 'undefined' ? window.location.origin : ''}/s/${slug}`
      : null

  return (
    <div className={styles.bar}>
      <ToggleButton
        isSelected={isPublic}
        isDisabled={isPending}
        onChange={onToggle}
        className={styles.toggle}
      >
        {isPublic ? 'Public' : 'Private'}
      </ToggleButton>
      {shareUrl && (
        <input
          className={styles.url}
          readOnly
          value={shareUrl}
          onFocus={(e) => e.currentTarget.select()}
        />
      )}
    </div>
  )
}
