const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Better-auth codes
  no_code: 'Sign-in was cancelled or the request was invalid.',
  state_not_found: 'Sign-in session expired or was invalid. Please try again.',
  state_mismatch: 'Sign-in session expired or was invalid. Please try again.',
  invalid_callback_request: 'Invalid sign-in response. Please try again.',
  no_callback_url: 'Sign-in configuration error. Please try again.',
  oauth_provider_not_found: 'Sign-in provider is not available.',
  email_not_found:
    "We couldn't use your account email. Try another sign-in method.",
  "email_doesn't_match":
    "We couldn't use your account email. Try another sign-in method.",
  unable_to_get_user_info:
    "We couldn't get your account info. Please try again.",
  unable_to_link_account: 'This account is already linked to another user.',
  account_already_linked_to_different_user:
    'This account is already linked to another user.',
  signup_disabled: 'Sign-up is currently disabled.',
  // Google codes
  invalid_code:
    'Sign-in failed. If this keeps happening, the sign-in provider may be misconfigured.',
  access_denied: 'Sign-in was cancelled.',
  invalid_request:
    'The sign-in request was invalid or missing required parameters.',
  unauthorized_client: 'This app is not allowed to request sign-in this way.',
  unsupported_response_type: 'Sign-in response type is not supported.',
  invalid_scope: 'The requested sign-in permissions are invalid or unknown.',
  server_error:
    'The sign-in provider had an error. Please try again in a moment.',
  temporarily_unavailable:
    'Sign-in is temporarily unavailable. Please try again later.',
  invalid_client:
    'Sign-in failed. The app credentials may be wrong or misconfigured.',
  invalid_grant:
    'Sign-in expired or was revoked. Please try again from the start.',
  redirect_uri_mismatch:
    'Sign-in is misconfigured. The redirect URL does not match the app settings.',
  please_restart_the_process:
    "Sign-in didn't complete. Please restart the process.",
} as const

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.'

export const getAuthErrorMessage = (code: string) => {
  return AUTH_ERROR_MESSAGES[code] ?? DEFAULT_MESSAGE
}
