const { getRunwayClient } = require("./runwayClient");

function isTerminalStatus(status = "") {
	return ["SUCCEEDED", "FAILED", "CANCELED"].includes(status);
}

async function pollTaskStatus(taskId, maxAttempts = 150, delayMs = 5000) {
	let attempts = 0;

	while (attempts < maxAttempts) {
		const task = await getRunwayClient().tasks.retrieve(taskId);

		if (isTerminalStatus(task.status)) {
			return task;
		}

		attempts += 1;

		if (attempts < maxAttempts) {
			await new Promise((resolve) => setTimeout(resolve, delayMs));
		}
	}

	throw new Error(`Task polling timeout - max attempts (${maxAttempts}) reached`);
}

function buildTaskResponse({ format, completedTask, scene = null }) {
  const outputUrl = completedTask?.output?.[0] || null;
  const normalizedFormat = String(format || "video").toLowerCase();
  const isVideo = normalizedFormat === "video";

  const sceneType = scene?.sceneType || null;
  const sceneGoal = scene?.goal || null;
  const sceneDirection = scene?.direction || null;

  return {
    success: true,
    taskId: completedTask.id,
    generationId: completedTask.id,
    status: completedTask.status,
    format: normalizedFormat,
    sceneType,
    outputUrl,
    videoUrl: isVideo ? outputUrl : null,
    imageUrl: isVideo ? null : outputUrl,
    output: completedTask.output || [],
    title: isVideo
      ? sceneType
        ? `${sceneType.toUpperCase()} scene generated`
        : "Video generated"
      : normalizedFormat === "poster"
        ? "Poster generated"
        : "Image generated",
    summary: isVideo
      ? sceneGoal || "Runway finished rendering your cinematic video scene."
      : normalizedFormat === "poster"
        ? "Runway produced your poster-ready visual composition."
        : "Runway produced your still image output.",
    sceneDirection: sceneDirection ? [sceneDirection] : [],
  };
}

module.exports = {
	pollTaskStatus,
	buildTaskResponse,
};
