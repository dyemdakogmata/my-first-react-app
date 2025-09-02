import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage
let coinCount = 0;

// GET - fetch current coin count
app.get("/api/data", (req, res) => {
  res.json({ coinCount });
});

// DELETE - reset coin count
app.delete("/api/data", (req, res) => {
  coinCount = 0;
  res.json({ message: "Coin count reset", coinCount });
});

// POST - add coin from ESP32
app.post("/api/data", (req, res) => {
  const { coinValue, coinType, pulseCount, timestamp } = req.body;

  if (!coinValue) {
    return res.status(400).json({ error: "coinValue is required" });
  }

  // Increase total coin count by coin value
  coinCount += coinValue;

  console.log("💰 New coin received:", { coinValue, coinType, pulseCount, timestamp });

  res.json({
    message: "Coin added",
    coinValue,
    coinType,
    pulseCount,
    timestamp,
    total: coinCount,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
