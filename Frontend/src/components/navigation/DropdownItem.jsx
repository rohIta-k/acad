function DropdownItem({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full rounded-[12px] px-3 py-2 text-left text-[14px] text-[#4f4968] transition hover:bg-[#f7f4ff] hover:text-[#2c2744]"
    >
      {children}
    </button>
  )
}

export default DropdownItem
