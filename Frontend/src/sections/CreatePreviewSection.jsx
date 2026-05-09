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
    <EmptyState
      brandData={brandData}
      isGenerating={isGenerating}
      hasGenerated={hasGenerated}
    />
  )
}

export default CreatePreviewSection
