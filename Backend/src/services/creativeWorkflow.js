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

  const runwayResult = await generateRunwayCreative({
    idea: groqResult,
    format,
    platform,
    duration,
  });

  return {
    success: true,
    stage: "complete",
    groqPrompt: groqResult.generationPlan,
    groqMetadata: groqResult.metadata,
    ...runwayResult,
  };
}

module.exports = {
  generateFullCreativeWorkflow,
};