import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FacelessCharacter } from "../doodle/FacelessCharacter";
import { getWobble } from "../doodle/wobble";
import { ZoneJ, ZoneSlot, ZoneSUB } from "../components/LayoutZones";

export const Beat2Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Keran mulai ditutup di paruh kedua beat (setelah frame 240)
  const isClosing = frame >= 240;
  const flowThickness = interpolate(frame, [0, 200, 340, 420], [28, 24, 8, 0], {
    extrapolateRight: "clamp",
  });

  // Lampu rumah berkedip lalu redup saat keran mengecil
  const flicker = Math.sin(frame * 0.8) > 0;
  const lampBrightness = isClosing
    ? frame >= 360
      ? 0.15
      : flicker
      ? 0.8
      : 0.3
    : 1.0;

  const navy = "#16214a";
  const { dx, dy } = getWobble(frame, 202, 2.0);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* ── Zona J: Teks Layar ── */}
      <ZoneJ
        title="Bergantung Pada Keran Orang Lain"
        subtitle="Ketika sumber fosil menipis, kita yang menanggung akibatnya"
      />

      {/* ── Zona L: Keran Raksasa + Batu Bara & Gas ── */}
      <ZoneSlot type="L" label="Pasokan">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            transform: `translate(${dx}px, ${dy}px)`,
          }}
        >
          {/* Elemen Sumber: Batu Bara & Api Gas */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 16,
              fontSize: 32,
              padding: "8px 16px",
              backgroundColor: "#f1f5f9",
              borderRadius: 16,
              border: `3px solid ${navy}`,
            }}
          >
            <span>🪨 Batu Bara</span>
            <span>🔥 Gas</span>
          </div>

          {/* SVG Keran Raksasa Doodle */}
          <svg viewBox="0 0 200 300" width="220" height="260">
            {/* Handle Keran */}
            <g transform={`translate(100, 40) rotate(${isClosing ? 90 : 0})`}>
              <rect x="-40" y="-10" width="80" height="20" rx="6" fill="#ef4444" stroke={navy} strokeWidth="4" />
              <circle cx="0" cy="0" r="8" fill={navy} />
            </g>

            {/* Pipa Utama */}
            <path
              d="M 20 40 L 90 40 L 90 90 L 140 90 L 140 140 L 80 140 L 80 80 L 20 80 Z"
              fill="#94a3b8"
              stroke={navy}
              strokeWidth="5"
            />
            {/* Mulut Keran */}
            <rect x="70" y="138" width="80" height="20" rx="4" fill="#64748b" stroke={navy} strokeWidth="4" />

            {/* Aliran Energi Keluar (Air/Listrik) */}
            {flowThickness > 0 && (
              <path
                d={`M 110 160 Q ${110 + (Math.sin(frame * 0.4) * 8)} 220 110 280`}
                stroke="#38bdf8"
                strokeWidth={flowThickness}
                strokeLinecap="round"
                fill="none"
              />
            )}
          </svg>

          {/* Ember Bocor di Bawah */}
          <div style={{ fontSize: 44, marginTop: -20 }}>
            {flowThickness > 5 ? "🪣💦" : "🪣 (Kosong)"}
          </div>
        </div>
      </ZoneSlot>

      {/* ── Zona R: Rumah Kecil + Karakter Khawatir ── */}
      <ZoneSlot type="R" label="Rumahmu">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Gambar Rumah Doodle */}
          <svg viewBox="0 0 240 240" width="260" height="260">
            {/* Atap Segitiga */}
            <polygon
              points="120,30 20,110 220,110"
              fill="#f87171"
              stroke={navy}
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Dinding Rumah */}
            <rect
              x="40"
              y="110"
              width="160"
              height="110"
              fill="#fef08a"
              style={{
                filter: `brightness(${lampBrightness})`,
              }}
              stroke={navy}
              strokeWidth="5"
            />
            {/* Pintu */}
            <rect x="100" y="150" width="40" height="70" rx="4" fill="#92400e" stroke={navy} strokeWidth="4" />
            {/* Jendela Menyala / Redup */}
            <rect
              x="55"
              y="130"
              width="35"
              height="35"
              fill={lampBrightness > 0.4 ? "#facc15" : "#334155"}
              stroke={navy}
              strokeWidth="3.5"
            />
            <rect
              x="150"
              y="130"
              width="35"
              height="35"
              fill={lampBrightness > 0.4 ? "#facc15" : "#334155"}
              stroke={navy}
              strokeWidth="3.5"
            />
          </svg>

          {/* Karakter Tanpa Wajah Bingung / Terkejut */}
          <FacelessCharacter
            pose="shocked"
            bubble={lampBrightness < 0.4 ? "!" : "?"}
            scale={1.1}
            seed={88}
          />
        </div>
      </ZoneSlot>

      {/* ── Zona SUB: Subtitle ── */}
      <ZoneSUB
        text={
          isClosing
            ? "Begitu pasokan tersendat, listrik rumah langsung padam dan kita tak bisa apa-apa."
            : "Kita sepenuhnya bergantung pada pasokan energi luar yang harganya terus bergerak."
        }
      />
    </div>
  );
};
