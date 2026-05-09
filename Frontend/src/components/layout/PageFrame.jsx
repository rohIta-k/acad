import { cn } from '../../utils/cn'

function PageFrame({ children, className = '' }) {
  return (
    <div
      className={cn(
        'relative min-h-screen overflow-x-clip bg-[#fcfbff]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default PageFrame
