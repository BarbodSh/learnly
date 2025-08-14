import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function ReactChart() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 600, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 400, pv: 2400, amt: 2400 },
  ];
  return (
    <div className="w-full h-70 p-5">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#0ea5e9"
            strokeWidth={2}
            name="My data series name"
          />
          <XAxis dataKey="name" />
          <YAxis
            width="auto"
            label={{ value: "UV", position: "insideLeft", angle: -90 }}
          />

          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ReactChart;
