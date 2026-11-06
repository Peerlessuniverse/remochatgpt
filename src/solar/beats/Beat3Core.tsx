import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ZoneJ, ZoneSlot, ZoneSUB } from "../components/LayoutZones";
import { getWobble } from "../doodle/wobble";

export const Beat3Core: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const navy = "#16214a";

  // Animasi sinar matahari turun ke panel surya
  const sunRayProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animasi panel surya bersinar/aktif
  const panelsActive = frame >= 60;

  // Animasi panah listrik mengalir ke peralatan
  const flowProgress = interpolate(frame, [80, 160], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animasi peralatan rumah menyala satu per satu
  const lampOn = frame >= 120;
  const fridgeOn = frame >= 160;
  const fanOn = frame >= 200;

  // Pop up icon kipas berputar
  const fanRotation = frame * 15;

  const { dx, dy } = getWobble(frame, 303, 2.0);

  // Animasi zoom masuk halus
  const zoom = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, mass: 1 },
  });
  const scale = 1 + zoom * 0.08;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `scale(${scale}) translate(${dx}px, ${dy}px)`,
        transformOrigin: "center center",
      }}
    >
      {/* ── Zona J: Teks Layar ── */}
      <ZoneJ
        title="Matahari, Sumber Energi Gratis"
        subtitle="Ubah atap rumah jadi pembangkit listrik mandiri"
        color="#059669"
      />

      {/* ── Zona F: Potongan Melintang Rumah + Panel Surya + Peralatan ── */}
      <ZoneSlot type="F" label="Atapmu">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          {/* Matahari di Atas */}
          <div
            style={{
              position: "absolute",
              top: -60,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 48,
              fontWeight: 800,
              color: "#d97706",
              backgroundColor: "#fef3c7",
              padding: "6px 20px",
              borderRadius: 30,
              border: `3px solid ${navy}`,
              zIndex: 10,
            }}
          >
            <span>☀️ MATAHARI</span>
          </div>

          <svg viewBox="0 0 700 550" width="700" height="520">
            {/* Sinar Matahari Kuning Turun ke Panel */}
            {sunRayProgress > 0 && (
              <g opacity={sunRayProgress}>
                <line x1="280" y1="20" x2="240" y2="120" stroke="#facc15" strokeWidth="8" strokeDasharray="10 8" />
                <line x1="350" y1="20" x2="350" y2="120" stroke="#facc15" strokeWidth="10" strokeDasharray="10 8" />
                <line x1="420" y1="20" x2="460" y2="120" stroke="#facc15" strokeWidth="8" strokeDasharray="10 8" />
              </g>
            )}

            {/* Atap Rumah Miring */}
            <polygon
              points="350,60 100,160 600,160"
              fill="#fb923c"
              stroke={navy}
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* 3 Panel Surya Biru di Atap */}
            <g transform="translate(180, 110)">
              {/* Panel 1 */}
              <rect
                x="0"
                y="0"
                width="95"
                height="45"
                rx="4"
                fill={panelsActive ? "#2563eb" : "#1e3a8a"}
                stroke={panelsActive ? "#60a5fa" : navy}
                strokeWidth="3.5"
              />
              <line x1="47" y1="0" x2="47" y2="45" stroke="#93c5fd" strokeWidth="2" />
              <line x1="0" y1="22" x2="95" y2="22" stroke="#93c5fd" strokeWidth="2" />

              {/* Panel 2 */}
              <rect
                x="120"
                y="0"
                width="95"
                height="45"
                rx="4"
                fill={panelsActive ? "#2563eb" : "#1e3a8a"}
                stroke={panelsActive ? "#60a5fa" : navy}
                strokeWidth="3.5"
              />
              <line x1="167" y1="0" x2="167" y2="45" stroke="#93c5fd" strokeWidth="2" />
              <line x1="120" y1="22" x2="215" y2="22" stroke="#93c5fd" strokeWidth="2" />

              {/* Panel 3 */}
              <rect
                x="240"
                y="0"
                width="95"
                height="45"
                rx="4"
                fill={panelsActive ? "#2563eb" : "#1e3a8a"}
                stroke={panelsActive ? "#60a5fa" : navy}
                strokeWidth="3.5"
              />
              <line x1="287" y1="0" x2="287" y2="45" stroke="#93c5fd" strokeWidth="2" />
              <line x1="240" y1="22" x2="335" y2="22" stroke="#93c5fd" strokeWidth="2" />
            </g>

            {/* Dinding Rumah Cross-Section (Terbuka ke dalam) */}
            <rect
              x="130"
              y="160"
              width="440"
              height="330"
              fill="#f8fafc"
              stroke={navy}
              strokeWidth="6"
            />
            {/* Lantai & Sekat Ruangan */}
            <line x1="130" y1="320" x2="570" y2="320" stroke={navy} strokeWidth="4" />
            <line x1="350" y1="160" x2="350" y2="490" stroke={navy} strokeWidth="4" />

            {/* Kabel Listrik Mengalir (Kuning Kehijauan) */}
            {flowProgress > 0 && (
              <g>
                <path
                  d="M 350 160 L 350 200 L 220 200 L 220 250"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  fill="none"
                />
                <path
                  d="M 350 200 L 480 200 L 480 370"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeDasharray="8 6"
                  fill="none"
                />
              </g>
            )}

            {/* ── Peralatan Dalam Rumah ── */}
            {/* 1. Lampu Gantung */}
            <g transform="translate(200, 210)">
              <line x1="20" y1="0" x2="20" y2="30" stroke={navy} strokeWidth="3" />
              <circle
                cx="20"
                cy="42"
                r="16"
                fill={lampOn ? "#fde047" : "#94a3b8"}
                stroke={navy}
                strokeWidth="3"
              />
              {lampOn && (
                <text x="50" y="48" fontSize="22" fontWeight="800" fill="#ca8a04">
                  💡 MENYALA
                </text>
              )}
            </g>

            {/* 2. Kipas Angin */}
            <g transform="translate(170, 360)">
              <circle cx="40" cy="40" r="32" fill="#e2e8f0" stroke={navy} strokeWidth="3" />
              <g transform={`translate(40,40) rotate(${fanOn ? fanRotation : 0})`}>
                <line x1="-22" y1="0" x2="22" y2="0" stroke="#0284c7" strokeWidth="6" />
                <line x1="0" y1="-22" x2="0" y2="22" stroke="#0284c7" strokeWidth="6" />
              </g>
              <text x="85" y="48" fontSize="20" fontWeight="800" fill={fanOn ? "#0284c7" : "#64748b"}>
                💨 KIPAS
              </text>
            </g>

            {/* 3. Kulkas */}
            <g transform="translate(420, 340)">
              <rect
                x="0"
                y="0"
                width="70"
                height="120"
                rx="6"
                fill={fridgeOn ? "#67e8f9" : "#cbd5e1"}
                stroke={navy}
                strokeWidth="4"
              />
              <line x1="0" y1="45" x2="70" y2="45" stroke={navy} strokeWidth="3" />
              <circle cx="12" cy="25" r="3" fill={navy} />
              <circle cx="12" cy="70" r="3" fill={navy} />
              <text x="85" y="70" fontSize="20" fontWeight="800" fill={fridgeOn ? "#0891b2" : "#64748b"}>
                🧊 KULKAS
              </text>
            </g>
          </svg>
        </div>
      </ZoneSlot>

      {/* ── Zona SUB: Subtitle ── */}
      <ZoneSUB text="Matahari terbit gratis setiap hari. Panel di atap langsung mengalirkan listrik ke kulkas, lampu, dan peralatan rumahmu." />
    </div>
  );
};
