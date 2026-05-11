const IMAGE_RULES = `
IMAGE RULES

OUTPUT:
- Single cinematic paragraph
- Maximum 700 characters
- Written as a cinematographer describing a film still
- No bullet points, no headers

STRUCTURE (fit within 700 characters):
1. Hero shot — the single strongest visual moment, 
   product as primary subject
2. Environment + lighting — specific, sensory, precise
3. Camera — lens, depth of field, angle
4. Color grade — translate brand palette into 
   cinematic color language naturally
5. Mood — one line, what the viewer feels

BRAND NAME RULE:
The brand name MUST always appear literally in the scene
regardless of the include list.
Place it on a physical surface natural to the scene:
- product label, packaging, cup sleeve
- storefront sign, chalkboard, neon sign
- embossed surface, engraved object

WRONG: "brand name visible in frame"
RIGHT: "'Chai Co.' hand-lettered on the clay cup surface"
RIGHT: "'Chai Co.' etched into the wooden storefront"

CONDITIONAL INCLUDES:
Only write the following if they appear in the INCLUDE LIST.
If they are not in the include list, ignore them completely.

MASCOT (only if "mascot" in include list):
- Describe the mascot as a physical character 
  present in the scene
- Give it a natural role — holding the product, 
  sitting beside it, reacting to the environment
- Describe its appearance, expression, and position
  in the frame specifically
- It must feel like it belongs in the scene,
  not placed on top of it
- Use the mascot reference image for visual consistency

WRONG: "mascot visible in corner"
RIGHT: "a small illustrated bear in a warm kurta 
        sits beside the cup, both hands wrapped 
        around it, eyes closed, content"

TAGLINE (only if "tagline" in include list):
- Place the tagline on a physical surface that 
  exists naturally in the scene
- The surface must have enough contrast for 
  the tagline to feel readable
- Describe the surface and how the tagline 
  sits on it — not just that it exists

WRONG: "tagline displayed in frame"
RIGHT: "'Every cup, a story.' chalked on the 
        dark wooden board behind the counter"
RIGHT: "'Every cup, a story.' printed on the 
        paper sleeve wrapped around the cup"

HARD RULES:
- Never use vague words: beautiful, stunning, amazing
- Never describe multiple scenes — one frame only
- One hero subject — no cluttered compositions
- Never say text, typography, overlay, or logo
- Translate brand tone, palette, audience into 
  cinematic language — never list them literally
- Brand name is always included regardless of list
- Mascot and tagline only appear if in include list
- Everything else in the include list — translate 
  into cinematic presence, not literal description

  PRODUCT FOCUS RULE:
The product is ALWAYS the primary visual subject of the frame.
Every other element — mascot, environment, lighting, subject — 
exists only to support and elevate the product.
The product must be:
- The largest or most prominent element in the frame
- Placed at or near the optical center
- The sharpest element in the frame
- The first thing the eye lands on

WRONG: "family gathered around a table with chai in background"
WRONG: "mascot standing in kitchen holding a cup offscreen"
WRONG: "warm Diwali scene with product visible on the side"

RIGHT: "a clay Chai Co. cup dominates the foreground, 
        razor sharp, steam rising — everything else 
        falls into soft bokeh behind it"
RIGHT: "the product fills the lower two-thirds of the frame,
        mascot leaning in from the right edge, 
        eyes drawn to the cup"

If the scene ever competes with the product for 
visual attention — rebuild the composition 
so the product wins.
`;
const { buildFormatRulesPrompt } = require("./formatRules");
const { buildPlatformRulesPrompt } = require("./platformRules");

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
      ? `
Reference style images attached:

${brandData.references
        .map((item, index) => `- Reference ${index + 1}: ${item.url}`)
        .join("\n")}

Capture a similar cinematic vibe, emotional tone, lighting style, composition energy, and visual atmosphere inspired by these references, but NEVER directly copy compositions, characters, layouts, or exact scenes.
`
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

GLOBAL OUTPUT RULES
- Return ONLY valid JSON matching the required schema
- Do NOT return markdown
- Do NOT wrap JSON in code blocks
- Do NOT include explanations outside the JSON
- All JSON must be fully parseable using JSON.parse()
- Use double quotes for all property names and strings
- Escape internal quotation marks properly
- Keep outputs visually coherent and cinematic
- Use technical cinematic language
- "include" reflects requested brand elements
- The brand name must remain visually noticeable and feel like the central advertised identity
- Branding should feel naturally integrated into the cinematic composition instead of artificially pasted on
- The audience should immediately understand what brand or product is being advertised
- Avoid unnecessarily long descriptions or repetitive cinematic explanations
- creativeDirection and direction outputs must remain compact while still covering all required cinematic details
- Understand the target audience not only from the provided audience field, but also from the product type, product behavior, industry category, brand tone, and overall brand identity
- The cinematic direction, pacing, visual style, emotional energy, transitions, and branding moments should feel naturally designed for the most relevant audience likely to engage with the product
- Adapt the advertisement creatively according to how the target audience would emotionally respond to the product, while still maintaining the provided brand tone and identity

VIDEO OUTPUT
{
  "type": "video",

  "runway": {
    "frameRatio": string
  },

  "output": {

    "includes": string,
    "direction": string
  }
}

VIDEO OUTPUT RULES

- The output must represent ONE continuous cinematic advertisement instead of disconnected scenes
- Multiple shots, transitions, framing changes, and environment progressions are allowed, but the final result must feel like one cohesive film
- Hook, story progression, and CTA moments should flow naturally within the cinematic sequence
- The advertisement should feel intentionally paced according to the requested duration
- Product reveals, branding moments, emotional peaks, and CTA moments should appear progressively throughout the advertisement
- Avoid repetitive actions, repetitive camera movement, static progression, filler shots, or generic advertisements
- Use the provided brand tone, audience, palette, logo, mascot, references, and overall brand DNA to creatively design the advertisement like a premium brand director
- The sequence should feel visually evolving, attention-grabbing, commercially impactful, and creatively distinct from beginning to end

- includes:
  - Must be a single readable string
  - Preserve the exact requested brand elements provided by the user without adding new branding elements
  - Example:
    "Should include Logo, Product, Tagline, and Brand Colors"

direction: 
- The FIRST line must summarize the overall cinematic story and visual progression 
- Remaining lines must describe the cinematic execution 
- Focus on impactful visual actions, environmental interactions, transitions, product moments, and memorable cinematic progression instead of excessive adjectives 
- Describe camera movement, transitions, lighting, pacing, atmosphere, product focus, subject behavior, CTA reveal, and ending frame 
- Every shot should feel creatively designed around the brand inputs and emotional tone 
- Keep the cinematic flow visually evolving, emotionally engaging, and commercially impactful 
- Keep it concise, visually dense, and production-oriented 
- Strictly should be above 400 characters and not exceed 700 characters or 7 lines.

IMAGE OUTPUT

{
  "type": "image",

  "runway": {
    "model": string,
    "frameRatio": string
  },
  "output": {
  "includes": string,
    "creativeDirection": string
  }
}

${IMAGE_RULES}
`;
}

module.exports = {
  buildGenerationPrompt,
};