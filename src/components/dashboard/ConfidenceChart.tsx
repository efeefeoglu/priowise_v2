"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfidenceChartProps {
  confidenceIndex: number;
}

export function ConfidenceChart({ confidenceIndex }: ConfidenceChartProps) {
  const data = [
    { value: confidenceIndex, fill: "#FFDE59" },
    { value: 100 - confidenceIndex, fill: "#f3f3f5" },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="relative w-full aspect-square">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="90%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
                cornerRadius={10}
              >
                 {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                 ))}
              </Pie>
            </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-3xl font-bold text-gray-900">
                {confidenceIndex}%
            </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Confidence Index</span>
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
