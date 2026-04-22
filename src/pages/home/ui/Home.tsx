import styles from './Home.module.css'

export const HomePage = () => {
  return (
    <div className={styles.home}>
      <section className={styles.intro}>
        <h1 className={styles.title}>
          Not<span className={styles.accent}>App</span>
        </h1>
        <p className={styles.lead}>
          Your notes stay organized with a calm interface built from four theme
          colors: background, text, personality, and accent.
        </p>
      </section>
    </div>
  )
}
