import { authClient } from '#/lib/auth-client'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return <div />
  }

  if (session?.user) {
    return (
      <div>
        {session.user.image ? (
          <img src={session.user.image} alt="" />
        ) : (
          <div>
            <span>{session.user.name?.charAt(0).toUpperCase() || 'U'}</span>
          </div>
        )}
        <button
          onClick={() => {
            void authClient.signOut()
          }}
        >
          Sign out
        </button>
      </div>
    )
  }

  return null
}
