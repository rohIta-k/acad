const PLATFORM_TO_VIDEO_RATIO = {
  billboard: "1280:720",
  instagram_reel: "720:1280",
  instagram_post: "720:1280",
  tiktok_short: "720:1280",
  youtube_ad: "1280:720",
  whatsapp_status: "720:1280",
  linkedin: "1280:720",
};

const PLATFORM_TO_IMAGE_RATIO = {
  billboard: "1808:768",
  instagram_reel: "1080:1920",
  instagram_post: "1080:1080",
  tiktok_short: "1080:1920",
  youtube_ad: "1920:1080",
  whatsapp_status: "1080:1920",
  linkedin: "1920:1080",
};

const FORMAT_CONFIG = {
  video: {
    defaultModel: "gen4.5",
    runwayMethod: "textToVideo",
  },
  image: {
    defaultModel: "gen4_image",
    runwayMethod: "textToImage",
  }
};

function normalizeFormat(format = "video") {
  const value = String(format).trim().toLowerCase();

  return FORMAT_CONFIG[value] ? value : "video";
}

function normalizePlatform(platform = "youtube-ad") {
  return String(platform).trim().toLowerCase().replace(/-/g, "_");
}

function resolveRatio({ format, platform, ratio }) {
  if (typeof ratio === "string" && ratio.trim()) {
    return ratio.trim();
  }

  const normalizedFormat = normalizeFormat(format);
  const normalizedPlatform = normalizePlatform(platform);

  if (normalizedFormat === "video") {
    return PLATFORM_TO_VIDEO_RATIO[normalizedPlatform] || "1280:720";
  }

  return PLATFORM_TO_IMAGE_RATIO[normalizedPlatform] || "1920:1080";
}

function resolveDuration(duration) {
  const parsed = Number(duration);

  if (!Number.isFinite(parsed)) {
    return 10;
  }

  if (parsed < 0 || parsed > 10) {
    throw new Error("duration must be between 0 and 10 seconds");
  }

  return Math.round(parsed);
}

function resolvePromptText(result) {
  // Direct string
  if (typeof result === "string") {
    return result.trim();
  }
  // Invalid object
  if (!result || typeof result !== "object") {
    return "";
  }
  // Main generation plan
  if (
    typeof result.generationPlan === "string" &&
    result.generationPlan.trim()
  ) {
    return result.generationPlan.trim();
  }
  // Handle parsed object generation plans
  if (
    result.generationPlan &&
    typeof result.generationPlan === "object"
  ) {
    return JSON.stringify(
      result.generationPlan,
      null,
      2
    );
  }
  return "";
}

function resolveMascotPromptText(input) {
  // Accept direct prompt strings.
  if (typeof input === "string") {
    return input
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 2000);
  }

  // Accept objects with known prompt fields.
  if (input && typeof input === "object") {
    const candidate =
      input.promptText ||
      input.idea ||
      input.prompt ||
      "";

    return String(candidate)
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 2000);
  }

  return "";
}

function resolveModel({ format, model }) {
  const normalizedFormat = normalizeFormat(format);
  const config = FORMAT_CONFIG[normalizedFormat];

  if (typeof model === "string" && model.trim()) {
    return model.trim();
  }

  return config.defaultModel;
}

module.exports = {
  FORMAT_CONFIG,
  normalizeFormat,
  normalizePlatform,
  resolveRatio,
  resolveDuration,
  resolvePromptText,
  resolveMascotPromptText,
  resolveModel,
};