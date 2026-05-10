const RunwayML = require("@runwayml/sdk");

const runwayClient = new RunwayML({
  apiKey: process.env.RUNWAYML_API_SECRET,
});

function assertRunwayApiKey() {
  if (!process.env.RUNWAYML_API_SECRET) {
    throw new Error("Missing RUNWAYML_API_SECRET");
  }
}

module.exports = {
  runwayClient,
  assertRunwayApiKey,
};