import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FacelessCharacter } from "../doodle/FacelessCharacter";
import { getWobble } from "../doodle/wobble";
import { ZoneJ, ZoneSlot, ZoneSUB } from "../components/LayoutZones";

export const Beat1Hook: React.FC = () => {
  const frame = useCurrentFrame();

  // Layar bergetar (±6 px) yang semakin kencang lalu membeku di frame 160
  const isFrozen = frame >= 170;
  const shakeIntensity = isFrozen ? 0 : interpolate(frame, [0, 80, 169], [2, 5, 6]);
  const { dx: screenDx, dy: screenDy } = getWobble(frame, 101, shakeIntensity);

  // Angka meteran drum listrik yang berputar cepat dari Rp 850.000 ke Rp 1.840.000
  const drumValue = isFrozen
    ? 1840000
    : Math.floor(interpolate(frame, [0, 169], [750000, 1840000], { extrapolateRight: "clamp" }));

  const formattedRp = `Rp ${drumValue.toLocaleString("id-ID")}`;

  const navy = "#16214a";

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${screenDx}px, ${screenDy}px)`,
      }}
    >
      {/* ── Zona J: Teks Layar ── */}
      <ZoneJ
        title="Tagihan Listrik Terus Jadi Beban"
        subtitle="Setiap bulan naik dan makin memberatkan..."
        color={isFrozen ? "#ef4444" : navy}
      />

      {/* ── Zona F: Meteran Listrik Drum + Karakter Doodle ── */}
      <ZoneSlot type="F" label="Tagihanmu">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            width: "100%",
          }}
        >
          {/* Meteran Listrik Box */}
          <div
            style={{
              width: 520,
              backgroundColor: isFrozen ? "#fee2e2" : "#f8fafc",
              border: `5px solid ${isFrozen ? "#ef4444" : navy}`,
              borderRadius: 32,
              padding: "24px 32px",
              boxShadow: `10px 10px 0px ${isFrozen ? "#ef4444" : navy}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Display Drum Putar */}
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
                color: isFrozen ? "#b91c1c" : navy,
                marginBottom: 12,
              }}
            >
              METERAN PENGELUARAN ⚡
            </div>

            <div
              style={{
                backgroundColor: isFrozen ? "#ef4444" : navy,
                color: "#ffffff",
                fontFamily: "'Courier New', monospace, monospace",
                fontSize: 48,
                fontWeight: 900,
                padding: "16px 28px",
                borderRadius: 16,
                letterSpacing: 2,
                boxShadow: "inset 0 4px 10px rgba(0,0,0,0.4)",
              }}
            >
              {formattedRp}
            </div>

            {/* Indikator Piringan Berputar / Bergetar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 18,
                fontSize: 18,
                fontWeight: 700,
                color: isFrozen ? "#dc2626" : "#475569",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `rotate(${frame * (isFrozen ? 0 : 25)}deg)`,
                  fontSize: 28,
                }}
              >
                ⚙️
              </span>
              <span>{isFrozen ? "STOP! Tagihan membengkak" : "Piringan terus berputar cepat..."}</span>
            </div>
          </div>

          {/* Karakter Tanpa Wajah: Menengadah lalu Menunjuk ke Penonton */}
          <FacelessCharacter
            pose={isFrozen ? "pointing" : "looking-up"}
            bubble={isFrozen ? "!" : "?"}
            scale={1.3}
            seed={77}
          />
        </div>
      </ZoneSlot>

      {/* ── Zona SUB: Subtitle ── */}
      <ZoneSUB
        text={
          isFrozen
            ? "Kamu sadar, sampai kapan harus pasrah bayar terus?!"
            : "Tarif dan pemakaian listrik terus naik, tagihan bulanan membengkak..."
        }
      />
    </div>
  );
};
