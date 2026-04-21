import { betterAuth } from 'better-auth'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '#/db'

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
if (!googleClientId || !googleClientSecret) {
  throw new Error(
    'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set for Google sign-in',
  )
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      prompt: 'select_account',
    },
  },
  plugins: [tanstackStartCookies()],
  onAPIError: {
    throw: true,
    errorURL: '/auth/error',
    onError: (error) => {
      console.error('auth error', error)
    },
  },
})
