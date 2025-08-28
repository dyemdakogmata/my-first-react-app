import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CoinCounter() {
  const [count, setCount] = useState(0);

  // Fetch coin count from ESP32
  const fetchCount = async () => {
    try {
      const res = await fetch("http://192.168.4.1/count"); // replace with your ESP32 IP
      const data = await res.json();
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching coin count:", error);
    }
  };

  // Poll every 1 second
  useEffect(() => {
    const interval = setInterval(fetchCount, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">💰 Coin Counter</h1>
        <CardContent>
          <p className="text-lg mb-4">Inserted Coins:</p>
          <h2 className="text-5xl font-extrabold text-green-600 mb-6">{count}</h2>
          <Button onClick={fetchCount}>Refresh</Button>
        </CardContent>
      </Card>
    </div>
  );
}
