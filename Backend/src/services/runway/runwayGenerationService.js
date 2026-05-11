const { getRunwayClient, assertRunwayApiKey } = require("./runwayClient");
const RunwayML = require("@runwayml/sdk");

async function resolveAssetUri(runwayClient, dataUrl) {
  if (!dataUrl || typeof dataUrl !== "string") return "";
  const trimmed = dataUrl.trim();
  if (!trimmed) return "";
  
  if (trimmed.startsWith("runway://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Handle local HTTP Supabase URLs or other HTTP URLs
  if (trimmed.startsWith("http://")) {
    try {
      const response = await fetch(trimmed);
      if (!response.ok) throw new Error(`Failed to fetch ${trimmed}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = response.headers.get("content-type") || "image/png";
      const extension = mimeType.split("/")[1] || "png";
      const filename = `upload_${Date.now()}.${extension}`;
      
      const fileObj = await RunwayML.toFile(buffer, filename, { type: mimeType });
      const uploadResult = await runwayClient.uploads.createEphemeral({ file: fileObj });
      return uploadResult.uri;
    } catch (err) {
      console.error("Failed to fetch and upload HTTP URL to Runway", err);
      return "";
    }
  }

  // Handle base64 data URLs
  const matches = trimmed.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    try {
      const buffer = Buffer.from(trimmed, "base64");
      const fileObj = await RunwayML.toFile(buffer, `upload_${Date.now()}.png`, { type: "image/png" });
      const uploadResult = await runwayClient.uploads.createEphemeral({ file: fileObj });
      return uploadResult.uri;
    } catch (err) {
      console.warn("Failed to parse and upload raw base64 string", err);
      return "";
    }
  }

  try {
    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split("/")[1] || "png";
    const filename = `upload_${Date.now()}.${extension}`;
    const buffer = Buffer.from(base64Data, "base64");
    
    const fileObj = await RunwayML.toFile(buffer, filename, { type: mimeType });
    const uploadResult = await runwayClient.uploads.createEphemeral({ file: fileObj });
    return uploadResult.uri;
  } catch (err) {
    console.error("Failed to upload image to Runway", err);
    return "";
  }
}
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

function getAssetUrl(asset) {
  if (!asset) return "";

  if (typeof asset === "string") {
    return asset.trim();
  }

  return asset?.url || asset?.dataUrl || "";
}

function hasIncludeItem(include = [], value) {
  const target = String(value).trim().toLowerCase();

  return Array.isArray(include) && include.some((item) => String(item).trim().toLowerCase() === target);
}

function buildPosterPrompt(promptText) {
  return `${promptText}\n\nDesign this as a premium advertising poster with strong typographic hierarchy, clear focal point, and high readability.`;
}

function buildMascotPrompt(brandData = {}) {
  const brandName = brandData?.brandName?.trim() || "the brand";

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

  const includes = Array.isArray(payload.include)
    ? payload.include
    : typeof output.includes === "string"
      ? output.includes.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  const shouldUseMascot = contentType === "content/mascot" || hasIncludeItem(includes, "Mascot");

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

  // Robustly handle either .url or .dataUrl, prioritizing .url (Supabase).
  const logoData = getAssetUrl(brandData?.logo);
  const mascotData = shouldUseMascot ? getAssetUrl(brandData?.mascot) : "";
  const referenceAssets = Array.isArray(brandData?.references) ? brandData.references : [];

  const logoUrl = await resolveAssetUri(runwayClient, logoData);
  const mascotUrl = shouldUseMascot ? await resolveAssetUri(runwayClient, mascotData) : "";
  const referenceImages = (
    await Promise.all(
      referenceAssets.slice(0, 6).map(async (asset, index) => {
        const uri = await resolveAssetUri(runwayClient, getAssetUrl(asset));

        return uri ? { uri, tag: `reference-${index + 1}` } : null;
      })
    )
  ).filter(Boolean);

  let methodName = config.runwayMethod;
  // If we are generating video and have any visual reference, switch to imageToVideo
  if (format === "video" && (logoUrl || mascotUrl || referenceImages.length > 0)) {
    methodName = "imageToVideo";
  }

  const runwayMethod = runwayClient[methodName];

  if (!runwayMethod || typeof runwayMethod.create !== "function") {
    throw new Error(`Unsupported runway method for format: ${format}`);
  }

  // Handle mascot content type
  if (contentType === "content/mascot") {
    const promptText = resolveMascotPromptText(payload.idea);

    if (!promptText) {
      throw new Error(
        "promptText is required for mascot generation"
      );
    }
    console.log(promptText);

    const params = {
      model,
      promptText,
      ratio,
    };

    if (referenceImages.length > 0) {
      params.referenceImages = referenceImages;
    }

    return runwayMethod.create(params);
  }

  const params = {
    model,
    ratio,
  };

  if (format === "video") {
    params.duration = resolveDuration(payload.duration);
    const promptText = `
${String(output.direction || "")}

DO NOT generate any text, letters, words, numbers, labels, captions, subtitles, logos, watermarks, signs, overlays, or typographic marks in the video.
Keep all packaging, props, signage, and surfaces completely text-free.
Only if the brief explicitly requires a title, render a single tiny physical title and nothing else.
Use the reference images to improve product accuracy, realism, framing, and brand consistency.
`
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 980);

    params.promptText = promptText;

    if (referenceImages.length > 0) {
      params.referenceImages = referenceImages;
    }

    if (methodName === "imageToVideo") {
      const promptImages = [];
      const primaryAnchor = logoUrl || mascotUrl || referenceImages[0]?.uri || "";

      if (primaryAnchor) {
        promptImages.push({ position: "first", uri: primaryAnchor });
      }
      if (mascotUrl && mascotUrl !== primaryAnchor) {
        // Fallback to first if logo isn't there, or last if supported
        if (promptImages.length === 0) {
          promptImages.push({ position: "first", uri: mascotUrl });
        } else if (model === "veo3.1" || model === "veo3.1_fast" || model === "gen3a_turbo") {
          promptImages.push({ position: "last", uri: mascotUrl });
        }
      }
      if (promptImages.length > 0) {
        params.promptImage = promptImages;
      }
    }
  } else {
    // format === "image"
    const promptText = `
${String(output.creativeDirection || "")}

DO NOT generate any text, letters, words, numbers, labels, captions, subtitles, logos, watermarks, signs, overlays, or typographic marks in the image.
Keep the composition clean and text-free.
Only if the brief explicitly requires a title, render a single tiny physical title and nothing else.
`
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 980);

    params.promptText = promptText;

    const imageReferenceImages = [];
    if (logoUrl) imageReferenceImages.push({ uri: logoUrl, tag: "logo" });
    if (mascotUrl) imageReferenceImages.push({ uri: mascotUrl, tag: "mascot" });
    imageReferenceImages.push(...referenceImages);
    
    if (imageReferenceImages.length > 0) {
      params.referenceImages = imageReferenceImages;
    }
  }

  if (!params.promptText) {
    throw new Error("idea is required in body");
  }
  console.log(params.promptText);

  return runwayMethod.create(params);
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