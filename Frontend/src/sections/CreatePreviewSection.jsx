import { ChevronDown } from 'lucide-react'
import EmptyState from '../components/media/EmptyState'
import TabSwitcher from '../components/navigation/TabSwitcher'

function CreatePreviewSection({
  tabs,
  activeTab,
  onTabChange,
  brandData,
  isGenerating,
  hasGenerated,
}) {
  return (
    <div className="min-w-0 rounded-[28px] border border-dashed border-[#d8d1eb] bg-[linear-gradient(180deg,rgba(255,255,255,0.75)_0%,rgba(253,250,255,0.88)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
        <button className="flex items-center gap-2 rounded-[12px] border border-[#e5ddf3] bg-white/80 px-4 py-2 text-[14px] text-[#6f6888] transition hover:border-[#cfc2ef] hover:text-[#4e4970]">
          Options
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <EmptyState
        brandData={brandData}
        isGenerating={isGenerating}
        hasGenerated={hasGenerated}
      />
    </div>
  )
}

export default CreatePreviewSection
