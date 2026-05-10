import { cn } from '../../utils/cn'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import LoginButton from '../navigation/LoginButton'
import SignOutButton from '../navigation/SignOutButton'

function PageFrame({ children, className = '' }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const { data } = await supabase.auth.getUser()
        if (mounted) setUser(data?.user ?? null)
      } catch (err) {
        console.error('Error getting supabase user', err)
      }
    })()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      if (listener?.subscription) listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-x-clip bg-[#fcfbff]',
        className,
      )}
    >
      <div className="pointer-events-auto absolute right-4 top-4 z-50">
        {user ? <SignOutButton /> : <LoginButton />}
      </div>

      {children}
    </div>
  )
}

export default PageFrame
