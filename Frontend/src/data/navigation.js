import {
  Clapperboard,
  Image,
  Instagram,
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
]

export const platformOptions = [
  { id: 'billboard', label: 'Billboard', icon: PanelsTopLeft, videoRatio: '1280:720', imageRatio: '1808:768', previewWidth: '100%' },
  { id: 'instagram_reel', label: 'Insta Reel', icon: Instagram, videoRatio: '720:1280', imageRatio: '1080:1920', previewWidth: '320px' },
  { id: 'instagram_post', label: 'Insta Post', icon: Instagram, videoRatio: '720:1280', imageRatio: '1080:1080', previewWidth: '420px' },
  { id: 'tiktok_short', label: 'TikTok Short', icon: Music2, videoRatio: '720:1280', imageRatio: '1080:1920', previewWidth: '320px' },
  { id: 'youtube_ad', label: 'YouTube', icon: Youtube, videoRatio: '1280:720', imageRatio: '1920:1080', previewWidth: '100%' },
  { id: 'whatsapp_status', label: 'WhatsApp', icon: MessageCircle, videoRatio: '720:1280', imageRatio: '1080:1920', previewWidth: '320px' },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, videoRatio: '1280:720', imageRatio: '1920:1080', previewWidth: '100%' },
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
