const PLATFORM_RULES = {
  instagram_reel: {
    aspect_ratio: '9:16',

    platform_behavior:
      'Vertical cinematic format optimized for mobile reel viewing.',
  },
  instagram_post: {
    aspect_ratio: '1:1',

    platform_behavior:
      'Square feed composition optimized for social engagement.',
  },
  tiktok_short: {
    aspect_ratio: '9:16',
    platform_behavior:
      'Fast-paced vertical short format optimized for attention retention.',
  },

  youtube_ad: {
    aspect_ratio: '16:9',

    platform_behavior:
      'Cinematic widescreen format optimized for landscape viewing.',
  },

  billboard: {
    aspect_ratio: '21:9',

    platform_behavior:
      'Wide outdoor composition optimized for distant readability.',
  },

  whatsapp_status: {
    aspect_ratio: '9:16',

    platform_behavior:
      'Vertical mobile-first format optimized for quick viewing.',
  },

  linkedin: {
    aspect_ratio: '1:1',

    platform_behavior:
      'Professional square format optimized for business audiences.',
  },

  linkedin: {
    aspect_ratio: "16:9",

    platform_behavior:
      "Professional, business-focused presentation optimized for feed and in-stream viewing; prioritize clear messaging, readable captions, and restrained visual effects. Use subtle motion, maintain brand credibility, avoid overly casual slang or sensationalism, and ensure text remains legible on desktop and mobile. Prefer 16:9 widescreen or 1:1 square for feed placements.",
  },
}

function arrayToBulletList(items = []) {
  return items.map((item) => `- ${item}`).join("\n")
}

function buildPlatformRulesPrompt(platform) {
  const rules = PLATFORM_RULES[platform]

  if (!rules) {
    return ""
  }

  return `
PLATFORM RULES

TARGET PLATFORM:
${platform}

ASPECT RATIO:
${rules.aspect_ratio}

PLATFORM BEHAVIOR:
${rules.platform_behavior}

You MUST obey all platform composition constraints strictly.
`
}

module.exports = {
  PLATFORM_RULES,
  buildPlatformRulesPrompt,
}