import { supabase } from '../../utils/supabaseClient'

function LoginButton() {
  const handleLogin = async () => {
    try {
      const redirectUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`

      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUrl },
      })
    } catch (err) {
      console.error('Supabase sign-in error', err)
      alert('Sign-in failed: ' + (err?.message || String(err)))
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="z-40 inline-flex items-center gap-2 rounded-[12px] bg-[#B8C2FF] hover:bg-[#C3C8FF] text-[#131318] px-4 py-2 text-sm font-medium"
    >
      Sign in
    </button>
  )
}

export default LoginButton
