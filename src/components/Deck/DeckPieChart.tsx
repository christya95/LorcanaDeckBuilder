import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Card } from "@/types";
import { INK_COLORS, type InkType } from "@/icons/inkIcons";

interface PieChartData {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

interface DeckPieChartProps {
  title: string;
  data: PieChartData[];
  size?: number;
}

/**
 * PieChart component displays deck statistics in a circular chart format
 */
export default function DeckPieChart({
  title,
  data,
  size = 120,
}: DeckPieChartProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartSize = isMobile ? size * 0.8 : size;
  const radius = chartSize / 2;
  const strokeWidth = 8;

  // Calculate SVG path for pie segments
  const createPieSegment = (
    startAngle: number,
    endAngle: number,
    radius: number
  ) => {
    const x1 = radius * Math.cos(startAngle);
    const y1 = radius * Math.sin(startAngle);
    const x2 = radius * Math.cos(endAngle);
    const y2 = radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
      `M ${radius} ${radius}`,
      `L ${radius + x1} ${radius + y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${radius + x2} ${radius + y2}`,
      "Z",
    ].join(" ");
  };

  // Calculate angles for each segment
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -Math.PI / 2; // Start from top

  const segments = data.map((item, index) => {
    const percentage = total > 0 ? item.value / total : 0;
    const angle = percentage * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    currentAngle = endAngle;

    return {
      ...item,
      startAngle,
      endAngle,
      path: createPieSegment(startAngle, endAngle, radius - strokeWidth / 2),
    };
  });

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1,
          fontWeight: "medium",
          fontSize: isMobile ? "0.75rem" : "0.875rem",
        }}
      >
        {title}
      </Typography>

      <Box sx={{ position: "relative", display: "inline-block" }}>
        <svg
          width={chartSize}
          height={chartSize}
          viewBox={`0 0 ${chartSize} ${chartSize}`}
        >
          {/* Background circle */}
          <circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke={theme.palette.divider}
            strokeWidth={strokeWidth}
          />

          {/* Pie segments */}
          {segments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill={segment.color}
              stroke={theme.palette.background.paper}
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* Center text */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1rem" : "1.25rem",
              lineHeight: 1,
            }}
          >
            {total}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              opacity: 0.7,
              fontSize: isMobile ? "0.6rem" : "0.75rem",
            }}
          >
            cards
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Box sx={{ mt: 1 }}>
        {segments.map((segment, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              mb: 0.5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: segment.color,
                flexShrink: 0,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: isMobile ? "0.6rem" : "0.75rem",
                opacity: 0.8,
              }}
            >
              {segment.label} ({segment.percentage.toFixed(0)}%)
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/**
 * Utility function to generate pie chart data for ink colors
 */
export function generateInkColorData(cards: Card[]): PieChartData[] {
  const inkCounts: Record<string, number> = {};

  cards.forEach((card) => {
    if (card.ink) {
      const inks = card.ink.split(",").map((ink) => ink.trim());
      inks.forEach((ink) => {
        inkCounts[ink] = (inkCounts[ink] || 0) + 1;
      });
    }
  });

  const total = Object.values(inkCounts).reduce((sum, count) => sum + count, 0);

  return Object.entries(inkCounts)
    .map(([ink, count]) => ({
      label: ink,
      value: count,
      color: INK_COLORS[ink as InkType] || INK_COLORS.Steel,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Utility function to generate pie chart data for inkable/uninkable distribution
 */
export function generateInkableData(cards: Card[]): PieChartData[] {
  const inkableCount = cards.filter((card) => card.inkable !== false).length;
  const uninkableCount = cards.filter((card) => card.inkable === false).length;
  const total = cards.length;

  return [
    {
      label: "Inkable",
      value: inkableCount,
      color: "#4CAF50",
      percentage: total > 0 ? (inkableCount / total) * 100 : 0,
    },
    {
      label: "Uninkable",
      value: uninkableCount,
      color: "#FF9800",
      percentage: total > 0 ? (uninkableCount / total) * 100 : 0,
    },
  ];
}

/**
 * Utility function to generate pie chart data for card types
 */
export function generateCardTypeData(cards: Card[]): PieChartData[] {
  const typeCounts: Record<string, number> = {};

  cards.forEach((card) => {
    if (card.type) {
      typeCounts[card.type] = (typeCounts[card.type] || 0) + 1;
    }
  });

  const total = Object.values(typeCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const colors = [
    "#2196F3",
    "#FF9800",
    "#9C27B0",
    "#4CAF50",
    "#F44336",
    "#00BCD4",
  ];

  return Object.entries(typeCounts)
    .map(([type, count], index) => ({
      label: type,
      value: count,
      color: colors[index % colors.length],
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}
