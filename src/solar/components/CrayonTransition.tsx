import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const CrayonTransition: React.FC<{ durationInFrames?: number }> = ({
  durationInFrames = 14,
}) => {
  const frame = useCurrentFrame();

  // Progress 0 -> 1 di paruh pertama (masuk), 1 -> 0 di paruh kedua (keluar)
  const progress = interpolate(
    frame,
    [0, Math.floor(durationInFrames / 2), durationInFrames],
    [0, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  if (progress <= 0.05) return null;

  const navy = "#16214a";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 1080 1920"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        {/* Garis-garis zigzag krayon tebal menutupi layar */}
        {Array.from({ length: 18 }).map((_, i) => {
          const y = 80 + i * 105;
          const strokeWidth = progress * 140;
          return (
            <path
              key={i}
              d={`M -50 ${y} Q 270 ${y - 40} 540 ${y + 30} T 1130 ${y}`}
              stroke={navy}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
              opacity={0.96}
            />
          );
        })}
      </svg>
    </div>
  );
};
