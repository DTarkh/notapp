import { createFileRoute } from '@tanstack/react-router'

import styles from './index.module.css'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>
        Welcome to Not<span className={styles.accent}>App</span>
      </h1>
      <p className={styles.lead}>
        Your notes stay organized with a calm interface built from four theme
        colors: background, text, personality, and accent.
      </p>
      <section className={styles.panel} aria-labelledby="home-panel-title">
        <h2 id="home-panel-title" className={styles.panelTitle}>
          Getting started
        </h2>
        <p className={styles.panelText}>
          Sign in from the login page when you are signed out. The header shows
          your profile when you are authenticated.
        </p>
      </section>
    </div>
  )
}
