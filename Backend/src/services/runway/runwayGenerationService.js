const { getRunwayClient, assertRunwayApiKey } = require("./runwayClient");
const {
  FORMAT_CONFIG,
  normalizeFormat,
  resolveDuration,
  resolveModel,
  resolvePromptText,
  resolveMascotPromptText,
  resolveRatio,
} = require("./runwayFormatConfig");
const { buildTaskResponse, pollTaskStatus } = require("./taskUtils");

function buildPosterPrompt(promptText) {
  return `${promptText}\n\nDesign this as a premium advertising poster with strong typographic hierarchy, clear focal point, and high readability.`;
}

function buildMascotPrompt(brandData = {}) {
  const brandName = brandData?.brandName?.trim() || "the brand";
  const tagline = brandData?.tagline?.trim();
  const tone = brandData?.tone?.trim() || "distinctive";
  const mascotBrief = brandData?.mascotBrief?.trim();
  const audience = Array.isArray(brandData?.audience) && brandData.audience.length
    ? brandData.audience.join(", ")
    : "the core audience";
  const palette = Array.isArray(brandData?.palette) && brandData.palette.length
    ? brandData.palette.join(", ")
    : "brand-safe colors";
  const hasLogo = Boolean(brandData?.hasLogo);
  const hasMascot = Boolean(brandData?.hasMascot);
  const referencesCount = Number(brandData?.referencesCount) || 0;

  return [
    `Create a premium original mascot for ${brandName}.`,
    mascotBrief ? `Follow this user-provided mascot brief exactly: ${mascotBrief}.` : "",
    `The character should feel ${tone}, memorable, and instantly brand-owned for ${audience}.`,
    tagline ? `Subtle brand personality cues should echo the tagline: ${tagline}.` : "",
    `Use the brand palette: ${palette}.`,
    hasLogo ? "Reference the existing brand logo only for identity cues, not as a literal overlay." : "",
    hasMascot ? "Refresh the existing mascot concept into a cleaner production-ready version." : "",
    referencesCount > 0 ? `Take inspiration from ${referencesCount} reference image${referencesCount === 1 ? '' : 's'} for style and mood only.` : "",
    "Design a clean, polished studio-ready character with a simple background, strong silhouette, expressive face, and no text, watermark, or extra characters.",
    "Make it look like a production-ready mascot concept for a modern consumer brand."
  ].filter(Boolean).join(" ");
}

async function createRunwayTask(payload = {}) {
  const format = normalizeFormat(payload.format);
  const contentType = payload.content_type || null;

  const generationPlan =
    payload.prompt?.generationPlan ||
    payload.prompt;

  const output =
    generationPlan?.output || {};

  const brandData =
    payload.brandData || {};

  const model = resolveModel({ format, model: payload.model });
  const ratio = resolveRatio({
    format,
    platform: payload.platform,
    ratio: payload.ratio,
  });

  const config = FORMAT_CONFIG[format];
  const runwayClient = getRunwayClient();
  const runwayMethod = runwayClient[config.runwayMethod];

  if (!runwayMethod || typeof runwayMethod.create !== "function") {
    throw new Error(`Unsupported runway method for format: ${format}`);
  }

  const logoUrl =
    brandData?.logo?.url || brandData?.logo?.dataUrl || "";

  const mascotUrl =
    brandData?.mascot?.url || brandData?.mascot?.dataUrl || "";

  // Handle mascot content type
  if (contentType === "content/mascot") {
    const promptText = resolveMascotPromptText(payload.idea);

    if (!promptText) {
      throw new Error(
        "promptText is required for mascot generation"
      );
    }
    console.log(promptText);

    return runwayMethod.create({
      model,
      promptText,
      ratio,
    });
  }

  if (format === "video") {
    const duration = resolveDuration(payload.duration);

    const promptText = `

${String(output.direction || "")}

Use the exact Brand name: ${brandData?.brandName || ""}.
Tagline: ${brandData?.tagline || ""}.
Tone: ${brandData?.tone || ""}.
Audience: ${(brandData?.audience || []).join(", ")}.
Brand colors: ${(brandData?.palette || []).join(", ")}.
Include: ${String(output.includes || "")}.

Use the exact Logo: ${logoUrl || "None"}.
use the exact Mascot: ${mascotUrl || "None"}..
`
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 980);

    if (!promptText) {
      throw new Error(
        "idea is required in body"
      );
    }
    console.log(promptText);

    return runwayMethod.create({
      model,
      promptText,
      ratio,
      duration,
    });
  }

  const promptText = `

${String(output.creativeDirection || "")}

Use the exact Brand name: ${brandData?.brandName || ""}.
Tagline: ${brandData?.tagline || ""}.
Tone: ${brandData?.tone || ""}.
Audience: ${(brandData?.audience || []).join(", ")}.
Brand colors: ${(brandData?.palette || []).join(", ")}.
Include: ${String(output.includes || "")}.

Use the exact Logo: ${logoUrl || "None"}.
use the exact Mascot: ${mascotUrl || "None"}.
`
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 980);

  if (!promptText) {
    throw new Error(
      "idea is required in body"
    );
  }
  console.log(promptText);

  return runwayMethod.create({
    model,
    promptText: promptText,
    ratio,
  });
}

async function generateRunwayCreative(payload = {}) {
  assertRunwayApiKey();

  const format = normalizeFormat(payload.format);
  const task = await createRunwayTask({
    ...payload,
    content_type: payload.content_type || null,
  });
  const completedTask = await pollTaskStatus(task.id);

  return buildTaskResponse({
    format,
    completedTask,
  });
}

async function generateRunwayMascot(payload = {}) {
  const promptText = buildMascotPrompt(payload.brandData || {});
  const result = await generateRunwayCreative({
    idea: promptText,
    format: "image",
    ratio: payload.ratio || "1080:1080",
    content_type: "content/mascot",
  });

  return {
    ...result,
    title: "Mascot generated",
    summary: "Runway created a brand mascot concept ready to store in Supabase.",
  };
}

async function getRunwayTask(taskId) {
  const runwayClient = getRunwayClient();
  const task = await runwayClient.tasks.retrieve(taskId);

  return {
    success: true,
    id: task.id,
    status: task.status,
    outputUrl: task.output?.[0] || null,
    videoUrl: task.output?.[0] || null,
    imageUrl: task.output?.[0] || null,
    output: task.output || [],
  };
}

module.exports = {
  generateRunwayCreative,
  generateRunwayMascot,
  getRunwayTask,
};