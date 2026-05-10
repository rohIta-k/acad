const FORMAT_RULES = {
  video: {
    output:
      "Continuous cinematic video sequence",

    language:
      "cinematography",

    structure:
      "Single visually coherent sequence with smooth environmental evolution",

    transitions:
      "No abrupt cuts or disconnected progression",

    ending:
      "Natural cinematic resolution with smooth visual fade",

    pacing:
      "Emotionally immersive visual pacing",

    forbidden: [
      "graphic design language",
      "readable body copy",
      "abrupt transitions",
      "hard endings",
    ],
  },

  image: {
    output:
      "Single cinematic still frame",

    language:
      "photography",

    structure:
      "One emotionally self-contained composition",

    forbidden: [
      "motion language",
      "scene progression",
      "layout terminology",
      "multi-scene storytelling",
    ],
  },

  poster: {
    output:
      "Complete cinematic advertising poster",

    language:
      "advertising design",

    structure:
      "Integrated visual and typography composition",

    typography:
      "Short impactful text only",

    composition:
      "Strong hierarchy and readability",

    forbidden: [
      "long copy",
      "cluttered layouts",
      "weak text contrast",
      "multiple headline focuses",
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

${
  rules.transitions
    ? `
Transitions:
${rules.transitions}
`
    : ""
}

${
  rules.ending
    ? `
Ending:
${rules.ending}
`
    : ""
}

${
  rules.pacing
    ? `
Pacing:
${rules.pacing}
`
    : ""
}

${
  rules.typography
    ? `
Typography:
${rules.typography}
`
    : ""
}

${
  rules.composition
    ? `
Composition:
${rules.composition}
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