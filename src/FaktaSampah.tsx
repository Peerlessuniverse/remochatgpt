import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const FaktaSampah = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animasi Header (slide down + fade in)
  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [0, 20], [-40, 0], {
    extrapolateRight: "clamp",
  });

  // Animasi Stat Card (pop up dengan spring)
  const cardScale = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Animasi Poin Tambahan
  const infoOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
  });
  const infoY = interpolate(frame, [60, 80], [20, 0], {
    extrapolateRight: "clamp",
  });

  // Animasi Call-to-action Footer
  const footerScale = spring({
    frame: frame - 95,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #022c22 100%)",
        fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      {/* ── Badge / Kategori ── */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          backgroundColor: "#10b981",
          color: "#064e3b",
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: 3,
          padding: "8px 24px",
          borderRadius: 30,
          marginBottom: 16,
          boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)",
        }}
      >
        💡 TAHUKAH KAMU?
      </div>

      {/* ── Judul Utama ── */}
      <h1
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          fontSize: 44,
          fontWeight: 900,
          margin: "0 0 32px 0",
          textAlign: "center",
          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        Sampah Rumah Tangga = Energi Listrik! ⚡
      </h1>

      {/* ── Stat Card (Animasi Pop-up) ── */}
      {frame >= 25 && (
        <div
          style={{
            transform: `scale(${cardScale})`,
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: 24,
            padding: "28px 48px",
            display: "flex",
            alignItems: "center",
            gap: 28,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
            marginBottom: 32,
          }}
        >
          <div style={{ fontSize: 64 }}>🍌 ➡️ 💡</div>
          <div>
            <div style={{ fontSize: 20, color: "#a7f3d0", fontWeight: 600 }}>
              Konversi Biogas:
            </div>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#fef08a" }}>
              1 Ton Sampah = 70–100 kWh
            </div>
          </div>
        </div>
      )}

      {/* ── Info Deskripsi ── */}
      <div
        style={{
          opacity: infoOpacity,
          transform: `translateY(${infoY}px)`,
          fontSize: 22,
          color: "#e2e8f0",
          textAlign: "center",
          maxWidth: 720,
          lineHeight: 1.6,
          marginBottom: 36,
        }}
      >
        Dapat menyalakan lampu dan peralatan elektronik satu rumah selama berhari-hari!
      </div>

      {/* ── Footer CTA ── */}
      {frame >= 95 && (
        <div
          style={{
            transform: `scale(${footerScale})`,
            backgroundColor: "#f59e0b",
            color: "#451a03",
            fontWeight: 800,
            fontSize: 22,
            padding: "14px 36px",
            borderRadius: 50,
            boxShadow: "0 8px 24px rgba(245, 158, 11, 0.4)",
          }}
        >
          🌱 Mulai Pilah Sampah Sekarang!
        </div>
      )}
    </AbsoluteFill>
  );
};

