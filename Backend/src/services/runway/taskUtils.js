const { getRunwayClient } = require("./runwayClient");

function isTerminalStatus(status = "") {
	return ["SUCCEEDED", "FAILED", "CANCELED"].includes(status);
}

async function pollTaskStatus(taskId, maxAttempts = 60, delayMs = 5000) {
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

function buildTaskResponse({ format, completedTask }) {
	const outputUrl = completedTask?.output?.[0] || null;
	const normalizedFormat = String(format || "video").toLowerCase();
	const isVideo = normalizedFormat === "video";

	return {
		success: true,
		taskId: completedTask.id,
		generationId: completedTask.id,
		status: completedTask.status,
		format: normalizedFormat,
		outputUrl,
		videoUrl: isVideo ? outputUrl : null,
		imageUrl: isVideo ? null : outputUrl,
		output: completedTask.output || [],
		title: isVideo ? "Video generated" : normalizedFormat === "poster" ? "Poster generated" : "Image generated",
		summary: isVideo
			? "Runway finished rendering your cinematic video."
			: normalizedFormat === "poster"
				? "Runway produced your poster-ready visual composition."
				: "Runway produced your still image output.",
		sceneDirection: [],
	};
}

module.exports = {
	pollTaskStatus,
	buildTaskResponse,
};
