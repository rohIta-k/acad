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

TITLE RULE:
Prefer no visible text at all.
Only include a brand title when it is explicitly needed by the brief or requested in the include list.
If a title is necessary, keep it small, physical, and naturally integrated into the product or environment.
Never add taglines, captions, subtitles, signs, labels, numbers, URLs, or extra words.

WRONG: "brand name visible in frame"
RIGHT: "a small engraved title on the product base"
RIGHT: "a subtle embossed brand title on the packaging edge"

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

HARD RULES:
- Never use vague words: beautiful, stunning, amazing
- Never describe multiple scenes — one frame only
- One hero subject — no cluttered compositions
- Never say text, typography, overlay, logo, caption, subtitle, URL, sign, label, or watermark
- Translate brand tone, palette, audience into 
  cinematic language — never list them literally
- Brand title should only appear when explicitly necessary
- Mascot only appears if in include list
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

function getAssetUrl(asset) {
  return asset?.url || asset?.dataUrl || "";
}

function hasIncludeItem(include = [], value) {
  const target = String(value).trim().toLowerCase();

  return Array.isArray(include) && include.some((item) => String(item).trim().toLowerCase() === target);
}

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
Generate a structured cinematic generation plan for a premium live-action Runway commercial.

USER IDEA:
${idea}

BRAND DNA

Name: ${brandData?.brandName || "Unknown"}
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
${getAssetUrl(brandData?.logo)
      ? "Logo reference attached"
      : "None"
    }

    MASCOT:
    ${hasIncludeItem(include, "Mascot") && getAssetUrl(brandData?.mascot)
      ? "Mascot reference attached"
      : "None"
    }

REFERENCES:
${brandData?.references?.length
      ? `
Reference style images attached:

${brandData.references
        .map(
          (item, index) =>
            `- Reference ${index + 1}: ${item.url || item.dataUrl || "No reference"}`
        )
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
- Keep outputs visually coherent, cinematic, and commercially impactful
- Make the ad feel like real camera-captured footage, not AI-generated footage
- Favor believable motion, practical lighting, natural product handling, and realistic textures over synthetic, glossy AI visuals
- Keep creativeDirection and direction compact while still covering all required cinematic details
- The audience should immediately understand what brand or product is being advertised
- DO NOT describe scenes that feature UI interfaces, software dashboards, computer screens, books, signs, or any objects that naturally contain text. The video generation model will hallucinate gibberish text on these objects. Focus on cinematic live-action, products, people, or abstract environments instead of digital interfaces.
- The product itself must remain visually dominant and clearly noticeable without relying on any written text.
- Understand the target audience not only from the provided audience field, but also from the product type, industry category, product behavior, brand tone, and overall brand identity
- Adapt the cinematic direction, pacing, emotional energy, visual style, transitions, and branding moments according to how the target audience would emotionally connect with the product
- If reference images are provided, analyze their cinematic intent, composition style, lighting behavior, emotional energy, pacing, atmosphere, framing language, and storytelling approach
- Use references only as creative inspiration for cinematic quality, mood, storytelling style, or visual direction
- NEVER directly copy compositions, subjects, poses, typography placement, layouts, environments, or exact scenes from references
- The final output must remain original while capturing a similar emotional and cinematic impact inspired by the references
- NEVER instruct the video or image model to draw, spell, or overlay any literal text, brand names, letters, or taglines on the screen. Text rendering causes severe spelling hallucinations in diffusion models. Rely entirely on the visual atmosphere, product focus, and reference images to convey brand identity.
- Any references to the brand identity in your prompt must describe visual mood and aesthetic, NOT literal on-screen text overlays.
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
- Make the ad feel like a realistic premium commercial shot on real cinema cameras, not like AI-generated footage
- Keep the entire product fully visible in the hero moments, even for very short durations; do not rely on extreme crops, fancy angles, or partial obscuring of the product
- For longer videos, progress through a clear range of angles such as front hero, three-quarter, side, close-up detail, and environmental coverage while keeping the product readable and continuous
- End with a smooth, resolved final frame or gentle fade-out rather than an abrupt stop
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