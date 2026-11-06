import React from "react";
import { useCurrentFrame } from "remotion";
import { getWobble } from "./wobble";

interface FacelessCharacterProps {
  pose?: "looking-up" | "pointing" | "shocked" | "normal";
  bubble?: "?" | "!" | null;
  scale?: number;
  seed?: number;
}

export const FacelessCharacter: React.FC<FacelessCharacterProps> = ({
  pose = "normal",
  bubble = null,
  scale = 1,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { dx, dy } = getWobble(frame, seed, 2.0);

  const navy = "#16214a";
  const skin = "#f4c9a0";
  const shirt = "#3b82f6";

  return (
    <div
      style={{
        position: "relative",
        width: 180 * scale,
        height: 280 * scale,
        transform: `translate(${dx}px, ${dy}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 160 260"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Pola arsir diagonal tipis */}
          <pattern
            id={`hatch-${seed}`}
            width="6"
            height="6"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="6" stroke={navy} strokeWidth="1.2" opacity="0.3" />
          </pattern>
        </defs>

        {/* ── Balon Kata Simbolik ("?" atau "!") ── */}
        {bubble && (
          <g transform="translate(100, 10)">
            <ellipse
              cx="25"
              cy="25"
              rx="22"
              ry="20"
              fill="#ffffff"
              stroke={navy}
              strokeWidth="3.5"
            />
            <path
              d="M 12 36 L 5 48 L 22 40 Z"
              fill="#ffffff"
              stroke={navy}
              strokeWidth="3"
            />
            <text
              x="25"
              y="32"
              textAnchor="middle"
              fontSize="24"
              fontWeight="900"
              fill={navy}
              fontFamily="'Comic Sans MS', cursive, sans-serif"
            >
              {bubble}
            </text>
          </g>
        )}

        {/* ── Tubuh / Baju ── */}
        <path
          d="M 50 110 Q 80 100 110 110 L 125 210 Q 80 220 35 210 Z"
          fill={shirt}
          stroke={navy}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Arsir bayangan sisi tubuh */}
        <path
          d="M 85 110 Q 100 105 110 110 L 125 210 Q 105 215 85 210 Z"
          fill={`url(#hatch-${seed})`}
        />

        {/* ── Kepala Tanpa Wajah (Bulat Lonjong Sederhana) ── */}
        <ellipse
          cx="80"
          cy={pose === "looking-up" ? 62 : 68}
          rx="32"
          ry="38"
          fill={skin}
          stroke={navy}
          strokeWidth="4"
        />
        {/* Arsir bayangan di dagu/bawah kepala */}
        <path
          d="M 58 78 Q 80 98 102 78 Q 80 106 58 78 Z"
          fill={`url(#hatch-${seed})`}
        />

        {/* ── Rambut Doodle Minimalis ── */}
        <path
          d="M 50 55 Q 80 25 110 50 Q 112 40 95 32 Q 75 22 55 38 Z"
          fill={navy}
        />

        {/* ── Pose Tangan ── */}
        {pose === "pointing" && (
          // Tangan menunjuk ke arah depan/penonton
          <g>
            <path
              d="M 105 125 Q 135 120 155 105"
              stroke={navy}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="155" cy="105" r="9" fill={skin} stroke={navy} strokeWidth="3.5" />
            {/* Garis gerak telunjuk */}
            <line x1="168" y1="102" x2="180" y2="100" stroke={navy} strokeWidth="3" />
            <line x1="166" y1="112" x2="176" y2="114" stroke={navy} strokeWidth="3" />
          </g>
        )}

        {pose === "looking-up" && (
          // Dua tangan di samping terheran
          <g>
            <path
              d="M 45 130 Q 25 150 35 170"
              stroke={navy}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 115 130 Q 135 150 125 170"
              stroke={navy}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {pose === "normal" && (
          // Tangan santai ke bawah
          <g>
            <path
              d="M 48 125 Q 38 160 42 195"
              stroke={navy}
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 112 125 Q 122 160 118 195"
              stroke={navy}
              strokeWidth="4.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* ── Kaki ── */}
        <line x1="60" y1="210" x2="58" y2="250" stroke={navy} strokeWidth="5" strokeLinecap="round" />
        <line x1="100" y1="210" x2="102" y2="250" stroke={navy} strokeWidth="5" strokeLinecap="round" />
        {/* Sepatu */}
        <ellipse cx="53" cy="252" rx="12" ry="6" fill={navy} />
        <ellipse cx="107" cy="252" rx="12" ry="6" fill={navy} />
      </svg>
    </div>
  );
};
