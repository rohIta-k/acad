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
  { id: 'billboard', label: 'Billboard', icon: PanelsTopLeft, ratio: '21:9' },
  { id: 'instagram_reel', label: 'Insta Reel', icon: Instagram, ratio: '9:16' },
  { id: 'instagram_post', label: 'Insta Post', icon: Instagram, ratio: '1:1' },
  { id: 'tiktok_short', label: 'TikTok Short', icon: Music2, ratio: '9:16' },
  { id: 'youtube_ad', label: 'YouTube', icon: Youtube, ratio: '16:9' },
  { id: 'whatsapp_status', label: 'WhatsApp', icon: MessageCircle, ratio: '9:16' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin,ratio: '1:1' },
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
    meta: 'Cinematic Motion Render',
    icon: Clapperboard,
  },
  {
    tint: 'sky',
    label: 'EXPORT',
    title: '→ TikTok Ready',
    meta: '21:9 • 4K ProRes',
    icon: Play,
  },
]
