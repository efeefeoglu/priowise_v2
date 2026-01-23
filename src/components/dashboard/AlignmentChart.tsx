"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AlignmentChartProps {
  baseScore: number;
  improvedScore: number;
}

export function AlignmentChart({ baseScore, improvedScore }: AlignmentChartProps) {
  const delta = improvedScore - baseScore;

  // Data for Outer Pie (Improved)
  const outerData = [
    { value: improvedScore, fill: "#22c55e" }, // Green
    { value: 100 - improvedScore, fill: "#f3f3f5" },
  ];

  // Data for Inner Pie (Base)
  const innerData = [
    { value: baseScore, fill: "#030213" }, // Primary Black
    { value: 100 - baseScore, fill: "#ececf0" }
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="relative w-full aspect-square">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={innerData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="70%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                 {innerData.map((entry, index) => (
                    <Cell key={`cell-inner-${index}`} fill={entry.fill} />
                 ))}
              </Pie>

              <Pie
                data={outerData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                 {outerData.map((entry, index) => (
                    <Cell key={`cell-outer-${index}`} fill={entry.fill} />
                 ))}
              </Pie>
            </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xl font-bold text-gray-900">
                {baseScore}% / {improvedScore}%
            </div>
            <div className="text-sm font-medium text-gray-500 mt-1 flex items-center">
                <span className="mr-1">Δ</span> {delta > 0 ? "+" : ""}{delta}%
            </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Alignment Score</span>
        <Tooltip>
            <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
                <p>Description placeholder</p>
            </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
