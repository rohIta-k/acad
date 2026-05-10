const { extractAudioIntent } = require("./extractAudioIntent");

async function buildAudioRulesPrompt({
    idea,
    brandData,
    include = [],
}) {
    const audioIntent =
        await extractAudioIntent(idea);

    const hasVoice =
        Boolean(audioIntent?.hasVoice);

    const hasMascot =
        Boolean(brandData?.hasMascot) &&
        include.includes("Mascot");

    // Background music only
    if (!hasVoice) {
        return `
AUDIO RULES

Mode:
background-music

Music Mood:
${audioIntent?.audioMood || brandData?.tone || "neutral"}

Constraints:
- no narration
- no dialogue
- no lip sync
`
    }

    // Mascot speaking
    if (hasMascot) {
        return `
AUDIO RULES

Mode:
mascot-lipsync

Voice Style:
${audioIntent?.voiceStyle || "cinematic commercial"}

Constraints:
- mascot delivers dialogue
- synchronize lip movement with speech
`
    }

    // Voiceover narration
    return `
AUDIO RULES

Mode:
voiceover-narration

Voice Style:
${audioIntent?.voiceStyle || "cinematic commercial"}

Constraints:
- narration only
- no lip sync
`
}

module.exports = {
    buildAudioRulesPrompt,
}