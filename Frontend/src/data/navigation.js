import {
  Circle,
  Clapperboard,
  Image,
  Instagram,
  LayoutPanelLeft,
  Linkedin,
  Play,
  Sparkles,
  Youtube,
  PanelsTopLeft,
  Music2,
  MessageCircle,
} from 'lucide-react'

export const sidebarSteps = [
  { id: 1, label: 'Identity' },
  { id: 2, label: 'Personality' },
  { id: 3, label: 'Visual style' },
  { id: 4, label: 'Audience' },
]

export const formatOptions = [
  { id: 'video', label: 'Video', icon: Play },
  { id: 'image', label: 'Image', icon: Image },
  { id: 'poster', label: 'Poster', icon: LayoutPanelLeft },
]

export const platformOptions = [
  { id: 'billboard', label: 'Billboard', icon: PanelsTopLeft },
  { id: 'instagram-reel', label: 'Insta Reel', icon: Instagram },
  { id: 'instagram-post', label: 'Insta Post', icon: Instagram },
  { id: 'tiktok-short', label: 'TikTok Short', icon: Music2 },
  { id: 'youtube-ad', label: 'YouTube', icon: Youtube },
  { id: 'whatsapp-status', label: 'WhatsApp', icon: MessageCircle },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
]

export const profileMenuItems = [
  'Profile',
  'Brand settings',
  'Sign out',
]

export const footerStatus = {
  system: 'SYSTEM OPERATIONAL',
  latency: 'LATENCY 14MS',
  copyright: '© 2024 BRANDFORGE STUDIO',
}

export const landingFeatures = [
  {
    tint: 'violet',
    label: 'STYLE',
    title: 'Cyberpunk Gen-Z',
    meta: 'High Contrast • Neon',
    icon: Sparkles,
  },
  {
    tint: 'amber',
    label: 'ENGINE',
    title: 'Runway Gen-4',
    meta: 'Neural Synthesis v2',
    icon: Clapperboard,
  },
  {
    tint: 'sky',
    label: 'EXPORT',
    title: '→ TikTok Ready',
    meta: '9:16 Vertical • H.265',
    icon: Play,
  },
]
