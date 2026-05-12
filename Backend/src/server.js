const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

const groqRoutes = require('./routes/groqRoutes');
const runwayRoutes = require('./routes/runwayRoutes');

const sessionId = crypto.randomUUID();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/groq", groqRoutes);
app.use("/api/runway", runwayRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

/*
  CRON JOB
  Runs every 14 minutes
*/
cron.schedule("*/14 * * * *", async () => {
  try {
    console.log("Cron job running:", new Date().toISOString());

    // Optional self ping
    // await fetch(process.env.BACKEND_URL);
  } catch (error) {
    console.error("Cron job error:", error.message);
  }
});

app.get('/', (req, res) => {
  res.send('Backend running');
});

/*
  CRON JOB
  Runs every 14 minutes
*/
cron.schedule('*/14 * * * *', async () => {
  try {
    console.log('Cron job running:', new Date().toISOString());

    // Optional self ping
    // await fetch(process.env.BACKEND_URL);

  } catch (error) {
    console.error('Cron job error:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});