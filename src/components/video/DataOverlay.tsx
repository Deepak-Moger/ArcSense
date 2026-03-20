'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DataOverlayProps {
  dataPoints: { label: string; value: number; color?: string }[];
}

const defaultColors = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#ec4899'];

export default function DataOverlay({ dataPoints }: DataOverlayProps) {
  const data = dataPoints.map((dp, i) => ({
    name: dp.label,
    value: dp.value,
    fill: dp.color || defaultColors[i % defaultColors.length],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <XAxis
          dataKey="name"
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={{ stroke: '#cbd5e1' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            color: '#334155',
            fontSize: '12px',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.1)',
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={800}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
