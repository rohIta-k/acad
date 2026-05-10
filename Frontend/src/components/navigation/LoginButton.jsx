import React from 'react'
import { supabase } from '../../utils/supabaseClient'

function LoginButton() {
  const handleLogin = async () => {
    try {
      // debug: confirm click handler fired
      // eslint-disable-next-line no-console
      console.log('LoginButton clicked, initiating Supabase OAuth')

      await supabase.auth.signInWithOAuth({ provider: 'google' }, { redirectTo: window.location.href })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Supabase sign-in error', err)
      // show a visible alert so user notices failures in dev
      // eslint-disable-next-line no-alert
      alert('Sign-in failed: ' + (err?.message || String(err)))
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="z-40 inline-flex items-center gap-2 rounded-[12px] bg-[linear-gradient(90deg,#7340f6_0%,#e57ac5_100%)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(115,64,246,0.18)]"
    >
      Sign in
    </button>
  )
}

export default LoginButton
