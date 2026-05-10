const express = require("express");
const router = express.Router();
const {
  generateRunwayCreative,
  getRunwayTask,
} = require("../services/runway/runwayGenerationService");

router.post("/generate", async (req, res) => {
  try {
    const result = await generateRunwayCreative(req.body || {});

    return res.json(result);
  } catch (error) {
    const message = error?.message || "Runway generation failed";

    return res.status(message.includes("required") || message.includes("duration must") ? 400 : 500).json({
      success: false,
      error: message,
    });
  }
});

// Check task status
router.get("/task/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await getRunwayTask(taskId);

    return res.json(task);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
