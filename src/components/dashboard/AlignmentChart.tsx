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
  // Data for Outer Pie (Improved)
  const outerData = [
    { value: improvedScore, fill: "#f8b62d" }, // Brand Yellow
    { value: 100 - improvedScore, fill: "#f9fafb" }, // gray-50
  ];

  // Data for Inner Pie (Base)
  const innerData = [
    { value: baseScore, fill: "#AAAAAA" }, // Light Grey
    { value: 100 - baseScore, fill: "#f9fafb" } // gray-50
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
                outerRadius="72.5%"
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
                innerRadius="72.5%"
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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none gap-2 font-bold text-gray-900">
          <div className="text-xl">{baseScore}%</div>
          <div className="text-xl text-gray-400">-&gt;</div>
          <div className="text-4xl">{improvedScore}%</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Alignment Score</span>
        <Tooltip>
            <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent>
                <p className="max-w-xs">The outer ring represents the improved alignment achievable with Priowise recommendations; the inner ring shows your current alignment.</p>
            </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
