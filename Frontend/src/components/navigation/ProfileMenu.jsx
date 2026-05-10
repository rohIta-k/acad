import DropdownItem from './DropdownItem'

function ProfileMenu({ open, items, onItemClick }) {
  return (
    <div
      className={`absolute right-0 top-14 w-44 rounded-[16px] border border-[#2C2D3C] bg-[#1D1E29]/95 p-2  backdrop-blur-xl transition duration-200 ${
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
