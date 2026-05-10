export const toneOptions = [
  'Professional',
  'Playful',
  'Emotional',
  'Bold',
  'Minimal',
]

export const audienceOptions = [
  'Gen Z',
  'Families',
  'Professionals',
  'Entrepreneurs',
  'Creators',
  'Other',
]

export const includeOptions = [
  'Logo',
  'Mascot',
  'Tagline',
  'Color palette',
]

export const defaultPalette = ['#B88CFF', '#FF7EB6', '#1A1B2E', '#F2F0FF']

export const paletteGradientMap = {
  '#B88CFF': 'bg-[linear-gradient(135deg,#8c5cff_0%,#d4bcff_100%)]',
  '#FF7EB6': 'bg-[linear-gradient(135deg,#ff73b3_0%,#ffa9cf_100%)]',
  '#1A1B2E': 'bg-[linear-gradient(135deg,#17183a_0%,#272a48_100%)]',
  '#F2F0FF': 'bg-[linear-gradient(135deg,#f7f5ff_0%,#efecff_100%)]',
}

export function createEmptyAsset() {
  return {
    fileName: '',
    fileType: '',
    dataUrl: '',
    brief: '',
  }
}

export function createDefaultBrandData() {
  return {
    brandName: '',
    tagline: '',
    tone: '',
    palette: defaultPalette,
    audience: [],
    logo: createEmptyAsset(),
    mascot: createEmptyAsset(),
    references: [],
    completedSetup: false,
    updatedAt: '',
  }
}
