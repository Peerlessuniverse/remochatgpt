import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ZoneJ, ZoneSlot, ZoneSUB } from "../components/LayoutZones";
import { getWobble } from "../doodle/wobble";

export const Beat4Example: React.FC = () => {
  const frame = useCurrentFrame();

  const navy = "#16214a";
  const { dx, dy } = getWobble(frame, 404, 2.0);

  // 3 Subfase:
  // Fase A: frame 0 - 185
  // Fase B: frame 185 - 385
  // Fase C: frame 385 - 585
  const isPhaseA = frame < 185;
  const isPhaseB = frame >= 185 && frame < 385;
  const isPhaseC = frame >= 385;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* ── FASE A: Lokasi Bandung & Sistem 3 kWp ── */}
      {isPhaseA && (
        <div style={{ position: "absolute", inset: 0 }}>
          <ZoneJ
            title="Contoh Nyata: Rumah di Bandung"
            subtitle="Sistem PLTS Atap 3 kWp (Kilowatt-peak)"
          />

          {/* L: Peta Bandung Pin */}
          <ZoneSlot type="L" label="Bandung">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transform: `translate(${dx}px, ${dy}px)`,
              }}
            >
              <svg viewBox="0 0 240 240" width="260" height="260">
                {/* Kontur Peta Doodle */}
                <path
                  d="M 40 80 Q 90 30 160 50 Q 210 90 190 160 Q 140 210 80 190 Q 20 160 40 80 Z"
                  fill="#e2e8f0"
                  stroke={navy}
                  strokeWidth="5"
                />
                {/* Pin Lokasi Merah */}
                <g transform="translate(110, 80)">
                  <path
                    d="M 10 0 C 4 0 0 5 0 11 C 0 19 10 32 10 32 C 10 32 20 19 20 11 C 20 5 16 0 10 0 Z"
                    fill="#ef4444"
                    stroke={navy}
                    strokeWidth="3"
                  />
                  <circle cx="10" cy="10" r="4" fill="#ffffff" />
                </g>
              </svg>
              <div style={{ fontSize: 24, fontWeight: 800, color: navy, marginTop: 8 }}>
                📍 Jawa Barat
              </div>
            </div>
          </ZoneSlot>

          {/* R: 6 Panel Muncul Satu per Satu */}
          <ZoneSlot type="R" label="3 kWp (6 Panel)">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 16,
                padding: 16,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => {
                const appearFrame = i * 22;
                const visible = frame >= appearFrame;
                return (
                  <div
                    key={i}
                    style={{
                      width: 140,
                      height: 85,
                      backgroundColor: visible ? "#2563eb" : "transparent",
                      border: `4px solid ${visible ? navy : "#cbd5e1"}`,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 900,
                      fontSize: 22,
                      boxShadow: visible ? `4px 4px 0px ${navy}` : "none",
                      transform: visible ? "scale(1)" : "scale(0.8)",
                      opacity: visible ? 1 : 0.2,
                    }}
                  >
                    {visible ? `P-${i + 1}` : ""}
                  </div>
                );
              })}
            </div>
          </ZoneSlot>

          <ZoneSUB text="Sebagai gambaran, sebuah rumah di Bandung memasang sistem 3 kWp dengan 6 panel surya di atap." />
        </div>
      )}

      {/* ── FASE B: Perbandingan Struk Pembayaran ── */}
      {isPhaseB && (
        <div style={{ position: "absolute", inset: 0 }}>
          <ZoneJ
            title="Hemat Tagihan Signifikan"
            subtitle="Konsumsi listrik siang hari langsung dicover matahari"
            color="#059669"
          />

          {/* L: Struk Dulu Rp 1.000.000 Dicoret */}
          <ZoneSlot type="L" label="Dulu">
            <div
              style={{
                backgroundColor: "#ffffff",
                border: `5px solid ${navy}`,
                borderRadius: 24,
                padding: "32px 24px",
                width: 320,
                boxShadow: `8px 8px 0px ${navy}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: "#64748b" }}>
                TAGIHAN BULANAN
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  color: "#ef4444",
                  marginTop: 16,
                  textDecoration: frame >= 240 ? "line-through" : "none",
                }}
              >
                Rp 1.000.000
              </div>
              {frame >= 240 && (
                <div
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontWeight: 900,
                    fontSize: 20,
                    padding: "4px 16px",
                    borderRadius: 20,
                    marginTop: 16,
                    transform: "rotate(-8deg)",
                  }}
                >
                  BEBAN BERAT ❌
                </div>
              )}
            </div>
          </ZoneSlot>

          {/* R: Struk Sekarang Rp 580.000 */}
          <ZoneSlot type="R" label="Sekarang (Hemat)">
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: `5px solid ${navy}`,
                borderRadius: 24,
                padding: "32px 24px",
                width: 320,
                boxShadow: `8px 8px 0px ${navy}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: "#166534" }}>
                SETELAH PLTS ATAP
              </div>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#15803d",
                  marginTop: 16,
                }}
              >
                ~Rp 580.000
              </div>
              <div
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  fontWeight: 900,
                  fontSize: 18,
                  padding: "4px 14px",
                  borderRadius: 20,
                  marginTop: 16,
                }}
              >
                HEMAT HAMPIR SEPARUH! ✅
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#64748b",
                  marginTop: 12,
                  fontStyle: "italic",
                }}
              >
                *Contoh ilustrasi estimasi
              </div>
            </div>
          </ZoneSlot>

          <ZoneSUB text="Tagihan yang tadinya sekitar Rp 1 juta, bisa turun hampir separuh dengan pemakaian langsung di siang hari." />
        </div>
      )}

      {/* ── FASE C: Grafik Balik Modal ── */}
      {isPhaseC && (
        <div style={{ position: "absolute", inset: 0 }}>
          <ZoneJ
            title="Balik Modal 8 Sampai 10 Tahun"
            subtitle="Setelah impas, listrik selanjutnya murni penghematan"
          />

          <ZoneSlot type="F" label="Balik Modal (Contoh Ilustrasi)">
            <div
              style={{
                width: 680,
                backgroundColor: "#ffffff",
                border: `5px solid ${navy}`,
                borderRadius: 28,
                padding: "36px 44px",
                boxShadow: `10px 10px 0px ${navy}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* SVG Grafik Kurva Balik Modal */}
              <svg viewBox="0 0 500 240" width="560" height="240">
                {/* Garis Nol (Impas) */}
                <line x1="50" y1="140" x2="480" y2="140" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 6" />
                <text x="50" y="132" fontSize="16" fontWeight="700" fill="#64748b">
                  GARIS IMPAS (BEP)
                </text>

                {/* Sumbu X: Tahun 0, 4, 8, 12, 20 */}
                <text x="60" y="225" fontSize="16" fontWeight="700" fill={navy}>Thn 0</text>
                <text x="180" y="225" fontSize="16" fontWeight="700" fill={navy}>Thn 5</text>
                <text x="300" y="225" fontSize="16" fontWeight="800" fill="#059669">Thn 8-10 ⭐</text>
                <text x="420" y="225" fontSize="16" fontWeight="700" fill={navy}>Thn 25</text>

                {/* Kurva Balik Modal (Naik Menembus Nol) */}
                {(() => {
                  const curveProgress = interpolate(frame - 385, [0, 160], [0, 1], {
                    extrapolateRight: "clamp",
                  });
                  const targetX = 60 + curveProgress * 380;
                  const targetY = 190 - curveProgress * 120;
                  return (
                    <g>
                      <path
                        d={`M 60 190 Q 200 170 ${targetX} ${targetY}`}
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {targetX >= 300 && (
                        <circle cx="300" cy="140" r="10" fill="#ef4444" stroke={navy} strokeWidth="3" />
                      )}
                    </g>
                  );
                })()}
              </svg>

              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#059669",
                  marginTop: 12,
                  textAlign: "center",
                }}
              >
                Panel surya bertahan hingga 25+ tahun, memberi keuntungan jangka panjang!
              </div>
            </div>
          </ZoneSlot>

          <ZoneSUB text="Investasi awal diperkirakan balik modal dalam 8–10 tahun. Setelahnya, kamu menikmati energi bersih bertahun-tahun." />
        </div>
      )}
    </div>
  );
};
