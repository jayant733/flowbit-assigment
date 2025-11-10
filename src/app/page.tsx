"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [statsRes, trendsRes] = await Promise.all([
        axios.get(`${API_BASE}/stats`),
        axios.get(`${API_BASE}/invoices/trends`),
      ]);
      setStats(statsRes.data);
      setTrends(trendsRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats &&
          Object.entries(stats).map(([key, val]) => (
            <Card key={key} className="p-4">
              <h2 className="text-sm text-gray-500 capitalize">{key}</h2>
              <p className="text-xl font-semibold">{Number(val).toLocaleString()}</p>
            </Card>
          ))}
      </div>

      {/* Trend chart */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Invoice Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trends}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="totalSpend" stroke="#2563eb" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}