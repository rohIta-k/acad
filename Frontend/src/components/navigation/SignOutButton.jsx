import { supabase } from '../../utils/supabaseClient'

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      // Supabase will trigger auth state change which PageFrame listens to
    } catch (err) {
      console.error('Supabase sign-out error', err)
      alert('Sign-out failed: ' + (err?.message || String(err)))
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="z-40 inline-flex items-center gap-2 rounded-[12px] border border-[#2C2D3C] bg-[#111219] px-4 py-2 text-sm font-medium text-[#e2e2e8] transition hover:bg-[#1D1E29] "
    >
      Sign out
    </button>
  )
}
