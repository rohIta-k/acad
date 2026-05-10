const PLATFORM_RULES = {
  instagram_reel: {
    aspect_ratio: "9:16",

    platform_behavior:
      "Vertical social-first cinematic framing optimized for mobile viewing.",
  },

  youtube_ad: {
    aspect_ratio: "16:9",

    platform_behavior:
      "Cinematic widescreen composition optimized for landscape video consumption.",
  },

  billboard: {
    aspect_ratio: "21:9",

    platform_behavior:
      "Large-scale outdoor advertising composition optimized for distant readability.",
  },

  instagram_post: {
    aspect_ratio: "1:1",

    platform_behavior:
      "Square social composition optimized for feed visibility.",
  },

  whatsapp_status: {
    aspect_ratio: "9:16",

    platform_behavior:
      "Vertical mobile-first share format optimized for immediate readability.",
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