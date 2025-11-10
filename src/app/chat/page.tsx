"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function ChatWithData() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/chat-with-data`, { query });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error while querying data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat with Data</h1>

      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask e.g. 'Top 5 vendors by spend'"
        />
        <Button onClick={handleSend} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </Button>
      </div>

      {result && (
        <Card className="p-4">
          <p className="text-sm text-gray-500 mb-1">Generated SQL:</p>
          <pre className="bg-gray-100 rounded p-2 overflow-x-auto text-sm">
            {result.generatedSQL || "N/A"}
          </pre>

          <p className="text-sm text-gray-500 mt-4 mb-1">Result:</p>
          <pre className="bg-gray-100 rounded p-2 overflow-x-auto text-sm">
            {JSON.stringify(result.result, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}