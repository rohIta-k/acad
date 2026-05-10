const { runwayClient, assertRunwayApiKey } = require("./runwayClient");
const {
  FORMAT_CONFIG,
  normalizeFormat,
  resolveDuration,
  resolveModel,
  resolvePromptText,
  resolveRatio,
} = require("./runwayFormatConfig");
const { buildTaskResponse, pollTaskStatus } = require("./taskUtils");

function buildPosterPrompt(promptText) {
  return `${promptText}\n\nDesign this as a premium advertising poster with strong typographic hierarchy, clear focal point, and high readability.`;
}

async function createRunwayTask(payload = {}) {
  const format = normalizeFormat(payload.format);
  const promptText = resolvePromptText(payload.idea);

  if (!promptText) {
    throw new Error("idea is required in body");
  }

  const model = resolveModel({ format, model: payload.model });
  const ratio = resolveRatio({
    format,
    platform: payload.platform,
    ratio: payload.ratio,
  });

  const config = FORMAT_CONFIG[format];
  const runwayMethod = runwayClient[config.runwayMethod];

  if (!runwayMethod || typeof runwayMethod.create !== "function") {
    throw new Error(`Unsupported runway method for format: ${format}`);
  }

  if (format === "video") {
    const duration = resolveDuration(payload.duration);

    return runwayMethod.create({
      model,
      promptText,
      ratio,
      duration,
    });
  }

  const finalPrompt = format === "poster"
    ? buildPosterPrompt(promptText)
    : promptText;

  return runwayMethod.create({
    model,
    promptText: finalPrompt,
    ratio,
  });
}

async function generateRunwayCreative(payload = {}) {
  assertRunwayApiKey();

  const format = normalizeFormat(payload.format);
  const task = await createRunwayTask(payload);
  const completedTask = await pollTaskStatus(task.id);

  return buildTaskResponse({
    format,
    completedTask,
  });
}

async function getRunwayTask(taskId) {
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
  getRunwayTask,
};