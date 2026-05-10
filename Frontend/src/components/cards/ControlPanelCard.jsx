function ControlPanelCard({ children }) {
  return (
    <div className="rounded-[24px] border border-[#2C2D3C] bg-[#111219] p-4  backdrop-blur-xl sm:p-5">
      {children}
    </div>
  )
}

export default ControlPanelCard
