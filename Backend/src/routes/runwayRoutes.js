const express = require("express");
const router = express.Router();
const RunwayML = require("@runwayml/sdk");

const client = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
});
// Utility function to poll task status
const pollTaskStatus = async (taskId, maxAttempts = 60, delayMs = 5000) => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const task = await client.tasks.retrieve(taskId);
    if (task.status === "SUCCEEDED" || task.status === "FAILED" || task.status === "CANCELED") {
      return task;
    }
    attempts++;
    if (attempts < maxAttempts) await new Promise((r) => setTimeout(r, delayMs));
  }
  throw new Error(`Task polling timeout - max attempts (${maxAttempts}) reached`);
};

// Minimal: create a text->video task
router.post("/generate", async (req, res) => {
  try {
    const { promptText, duration = 5, ratio = "1280:720", model = "gen4.5" } = req.body || {};
    if (!promptText || typeof promptText !== "string") {
      return res.status(400).json({ success: false, error: "promptText (string) is required in body" });
    }
    if (duration < 1 || duration > 20) {
      return res.status(400).json({ success: false, error: "duration must be between 1 and 20 seconds" });
    }

    const task = await client.textToVideo.create({ model, promptText, duration, ratio });

    // Wait for completion and return result (keep simple for now)
    const completed = await pollTaskStatus(task.id);
    return res.json({ success: true, taskId: completed.id, status: completed.status, videoUrl: completed.output?.[0] || null });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Check task status
router.get("/task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await client.tasks.retrieve(taskId);
    return res.json({ success: true, id: task.id, status: task.status, videoUrl: task.output?.[0] || null });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
