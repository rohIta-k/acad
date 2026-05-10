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
        'relative min-h-screen overflow-x-clip bg-transparent flex flex-col',
        className,
      )}
    >
      <div className="flex w-full justify-end px-4 pt-4 sm:px-6 lg:px-8">
        {user ? <SignOutButton /> : <LoginButton />}
      </div>

      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default PageFrame
