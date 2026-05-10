const express = require("express");
const router = express.Router();
const { generateResponse } = require("../services/groqService")
const { runACADAgent } = require("../../agents/promptAgent");
const handleGenerateResponse = async (req, res) => {
  try {
    const prompt = req.body?.prompt || req.query.prompt;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "prompt is required" });
    }

    const text = await generateResponse(prompt);
    res.json({
      success: true,
      text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.get("/generate-response", handleGenerateResponse);

router.post("/generate-acad-prompt", async (req, res) => {
  try {
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
    } = req.body;

    // Validation: Ensure core fields are present
    if (!brandName || !requirement || !platform || !ratio) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields (brandName, requirement, platform, ratio are mandatory).",
      });
    }

    // Call the Agent (which performs the Think-Action-Observation loop)
    const result = await runACADAgent({
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
    });

    // Send the final result back to the frontend
    res.status(200).json(result);
  } catch (error) {
    console.error("ACAD Route Error:", error);
    res.status(500).json({
      success: false,
      error: "The Agent encountered an error during the production loop.",
    });
  }
});


module.exports = router;
