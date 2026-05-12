import { ArrowRight, PencilLine, ChevronLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SetupShell from '../components/layout/SetupShell'
import PageFrame from '../components/layout/PageFrame'
import {
  audienceOptions,
  createDefaultBrandData,
  createEmptyAsset,
  toneOptions,
} from '../data/brandData'
import { useBrandStorage } from '../hooks/useBrandStorage'
import SetupAudienceSection from '../sections/SetupAudienceSection'
import SetupHeaderSection from '../sections/SetupHeaderSection'
import SetupIdentitySection from '../sections/SetupIdentitySection'
import SetupPersonalitySection from '../sections/SetupPersonalitySection'
import SetupVisualStyleSection from '../sections/SetupVisualStyleSection'
import { useGenerationStorage } from '../hooks/useGenerationStorage'
import { generateRunwayMascot } from '../utils/api'
import { isImageFile } from '../utils/fileUpload'
import {
  getAssetUrl,
  uploadBrandImageAsset,
  uploadBrandImageAssetFromUrl,
} from '../utils/brandAssetStorage'

function BrandSetupEditor({
  initialDraft,
  isEditMode,
  brandId,
  navigate,
  persistBrandData,
  setActiveBrand,
  user,
  saveGeneration,
  error,
}) {
  const [draftData, setDraftData] = useState(initialDraft)
  const [isEditing] = useState(true)
  const [showValidation, setShowValidation] = useState(false)
  const [activePaletteIndex, setActivePaletteIndex] = useState(-1)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isMascotGenerating, setIsMascotGenerating] = useState(false)
  const [mascotError, setMascotError] = useState('')

  const BackButton = () => (
    <button
      onClick={() => navigate(-1)}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
      aria-label="Back"
    >
      <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
    </button>
  )

  const validation = useMemo(() => {
    const brandNameValid = draftData.brandName.trim().length > 0
    const logoValid = Boolean(getAssetUrl(draftData.logo))
    const toneValid = Boolean(draftData.tone)
    const audienceValid = draftData.audience.length > 0
    const paletteValid =
      draftData.palette.length >= 3 && draftData.palette.length <= 5

    return {
      brandNameValid,
      logoValid,
      toneValid,
      audienceValid,
      paletteValid,
      isValid:
        brandNameValid &&
        logoValid &&
        toneValid &&
        audienceValid &&
        paletteValid,
    }
  }, [draftData])

  console.log(draftData);

  const updateDraftField = (field, value) => {
    setDraftData((current) => ({
      ...current,
      [field]: value,
      updatedAt: current.updatedAt,
    }))
  }

  const updateDraftAsset = (field, asset) => {
    setDraftData((current) => ({
      ...current,
      [field]: asset,
    }))
  }

  const updateMascotBrief = (value) => {
    setDraftData((current) => ({
      ...current,
      mascot: {
        ...current.mascot,
        brief: value,
      },
    }))
  }

  const updateDraftReferences = (references) => {
    setDraftData((current) => ({
      ...current,
      references,
    }))
  }

  const handleAssetUpload = async (field, file) => {
    if (!isImageFile(file)) return

    try {
      setSaveError('')
      const asset = await uploadBrandImageAsset(file, {
        userId: user?.id,
        brandId: brandId || 'draft',
        kind: field,
      })
      updateDraftAsset(field, asset)
    } catch (error) {
      setSaveError(error?.message || 'Unable to upload the image right now.')
    }
  }

  const handleMascotGenerate = async () => {
    if (isMascotGenerating) return

    setIsMascotGenerating(true)
    setMascotError('')

    try {
      const result = await generateRunwayMascot({
        brandData: {
          brandName: draftData.brandName,
          tagline: draftData.tagline,
          tone: draftData.tone,
          audience: draftData.audience,
          palette: draftData.palette,
          logo: draftData.logo,
          mascot: draftData.mascot,
          references: draftData.references,
        },
      })

      const generatedMascotUrl = result.imageUrl || result.outputUrl || ''

      if (!generatedMascotUrl) {
        throw new Error('Runway did not return a mascot image URL.')
      }

      const generatedMascot = await uploadBrandImageAssetFromUrl(generatedMascotUrl, {
        userId: user?.id,
        brandId: brandId || 'draft',
        kind: 'mascot',
        fileName: `${draftData.brandName || 'Brand'} mascot.png`,
      })

      generatedMascot.brief = draftData.mascot?.brief || ''

      updateDraftAsset('mascot', generatedMascot)

      if (user?.id) {
        await saveGeneration({
          brandId: brandId || null,
          brandName: draftData.brandName,
          prompt: generatedMascot.brief || `Mascot for ${draftData.brandName || 'brand'}`,
          format: 'image',
          platform: 'mascot',
          include: ['Mascot'],
          outputUrl: generatedMascot.url,
          imageUrl: generatedMascot.url,
          title: `${draftData.brandName || 'Brand'} mascot`,
          summary: 'Generated mascot saved to My Stuff.',
          rawResponse: result,
        })
      }

      if (isEditMode) {
        const savedBrand = await persistBrandData(
          {
            ...draftData,
            mascot: generatedMascot,
            updatedAt: new Date().toISOString(),
          },
          brandId,
        )

        setDraftData(savedBrand)
      }

    } catch (error) {
      setMascotError(error?.message || 'Unable to generate a mascot right now.')
    } finally {
      setIsMascotGenerating(false)
    }
  }

  const handleReferenceUpload = async (files) => {
    try {
      const nextAssets = await Promise.all(
        files
          .filter(isImageFile)
          .map((file) => uploadBrandImageAsset(file, {
            userId: user?.id,
            brandId: brandId || 'draft',
            kind: 'reference',
          })),
      )

      if (nextAssets.length === 0) return

      updateDraftReferences([...draftData.references, ...nextAssets].slice(0, 6))
      setSaveError('')
    } catch (error) {
      setSaveError(error?.message || 'Unable to upload reference images right now.')
    }
  }

  const toggleAudience = (value) => {
    const nextAudience = draftData.audience.includes(value)
      ? draftData.audience.filter((item) => item !== value)
      : [...draftData.audience, value]

    updateDraftField('audience', nextAudience)
  }

  const openPaletteEditor = (index) => {
    if (!isEditing) return
    setActivePaletteIndex(index)
  }

  const handleAddColor = () => {
    if (!isEditing || draftData.palette.length >= 5) return
    const nextPalette = [...draftData.palette, '#CBA8FF']
    setDraftData((current) => ({
      ...current,
      palette: nextPalette,
    }))
    setActivePaletteIndex(nextPalette.length - 1)
  }

  const handlePaletteColorChange = (value) => {
    setDraftData((current) => ({
      ...current,
      palette: current.palette.map((item, index) =>
        index === activePaletteIndex ? value : item,
      ),
    }))
  }

  const handleRemoveColor = (index) => {
    if (draftData.palette.length <= 3) return
    setDraftData((current) => ({
      ...current,
      palette: current.palette.filter((_, itemIndex) => itemIndex !== index),
    }))
    setActivePaletteIndex(-1)
  }

  const saveAndContinue = async () => {
    setShowValidation(true)
    if (!validation.isValid) return

    setIsSaving(true)
    setSaveError('')

    try {
      const savedBrand = await persistBrandData(
        {
          ...draftData,
          completedSetup: true,
          updatedAt: new Date().toISOString(),
        },
        isEditMode ? brandId : null,
      )

      setActiveBrand(savedBrand.id)
      navigate('/create')
    } catch (err) {
      setSaveError(err?.message || 'Failed to save your brand. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageFrame className="p-3 sm:p-4 lg:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_96%_16%,rgba(148,163,184,0.30),transparent_20%),radial-gradient(circle_at_90%_6%,rgba(255,255,255,0.14),transparent_12%),radial-gradient(circle_at_100%_40%,rgba(148,163,184,0.14),transparent_24%)]" />
      <SetupShell>
        <div className="flex min-h-full flex-col">
          <div className="flex w-full justify-start">
            <BackButton />
          </div>
          <SetupHeaderSection />
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-end">
            {draftData.completedSetup && !isEditing ? (
              <button
                onClick={() => navigate('/brands')}
                className="inline-flex items-center gap-2 self-start rounded-[12px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[15px] font-medium text-[#e2e2e8] transition hover:border-[#B8C2FF] hover:bg-[#1D1E29] sm:self-auto"
              >
                <PencilLine className="h-4 w-4" />
                Back to Brands
              </button>
            ) : null}
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-2 xl:gap-5">
            <div id="step-1" className="scroll-mt-24 xl:col-span-2">
              <SetupIdentitySection
                brandName={draftData.brandName}
                logo={draftData.logo}
                mascot={draftData.mascot}
                mascotBrief={draftData.mascot?.brief || ''}
                isEditing={isEditing}
                brandNameError={
                  showValidation && !validation.brandNameValid
                    ? 'Add your brand name to continue.'
                    : ''
                }
                logoError={
                  showValidation && !validation.logoValid
                    ? 'Upload a logo before continuing.'
                    : ''
                }
                mascotError={mascotError}
                onBrandNameChange={(value) => updateDraftField('brandName', value)}
                onLogoUpload={(file) => handleAssetUpload('logo', file)}
                onMascotUpload={(file) => handleAssetUpload('mascot', file)}
                onMascotGenerate={handleMascotGenerate}
                onMascotBriefChange={updateMascotBrief}
                onLogoRemove={() => updateDraftAsset('logo', createEmptyAsset())}
                onMascotRemove={() => updateDraftAsset('mascot', createEmptyAsset())}
                isMascotGenerating={isMascotGenerating}
              />
            </div>

            <div id="step-2" className="scroll-mt-24">
              <SetupPersonalitySection
                tagline={draftData.tagline}
                tone={draftData.tone}
                toneOptions={toneOptions}
                isEditing={isEditing}
                toneError={
                  showValidation && !validation.toneValid
                    ? 'Select the tone that best represents your brand.'
                    : ''
                }
                onTaglineChange={(value) => updateDraftField('tagline', value)}
                onToneChange={(value) => updateDraftField('tone', value)}
              />
            </div>

            <div id="step-4" className="scroll-mt-24">
              <SetupAudienceSection
                audienceOptions={audienceOptions}
                selectedAudience={draftData.audience}
                isEditing={isEditing}
                audienceError={
                  showValidation && !validation.audienceValid
                    ? 'Choose at least one audience segment.'
                    : ''
                }
                onAudienceToggle={toggleAudience}
              />
            </div>

            <div id="step-3" className="scroll-mt-24 xl:col-span-2">
              <SetupVisualStyleSection
                palette={draftData.palette}
                references={draftData.references}
                isEditing={isEditing}
                paletteError={
                  showValidation && !validation.paletteValid
                    ? 'Choose between 3 and 5 brand colors.'
                    : ''
                }
                activePaletteIndex={activePaletteIndex}
                onAddPaletteColor={handleAddColor}
                onUpdatePaletteColor={openPaletteEditor}
                onRemovePaletteColor={handleRemoveColor}
                onPaletteEditorClose={() => setActivePaletteIndex(-1)}
                onPaletteColorChange={handlePaletteColorChange}
                onReferenceUpload={handleReferenceUpload}
                onReferenceRemove={(index) =>
                  updateDraftReferences(
                    draftData.references.filter((_, itemIndex) => itemIndex !== index),
                  )
                }
              />
            </div>
          </div>

          <div className="mt-auto pt-6">
            {!validation.isValid && showValidation ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                Complete the required brand details before continuing.
              </div>
            ) : null}
            {error ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                {error}
              </div>
            ) : null}
            {saveError ? (
              <div className="mb-4 rounded-[16px] border border-[#2C2D3C] bg-[#111219] px-4 py-3 text-[14px] text-[#b15576] ">
                {saveError}
              </div>
            ) : null}
            <button
              onClick={saveAndContinue}
              disabled={!validation.isValid}
              className={`flex min-h-[58px] w-full items-center justify-center gap-3 rounded-[12px] px-6 py-4 text-center text-[20px] font-semibold tracking-[-0.02em] shadow-[0_18px_48px_rgba(184,194,255,0.18)] transition duration-300 sm:px-8 sm:text-[21px] ${validation.isValid
                ? 'bg-[#B8C2FF] text-[#131318] hover:-translate-y-0.5 hover:bg-[#C3C8FF] hover:shadow-[0_22px_58px_rgba(184,194,255,0.24)] active:scale-[0.995]'
                : 'cursor-not-allowed bg-[#B8C2FF]/55 text-[#131318]/70 shadow-none'
                }`}
            >
              {isSaving ? 'Saving brand...' : 'Save Brand & Start Creating'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </SetupShell>
    </PageFrame>
  )
}

function SetupPage() {
  const navigate = useNavigate()
  const { brandId } = useParams()
  const isEditMode = Boolean(brandId)
  const { user, brands, loading, error, persistBrandData, setActiveBrand } = useBrandStorage()
  const { saveGeneration } = useGenerationStorage(user)

  const selectedBrand = useMemo(() => {
    if (!isEditMode) return null
    return brands.find((item) => item.id === brandId) || null
  }, [brandId, brands, isEditMode])

  if (loading) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <div className="flex w-full justify-start">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-4 rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
            Loading your brand workspace...
          </div>
        </div>
      </PageFrame>
    )
  }

  if (!user) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <div className="flex w-full justify-start">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-4 rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
            Please sign in to create and manage your brands.
          </div>
        </div>
      </PageFrame>
    )
  }

  if (isEditMode && !selectedBrand) {
    return (
      <PageFrame className="p-6 sm:p-8">
        <div className="relative z-10 mx-auto w-full max-w-[900px]">
          <div className="flex w-full justify-start">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#B8C2FF] text-[#131318] transition-all duration-200 hover:scale-[1.03] hover:bg-[#C3C8FF] active:scale-[0.98]"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-4 rounded-[20px] border border-[#2C2D3C] bg-[#111219] p-6 text-[#e2e2e8]  sm:p-8">
            <p>This brand no longer exists in your account.</p>
            <button
              onClick={() => navigate('/brands')}
              className="mt-4 inline-flex items-center gap-2 rounded-[12px] border border-[#2C2D3C] bg-[#1D1E29] px-4 py-2 text-[14px] font-medium text-[#e2e2e8]"
            >
              Back to Brands
            </button>
          </div>
        </div>
      </PageFrame>
    )
  }

  return (
    <BrandSetupEditor
      key={brandId || 'new'}
      initialDraft={selectedBrand || createDefaultBrandData()}
      isEditMode={isEditMode}
      brandId={brandId}
      navigate={navigate}
      persistBrandData={persistBrandData}
      setActiveBrand={setActiveBrand}
      user={user}
      saveGeneration={saveGeneration}
      error={error}
    />
  )
}

export default SetupPage