let coinCount = 0; // ⚠️ In-memory only (resets if Vercel sleeps/restarts)

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return current total
    res.status(200).json({ coinCount });
  } 
  else if (req.method === "POST") {
    const { coinCount: newCoin } = req.body || {};

    if (!newCoin) {
      return res.status(400).json({ error: "coinCount is required" });
    }

    // Add coin value from ESP32
    coinCount += newCoin;

    console.log("💰 Coin received:", newCoin);

    res.status(200).json({
      message: "Coin added",
      received: newCoin,
      total: coinCount,
    });
  } 
  else if (req.method === "DELETE") {
    coinCount = 0;
    res.status(200).json({ message: "Coin count reset", coinCount });
  } 
  else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
