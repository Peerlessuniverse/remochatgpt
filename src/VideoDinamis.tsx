import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import defaultData from "./data/konten-video.json";

export interface Adegan {
  durasiDetik: number;
  karakter: string;
  pembicara: string;
  teks: string;
  emoji: string;
}

export interface VideoDinamisProps {
  judul?: string;
  subjudul?: string;
  warnaTema?: string;
  musik?: string;
  volumeMusik?: number;
  adegan?: Adegan[];
}

export const VideoDinamis: React.FC<VideoDinamisProps> = (props) => {
  const data = { ...defaultData, ...props };
  const { fps } = useVideoConfig();

  // Hitung frame awal untuk setiap adegan
  let cumulativeFrames = 0;
  const scenesWithTiming = (data.adegan as Adegan[]).map((scene: Adegan) => {
    const from = cumulativeFrames;
    const durationInFrames = scene.durasiDetik * fps;
    cumulativeFrames += durationInFrames;
    return {
      ...scene,
      from,
      durationInFrames,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: "white",
      }}
    >
      {/* ── Audio Latar ── */}
      {data.musik && (
        <Audio
          src={staticFile(data.musik)}
          volume={() => data.volumeMusik ?? 0.25}
        />
      )}

      {/* ── Header Tetap ── */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          paddingBottom: 16,
          zIndex: 50,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#34d399",
            }}
          >
            {data.judul}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#f8fafc" }}>
            {data.subjudul}
          </div>
        </div>
        <div style={{ width: 48, height: 48 }}>
          <Img
            src={staticFile("asset/logo.png")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ── Render Setiap Adegan ── */}
      {scenesWithTiming.map(
        (
          scene: Adegan & { durationInFrames: number; from: number },
          index: number
        ) => (
          <Sequence
            key={index}
            from={scene.from}
            durationInFrames={scene.durationInFrames}
          >
            <SceneContent scene={scene} fps={fps} />
          </Sequence>
        )
      )}
    </AbsoluteFill>
  );
};

// Konten untuk satu adegan individual
const SceneContent = ({
  scene,
  fps,
}: {
  scene: Adegan & { durationInFrames: number };
  fps: number;
}) => {
  const frame = useCurrentFrame();

  // Animasi masuk karakter (slide up + fade in)
  const charY = interpolate(frame, [0, 15], [60, 0], {
    extrapolateRight: "clamp",
  });
  const charOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Animasi balon teks (spring bounce)
  const bubbleScale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, mass: 0.8 },
  });

  // Animasi keluar halus di akhir adegan (fade out)
  const fadeOut = interpolate(
    frame,
    [scene.durationInFrames - 10, scene.durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
        gap: 60,
      }}
    >
      {/* ── Karakter ── */}
      <div
        style={{
          width: 320,
          height: 440,
          transform: `translateY(${charY}px)`,
          opacity: charOpacity,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile(scene.karakter)}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))",
          }}
        />
      </div>

      {/* ── Kotak Dialog ── */}
      {frame >= 6 && (
        <div
          style={{
            transform: `scale(${bubbleScale})`,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            color: "#0f172a",
            borderRadius: 24,
            padding: "36px 44px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
            maxWidth: 620,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 20,
              fontWeight: 800,
              color: "#059669",
            }}
          >
            <span style={{ fontSize: 32 }}>{scene.emoji}</span>
            <span>{scene.pembicara.toUpperCase()}</span>
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              lineHeight: 1.45,
              color: "#1e293b",
            }}
          >
            {scene.teks}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
