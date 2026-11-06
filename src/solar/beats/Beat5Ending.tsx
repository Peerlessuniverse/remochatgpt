import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ZoneSlot, ZoneSUB } from "../components/LayoutZones";
import { getWobble } from "../doodle/wobble";

export const Beat5Ending: React.FC = () => {
  const frame = useCurrentFrame();

  const navy = "#16214a";
  const { dx, dy } = getWobble(frame, 505, 1.5);

  // Kamera zoom out pelan
  const zoomOut = interpolate(frame, [0, 240], [1.05, 0.95], {
    extrapolateRight: "clamp",
  });

  // Fade to navy di 40 frame terakhir (frame 260 - 300)
  const fadeNavy = interpolate(frame, [250, 295], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Bintang-bintang malam berkedip
  const starSparkle = Math.sin(frame * 0.3) > 0 ? 0.9 : 0.4;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#0a0f24",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ── Langit Malam & Bintang ── */}
      <svg
        viewBox="0 0 1080 1920"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <circle cx="200" cy="220" r="4" fill="#ffffff" opacity={starSparkle} />
        <circle cx="850" cy="180" r="5" fill="#fef08a" opacity={0.8} />
        <circle cx="540" cy="120" r="3" fill="#ffffff" opacity={starSparkle} />
        <circle cx="350" cy="320" r="4" fill="#ffffff" opacity={0.7} />
        <circle cx="720" cy="280" r="3" fill="#ffffff" opacity={starSparkle} />
        {/* Bulan Sabit */}
        <path
          d="M 880 100 A 30 30 0 1 0 910 150 A 24 24 0 1 1 880 100 Z"
          fill="#fef08a"
        />
      </svg>

      {/* Konten Zoom Out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${zoomOut}) translate(${dx}px, ${dy}px)`,
          transformOrigin: "center 60%",
        }}
      >
        {/* ── Rumah Kiri: Gelap Tanpa Listrik (Ember Kosong) ── */}
        <ZoneSlot type="L">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg viewBox="0 0 240 260" width="280" height="280">
              {/* Atap Gelap */}
              <polygon points="120,40 20,120 220,120" fill="#334155" stroke={navy} strokeWidth="5" />
              {/* Dinding Gelap Gulita */}
              <rect x="40" y="120" width="160" height="110" fill="#1e293b" stroke={navy} strokeWidth="5" />
              {/* Jendela Mati */}
              <rect x="55" y="140" width="35" height="35" fill="#0f172a" stroke={navy} strokeWidth="3" />
              <rect x="150" y="140" width="35" height="35" fill="#0f172a" stroke={navy} strokeWidth="3" />
              <rect x="100" y="160" width="40" height="70" fill="#0f172a" stroke={navy} strokeWidth="3" />
            </svg>
            <div style={{ fontSize: 44, marginTop: -10 }}>🪣 (Padam)</div>
          </div>
        </ZoneSlot>

        {/* ── Rumah Kanan: Terang Benderang + Panel + Baterai Hybrid ── */}
        <ZoneSlot type="R">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <svg viewBox="0 0 260 280" width="300" height="300">
              {/* Atap dengan Panel Surya */}
              <polygon points="130,40 30,120 230,120" fill="#f97316" stroke={navy} strokeWidth="5" />
              {/* Panel Surya Berkilau */}
              <rect x="75" y="80" width="110" height="35" rx="3" fill="#2563eb" stroke="#60a5fa" strokeWidth="3" />
              <line x1="130" y1="80" x2="130" y2="115" stroke="#93c5fd" strokeWidth="2" />

              {/* Dinding Rumah Terang Hangat */}
              <rect x="50" y="120" width="160" height="110" fill="#fef08a" stroke={navy} strokeWidth="5" />
              {/* Jendela Bersinar Kuning Terang */}
              <rect x="65" y="140" width="35" height="35" fill="#fde047" stroke={navy} strokeWidth="3" />
              <rect x="160" y="140" width="35" height="35" fill="#fde047" stroke={navy} strokeWidth="3" />
              <rect x="110" y="160" width="40" height="70" fill="#b45309" stroke={navy} strokeWidth="3" />

              {/* Baterai Storage Hybrid di Samping Rumah */}
              <g transform="translate(215, 160)">
                <rect x="0" y="0" width="35" height="65" rx="5" fill="#10b981" stroke={navy} strokeWidth="3" />
                <rect x="10" y="-8" width="15" height="8" rx="2" fill={navy} />
                <text x="17" y="40" textAnchor="middle" fontSize="16" fontWeight="900" fill="#ffffff">
                  ⚡
                </text>
              </g>
            </svg>
            <div style={{ fontSize: 36, marginTop: -10 }}>🔋💡 (Mandiri)</div>
          </div>
        </ZoneSlot>
      </div>

      {/* ── Subtitle Zona SUB ── */}
      <ZoneSUB text="Krisis energi bisa datang kapan saja. Pilihan ada di tanganmu: tetap pasrah bergantung, atau mulai mandiri energi." />

      {/* ── Fade Out Akhir ke Navy #16214a ── */}
      {fadeNavy > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: navy,
            opacity: fadeNavy,
            pointerEvents: "none",
            zIndex: 99,
          }}
        />
      )}
    </div>
  );
};
