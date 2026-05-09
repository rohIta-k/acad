import DropdownItem from './DropdownItem'

function ProfileMenu({ open, items, onItemClick }) {
  return (
    <div
      className={`absolute right-0 top-14 w-44 rounded-[16px] border border-[#e7e0f3] bg-white/95 p-2 shadow-[0_20px_50px_rgba(69,52,119,0.16)] backdrop-blur-xl transition duration-200 ${
        open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-1 opacity-0'
      }`}
    >
      {items.map((item) => (
        <DropdownItem key={item} onClick={onItemClick}>
          {item}
        </DropdownItem>
      ))}
    </div>
  )
}

export default ProfileMenu
