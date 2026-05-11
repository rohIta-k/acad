const FORMAT_RULES = {
  video: {
    output:
      "Single continuous cinematic advertisement structured as Hook → Story → CTA",

    language:
      "cinematography",

    structure:
      "Single continuous cinematic advertisement with smooth progression through Hook → Story → CTA while maintaining one unified visual world, emotional tone, and cinematic identity throughout the entire sequence",

    hook:
      "Opening must immediately capture attention within the first visual beat using strong motion, composition, lighting, emotional intrigue, or visually striking product introduction",

    story:
      "Middle section must visually communicate the product, brand emotion, transformation, usage, or lifestyle connection while maintaining cinematic continuity and narrative progression",

    cta:
      "Ending must clearly reinforce the product and brand identity with a polished cinematic closing frame that feels emotionally satisfying and commercially impactful",

    productCoverage:
      "The product, brand identity, or key subject must feel fully explored, visually understood, and emotionally connected to the audience by the end of the advertisement",

    transitions:
      "All scene transitions must feel seamlessly connected as part of one continuous advertisement. Camera motion, lighting, pacing, environment evolution, subject positioning, and emotional progression should transition naturally without hard cuts, disconnected framing, or abrupt visual changes",

    singleVideoExperience:
      "Even when multiple cinematic shots or sequences are used, the final result must feel like one cohesive advertisement instead of separate clips stitched together",

    ending:
      "Ending should feel visually complete, emotionally resolved, and naturally cinematic instead of abruptly stopping",

    pacing:
      "Pacing should remain emotionally immersive regardless of video duration. Even very short ads must still establish hook, story progression, emotional continuity, and CTA clarity",

    continuity:
      "Maintain consistency in lighting, tone, environment, character appearance, product design, camera language, color grading, and cinematic style throughout the full advertisement",

    branding:
      "Brand identity, product presence, logo, tagline, and brand colors should feel naturally integrated into the cinematic world while remaining visually recognizable and commercially clear",

    realism:
      "Visuals should feel premium, cinematic, emotionally immersive, and physically believable instead of generic AI imagery or abstract visual chaos",

    forbidden: [
      "graphic design language",
      "readable body copy",
      "abrupt transitions",
      "hard endings",
      "disconnected scenes",
      "unfinished product presentation",
      "random visual progression",
      "multiple unrelated visual styles",
      "visually inconsistent environments",
      "generic AI aesthetics",
      "sudden camera discontinuity",
      "unnatural pacing",
    ],
  },

  image: {
    output:
      "Single cinematic still frame",

    language:
      "cinematic photography",

    structure:
      "One visually complete composition focused on emotional impact, product presentation, and cinematic realism",

    framing:
      "Composition should immediately direct focus toward the main subject or product using strong framing, depth, scale, or lighting",

    subjectFocus:
      "The product, character, or key subject must feel visually dominant and clearly understood within a single frame",

    atmosphere:
      "Use lighting, environment, texture, and color grading to establish a strong emotional atmosphere",

    realism:
      "Visuals should feel polished, premium, cinematic, and believable instead of abstract or overly artificial",

    continuity:
      "All visual elements should feel stylistically unified within the frame",

    typography:
      "Any text, tagline, logo, or branding element must feel naturally integrated into the composition without overpowering the primary subject",

    textPlacement:
      "Text should support the composition using clean placement, strong readability, and balanced spacing while preserving the visual focus of the image",

    textHierarchy:
      "Typography should remain visually secondary to the main cinematic subject unless the concept intentionally revolves around the text itself",

    forbidden: [
      "motion language",
      "scene progression",
      "layout terminology",
      "multi-scene storytelling",
      "cluttered composition",
      "weak focal hierarchy",
      "unfinished framing",
      "text blocking the main subject",
      "oversized typography",
      "poor text readability",
      "random text placement",
    ],
  },
}

function bullet(items = []) {
  return items.map((item) => `- ${item}`).join("\n")
}

function buildFormatRulesPrompt(format = "video") {
  const rules = FORMAT_RULES[format]

  if (!rules) {
    throw new Error(
      `Unsupported format: ${format}`
    )
  }

  return `
FORMAT RULES

Output:
${rules.output}

Visual Language:
${rules.language}

Structure:
${rules.structure}

${rules.hook
      ? `
Hook:
${rules.hook}
`
      : ""
    }

${rules.story
      ? `
Story:
${rules.story}
`
      : ""
    }

${rules.cta
      ? `
CTA:
${rules.cta}
`
      : ""
    }

${rules.productCoverage
      ? `
Product Coverage:
${rules.productCoverage}
`
      : ""
    }

${rules.framing
      ? `
Framing:
${rules.framing}
`
      : ""
    }

${rules.subjectFocus
      ? `
Subject Focus:
${rules.subjectFocus}
`
      : ""
    }

${rules.atmosphere
      ? `
Atmosphere:
${rules.atmosphere}
`
      : ""
    }

${rules.realism
      ? `
Realism:
${rules.realism}
`
      : ""
    }

${rules.transitions
      ? `
Transitions:
${rules.transitions}
`
      : ""
    }

${rules.ending
      ? `
Ending:
${rules.ending}
`
      : ""
    }

${rules.pacing
      ? `
Pacing:
${rules.pacing}
`
      : ""
    }

${rules.continuity
      ? `
Continuity:
${rules.continuity}
`
      : ""
    }

${rules.typography
      ? `
Typography:
${rules.typography}
`
      : ""
    }

${rules.composition
      ? `
Composition:
${rules.composition}
`
      : ""
    }

${rules.branding
      ? `
Branding:
${rules.branding}
`
      : ""
    }

${rules.readability
      ? `
Readability:
${rules.readability}
`
      : ""
    }

${rules.cinematicFeel
      ? `
Cinematic Feel:
${rules.cinematicFeel}
`
      : ""
    }

Forbidden:
${bullet(rules.forbidden)}
`
}

module.exports = {
  FORMAT_RULES,
  buildFormatRulesPrompt,
}