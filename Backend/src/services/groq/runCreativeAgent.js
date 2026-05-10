const { generateGroqCompletion } = require("./groqService");
const { buildGenerationPrompt } = require("./buildGenerationPrompt");

async function runCreativeAgent({
    idea,
    format,
    platform,
    duration,
    include,
    brandData,
}) {
    let iterations = 0;

    const maxIterations = 3;

    let generationResult = "";

    let critique =
        "Initialize cinematic generation.";

    let validated = false;

    while (
        iterations < maxIterations &&
        !validated
    ) {
        iterations++;

        // STEP 1:
        // Build orchestration prompt
        const generationPrompt =
            await buildGenerationPrompt({
                idea,
                format,
                platform,
                duration,
                include,
                brandData,
                critique,
            });

        // STEP 2:
        // Generate cinematic structure
        generationResult =
            await generateGroqCompletion({
                userPrompt: generationPrompt,
                temperature: 0.7,
                maxTokens: 1800,
            });

        // STEP 3:
        // Audit / validation pass
        const auditPrompt = `
You are a cinematic AI generation auditor.

Validate this generation plan.

RULES:
- Must follow ${format} rules
- Must follow ${platform} platform behavior
- Must preserve brand tone
- Must maintain cinematic coherence
- Must preserve continuity
- Must feel visually premium
- Must avoid generic AI visuals
- Output must be valid structured JSON

If the result is production-ready:
Reply ONLY with:
READY

Otherwise:
Reply with ONE concise correction instruction.

Generation Plan:
${generationResult}
`;

        const audit =
            await generateGroqCompletion({
                userPrompt: auditPrompt,
                temperature: 0.2,
                maxTokens: 120,
            });

        if (
            audit
                .trim()
                .toUpperCase()
                .includes("READY")
        ) {
            validated = true;
        } else {
            critique = audit;
        }
    }

    // Final parsing
    const cleaned = generationResult
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed = JSON.parse(cleaned);

    return {
        success: true,

        generationPlan: parsed,

        metadata: {
            iterations,
            validated,
            status: validated
                ? "validated"
                : "best-effort",
        },
    };
} module.exports = {
    runCreativeAgent,
};