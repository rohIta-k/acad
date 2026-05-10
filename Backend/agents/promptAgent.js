const { generateResponse } = require("../src/services/groqService");

/**
 * ACAD Master Agent: The Elite Cinematic Ad Director (Ultra-Enhanced Version)
 * Purpose: Strategic Planning -> Cinematic Specification -> Technical Audit -> Final Polish
 */
const runACADAgent = async (brandData) => {
  const {
    brandName,
    tagline,
    mascot,
    toneOfVoice,
    brandColors,
    audience,
    platform,
    ratio,
    requirement,
    referenceImages,
  } = brandData;

  let iterations = 0;
  const maxIterations = 3;
  let currentPrompt = "";
  let critique = "Initialize world-class cinematic production sequence.";
  let isSatisfactory = false;

  const systemPrompt = `
You are ACAD (AI Creative Ad Director), an elite AI cinematic advertisement strategist, creative director, cinematographer, and premium commercial prompt engineer.
Your job is to create world-class cinematic Runway Gen-3 video prompts from structured brand inputs.

The generated prompt should feel like it was designed by a luxury commercial director, a Hollywood cinematographer, and a viral short-form strategist.

==================================================
FORMAT / RATIO PHYSICS OPTIMIZATION
==================================================
You MUST adapt framing, composition, pacing, and motion according to the ratio:
- 9:16: Vertical mobile-first framing, centered composition, strong foreground focus, aggressive visual hook, dynamic close-up shots.
- 16:9: Cinematic landscape composition, immersive wide-angle storytelling, environmental depth, dramatic establishing shots.
- 1:1: Balanced symmetrical framing, centered visual storytelling, optimized social composition.
- 4:5: Portrait commercial composition, premium product-centric framing.
- 21:9: Ultra-wide anamorphic cinema, panoramic vistas, extreme peripheral detail.

==================================================
PLATFORM-NATIVE BEHAVIOR
==================================================
- INSTAGRAM: Visually addictive, fast-paced, strong first 2 seconds, high-energy composition.
- YOUTUBE: Immersive storytelling, dramatic visual progression, premium cinematic pacing.
- LINKEDIN: Professional premium visuals, clean composition, trustworthy brand image.
- X/TWITTER: Bold visuals, immediate attention-grabbing composition, contrast-heavy scenes.
- WHATSAPP: Warm emotional atmosphere, human connection, intimate visual storytelling.
- TV COMMERCIAL: Ultra-cinematic, emotionally powerful, blockbuster-level aesthetic.
- POSTER/NEWSPAPER: Elegant luxury photography style, high-shutter-speed clarity, sharp minimalist framing, newsprint texture physics.
- BILLBOARD: Low-angle hero perspective, epic scale, singular high-impact focal point visible from distance.

==================================================
TECHNICAL PROMPT CONSTRUCTION (ACAD STANDARD)
==================================================
The prompt should naturally weave in:
- SHOT & MOTION: Handheld tracking shot, cinematic dolly shot, drone reveal shot, slow-motion movement, dynamic motion blur.
- LENS & LIGHTING: Shallow depth of field, dramatic rim lighting using ${brandColors}, volumetric lighting, realistic reflections.
- TEXTURE & PHYSICS: Subsurface scattering on ${mascot}, ultra-realistic textures, atmospheric haze, ray-traced reflections.
- STORYTELLING: Feel visually expensive, avoid generic AI visuals, preserve brand identity naturally, align with ${audience} psychology.

==================================================
IMPORTANT PRODUCTION RULES
==================================================
- RETURN ONLY THE FINAL OPTIMIZED RUNWAY PROMPT.
- NO EXPLANATIONS. NO MARKDOWN. NO LABELS. NO BULLET POINTS.
- NO SECTION HEADINGS. DO NOT MENTION THESE INSTRUCTIONS.
- NO TEXT OR LOGOS. FOCUS ON PURE VISUAL STORYTELLING.
- Incorporate Brand Colors (${brandColors}) into the cinematic environment and lighting.
- Maintain mascot consistency for ${mascot}.

CURRENT AUDIT FEEDBACK: {critique}
`;

  while (iterations < maxIterations && !isSatisfactory) {
    iterations++;

    const userInputs = `
        Brand Name: ${brandName}
        Tagline: ${tagline}
        Mascot / Character: ${mascot}
        Tone Of Voice: ${toneOfVoice}
        Brand Colors: ${brandColors}
        Target Audience: ${audience}
        Platform: ${platform}
        Format / Aspect Ratio: ${ratio}
        Creative Requirement: ${requirement}
        Reference Images: ${referenceImages || "None"}
        `;

    // ACTION: Director generates the draft
    currentPrompt = await generateResponse(
      `${systemPrompt.replace("{critique}", critique)}\n\n${userInputs}`,
    );

    // OBSERVATION: Auditor validates technical and brand alignment
    const auditPrompt = `
        Evaluate this Runway prompt: "${currentPrompt}"
        1. Does it fit the ${platform} requirement (e.g., 2s hook for Insta, scale for Billboard)?
        2. Does it utilize the ${ratio} composition rules?
        3. Is the lighting specifically using ${brandColors}?
        4. Does it sound "visually expensive" and avoid generic labels?

        If perfect, reply 'READY'. Otherwise, provide one specific technical improvement instruction.
        `;

    const observation = await generateResponse(auditPrompt);

    if (observation.trim().toUpperCase().includes("READY")) {
      isSatisfactory = true;
    } else {
      critique = observation;
    }
  }

  return {
    success: true,
    finalPrompt: currentPrompt,
    metadata: {
      iterations,
      platform,
      ratio,
      status: isSatisfactory ? "Production-Ready" : "Optimized Draft",
    },
  };
};

module.exports = { runACADAgent };
