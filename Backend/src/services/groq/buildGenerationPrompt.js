const { buildFormatRulesPrompt } = require("./formatRules");

const { buildPlatformRulesPrompt } = require("./platformRules");

const { buildAudioRulesPrompt } = require("./audioRules");

function arrayToBulletList(items = []) {
  return items.map((item) => `- ${item}`).join("\n");
}

async function buildGenerationPrompt({
  idea,
  format,
  platform,
  duration,
  include = [],
  brandData = {},
}) {
  const formatRules =
    buildFormatRulesPrompt(format);

  const platformRules =
    buildPlatformRulesPrompt(platform);

  const audioRules =
    await buildAudioRulesPrompt({
      idea,
      brandData,
      include,
    });

  return `
You are an elite AI commercial director.
Generate a structured cinematic generation plan for Runway.

USER IDEA:
${idea}

BRAND DNA

Name: ${brandData?.brandName || "Unknown"}
Tagline: ${brandData?.tagline || "None"}
Tone: ${brandData?.tone || "Neutral"}

Audience:
${brandData?.audience?.join(", ") ||
    "General"
    }

Colors:
${brandData?.palette?.join(", ") ||
    "Not specified"
    }

LOGO:
${brandData?.logo?.dataUrl
      ? "Logo reference attached"
      : "None"
    }

MASCOT:
${brandData?.mascot?.dataUrl
      ? "Mascot reference attached"
      : "None"
    }

REFERENCES:
${brandData?.references?.length
      ? "Reference style images attached. Use only for mood and aesthetic inspiration."
      : "None"
    }

INCLUDE:
${include.length
      ? include.join(", ")
      : "None"
    }

FORMAT RULES:
${formatRules}

PLATFORM RULES:
${platformRules}

AUDIO RULES:
${audioRules}

GLOBAL OUTPUT RULES
- RETURN ONLY THE FINAL OPTIMIZED RUNWAY PROMPT.
- No markdown
- No explanations
- No labels
- No bullet points in the final output
- All prompts must be generation-ready
- Use technical cinematic language
- Keep outputs visually coherent
- Keep the final prompt concise: under 120 words and under 1000 characters.
- "include" reflects requested brand elements

VIDEO OUTPUT
{
  "type": "video",

  "runway": {
    "model": string,
    "frameRatio": string
  },

  "audio": {
    "mode": string,
    "voiceStyle": string | null,
    "musicMood": string | null
  },

  "include": {
    "logo": boolean,
    "mascot": boolean,
    "tagline": boolean,
    "product": boolean,
    "brandColors": boolean
  },

  "continuity": {
    "maintainCharacterConsistency": boolean,
    "maintainLightingConsistency": boolean,
    "maintainColorPaletteConsistency": boolean
  },

  "output": {
    "creativeDirection": string,

    "scenes": [
      {
        "sceneType": string,
        "goal": string,
        "direction": string
      }
    ]
  }
}

IMAGE OUTPUT
{
  "type": "image",

  "runway": {
    "model": string,
    "frameRatio": string
  },

  "include": {
    "logo": boolean,
    "mascot": boolean,
    "tagline": boolean,
    "product": boolean,
    "brandColors": boolean
  },

  "output": {
    "imageType": string,
    "creativeDirection": string,
    "prompt": string
  }
}

POSTER OUTPUT
{
  "type": "poster",

  "runway": {
    "model": string,
    "frameRatio": string
  },

  "include": {
    "logo": boolean,
    "mascot": boolean,
    "tagline": boolean,
    "product": boolean,
    "brandColors": boolean
  },

  "output": {
    "posterType": string,

    "creativeDirection": string,

    "text": {
      "headline": {
        "content": string,
        "position": string
      },

      "subheadline": {
        "content": string,
        "position": string
      },

      "cta": {
        "content": string,
        "position": string
      }
    },

    "prompt": string
  }
}
`;
}

module.exports = {
  buildGenerationPrompt,
};