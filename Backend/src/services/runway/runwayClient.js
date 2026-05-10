const RunwayML = require("@runwayml/sdk");

let runwayClient = null;

function getRunwayClient() {
  if (!runwayClient) {
    assertRunwayApiKey();
    runwayClient = new RunwayML({
      apiKey: process.env.RUNWAYML_API_SECRET,
    });
  }

  return runwayClient;
}

function assertRunwayApiKey() {
  if (!process.env.RUNWAYML_API_SECRET) {
    throw new Error("Missing RUNWAYML_API_SECRET");
  }
}

module.exports = {
  getRunwayClient,
  assertRunwayApiKey,
};