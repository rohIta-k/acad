import { supabase } from '../../utils/supabaseClient'

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      // Supabase will trigger auth state change which PageFrame listens to
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Supabase sign-out error', err)
      // eslint-disable-next-line no-alert
      alert('Sign-out failed: ' + (err?.message || String(err)))
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="z-40 inline-flex items-center gap-2 rounded-[12px] border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#333] shadow-[0_6px_14px_rgba(15,23,42,0.06)]"
    >
      Sign out
    </button>
  )
}
