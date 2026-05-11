const { runCreativeAgent } = require("./groq/runCreativeAgent");
const { generateRunwayCreative } = require("./runway/runwayGenerationService");

async function generateFullCreativeWorkflow({
  idea,
  format,
  platform,
  duration,
  include,
  brandData,
}) {
  const groqResult = await runCreativeAgent({
    idea,
    format,
    platform,
    duration,
    include,
    brandData,
  });
  console.log("Groq Result in Full Workflow:", groqResult);

  const runwayResult = await generateRunwayCreative({
    prompt: groqResult,
    format,
    platform,
    duration,
    brandData
  });
  console.log("Runway Result in Full Workflow:", runwayResult);

  return {
    success: true,
    stage: "complete",
    groqPrompt: groqResult.generationPlan,
    groqMetadata: groqResult.metadata,
    ...runwayResult
  };
}

module.exports = {
  generateFullCreativeWorkflow,
};