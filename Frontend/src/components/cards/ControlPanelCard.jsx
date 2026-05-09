function ControlPanelCard({ children }) {
  return (
    <div className="rounded-[24px] border border-[#e8e1f2] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(253,252,255,0.96)_100%)] p-4 shadow-[0_18px_40px_rgba(90,69,148,0.08)] backdrop-blur-xl sm:p-5">
      {children}
    </div>
  )
}

export default ControlPanelCard
