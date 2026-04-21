import type { ReactNode } from 'react'

import styles from './Main.module.css'

export function Main({ children }: { children: ReactNode }) {
  return <main className={styles.main}>{children}</main>
}
