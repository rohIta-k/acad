const { generateGroqCompletion } = require("./groqService");
const { buildGenerationPrompt } = require("./buildGenerationPrompt");

function getAssetUrl(asset) {
  return asset?.url || asset?.dataUrl || "";
}

function cleanGenerationResult(text = "") {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function runCreativeAgent({
  idea,
  format,
  platform,
  duration,
  include,
  brandData,
}) {
  //let iterations = 0;

  //const maxIterations = 3;

  //let generationResult = "";

  //let critique = "Initialize cinematic generation.";

  //let validated = false;

  //while (iterations < maxIterations && !validated) {
    //iterations++;

    // STEP 1:
    // Build orchestration prompt
    const generationPrompt = await buildGenerationPrompt({
      idea,
      format,
      platform,
      duration,
      include,
      brandData
    });
    let systemPrompt = `You are ACAD (AI Creative Ad Director), an elite AI cinematic advertisement strategist, creative director, cinematographer, and premium commercial prompt engineer.
  Your job is to create world-class cinematic Runway prompts from structured brand inputs.
  The generated prompt should feel like it was designed by a luxury commercial director, a Hollywood cinematographer, and a viral short-form strategist.
  Keep the final prompt concise and generation-ready: under 120 words and under 1000 characters.
  The prompt should naturally weave in:
  - SHOT & MOTION: Handheld tracking shot, cinematic dolly shot, drone reveal shot, slow-motion movement, dynamic motion blur.
  - LENS & LIGHTING: Shallow depth of field, dramatic rim lighting using ${brandData?.palette?.join(", ")}, volumetric lighting, realistic reflections.
  - TEXTURE & PHYSICS: Subsurface scattering on ${getAssetUrl(brandData?.mascot)}, ultra-realistic textures, atmospheric haze, ray-traced reflections.
  - STORYTELLING: Feel visually expensive, avoid generic AI visuals, preserve brand identity naturally, align with ${
      brandData?.audience?.join(", ") || "General"
    } psychology.

  OUTPUT FORMAT:
  Respond ONLY with the final cinematic prompt as plain text. Do NOT return JSON, code blocks, markdown, labels, or any surrounding explanation. Use natural paragraphs and line breaks suitable for running in Runway Gen-3.`;
    // STEP 2:
    // Generate cinematic structure
    generationResult = await generateGroqCompletion({
      //systemPrompt: systemPrompt,
      userPrompt: generationPrompt,
      temperature: 0.7,
      maxTokens: 1200,
    });

    // STEP 3:
    // Audit / validation pass
    const auditPrompt = `
You are a cinematic AI generation auditor.

Validate this generation plan.

RULES:
- Must follow ${format} rules
- Must follow ${platform} platform behavior
- Must preserve brand tone
- Must maintain cinematic coherence
- Must preserve continuity
- Must feel visually premium
- Must avoid generic AI visuals
- NO EXPLANATIONS. NO MARKDOWN. NO LABELS. NO BULLET POINTS.
- RETURN ONLY THE FINAL OPTIMIZED RUNWAY PROMPT.

If the result is production-ready:
Reply ONLY with:
READY

Otherwise:
Reply with ONE concise correction instruction.

Generation Plan:
${generationResult}
`;

    //const audit = await generateGroqCompletion({
      //userPrompt: auditPrompt,
      //temperature: 0.2,
      //maxTokens: 120,
    //});

    //if (audit.trim().toUpperCase().includes("READY")) {
     // validated = true;
    //} else {
      //critique = audit;
    //}
  //}

  // Final parsing - return a clean, human-readable prompt (and keep raw text)
  //const cleaned = generationResult
    //.replace(/```json/g, "")
    //.replace(/```/g, "")
    //.replace(/\\n/g, "\n")
    //.replace(/\\t/g, "\t")
    //.replace(/\\\//g, "/")
    //.trim();
    console.log(generationResult);
    const cleaned = cleanGenerationResult(generationResult);

    
    const parsedPlan = JSON.parse(cleaned);
    console.log("Final Groq Generation Result:", parsedPlan);
    console.log(typeof parsedPlan);

  return {
    success: true,
    generationPlan: parsedPlan,
    //rawPlan: cleaned,
    metadata: {
        //
      //validated,
      //status: validated ? "validated" : "best-effort",
    },
  };
}
module.exports = {
  runCreativeAgent,
};
