function TabSwitcher({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-[14px] border border-[#ece6f5] bg-white/70 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`rounded-[10px] px-4 py-2 text-[14px] font-medium transition ${
            activeTab === tab
              ? 'bg-[#7d49f3] text-white shadow-[0_8px_18px_rgba(125,73,243,0.24)]'
              : 'text-[#7e7895] hover:text-[#5d5780]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default TabSwitcher
