import { useSignIn } from '#/hooks/useAuth'
import { getUser } from '#/lib/server'

import { createFileRoute, redirect } from '@tanstack/react-router'

import styles from './Login.module.css'
import { GoogleIcon } from '#/components/GoogleIcon'
import { ProgressCircle } from '#/shared/ui/ProgressCircle/ProgressCircle'

export const Route = createFileRoute('/login/')({
  component: Login,
  beforeLoad: async () => {
    const user = await getUser()
    if (user.id) {
      throw redirect({ to: '/' })
    }
    return { user }
  },
})

function Login() {
  const { mutate: signIn, isPending } = useSignIn()
  return (
    <div className={styles.login}>
      <div className={styles.grid}>
        <div className={styles.tagTop}>★ MARKNOTE / ZINE_03 ★</div>

        <div className={styles.cardWrap}>
          <div className={styles.shadow} />
          <div className={styles.card}>
            <div className={styles.stamp}>SIGN&nbsp;IN</div>

            <h1 className={styles.headline}>
              WRITE
              <br />
              <span className={styles.headlineAlt}>READ</span>
              <br />
              REPEAT.
            </h1>

            <p className={styles.body}>
              Markdown notes. Public feed when you want one. No noise. No
              algorithm. Just text.
            </p>

            <button
              className={styles.googleBtn}
              disabled={isPending}
              type="button"
              onClick={() => signIn()}
            >
              <GoogleIcon />
              {isPending ? (
                <ProgressCircle aria-label="Saving..." isIndeterminate />
              ) : (
                <>
                  <span>CONTINUE WITH GOOGLE</span>
                  <span className={styles.arrow}>→</span>
                </>
              )}
            </button>

            <div className={styles.meta}>
              <span>NO PASSWORD</span>
              <span>·</span>
              <span>NO EMAIL LIST</span>
              <span>·</span>
              <span>NO TRACKING†</span>
            </div>
          </div>
        </div>

        <div className={styles.tagBottom}>
          <span>EST. 2026</span>
          <span>EDITION 01 / 100</span>
        </div>
      </div>
    </div>
  )
}
