export const SOLAR_TIMING = {
  fps: 30,
  totalFrames: 2100,
  width: 1080,
  height: 1920,
  beats: {
    beat1: { from: 0, duration: 285 },       // 0 - 9.5s
    beat2: { from: 285, duration: 495 },     // 9.5 - 26.0s
    beat3: { from: 780, duration: 435 },     // 26.0 - 40.5s
    beat4: { from: 1215, duration: 585 },    // 40.5 - 60.0s
    beat5: { from: 1800, duration: 300 },    // 60.0 - 70.0s
  },
  beat4Phases: {
    phaseA: { from: 1215, duration: 185 },   // Bandung & 3 kWp
    phaseB: { from: 1400, duration: 200 },   // Perbandingan Struk
    phaseC: { from: 1600, duration: 200 },   // Grafik Balik Modal
  },
  colors: {
    navyOutline: "#16214a",
    skin: "#f4c9a0",
    bgPaper: "#fdfbf7",
    yellowSun: "#fbbf24",
    bluePanel: "#2563eb",
    darkNavy: "#0c1329",
    greenAccent: "#10b981",
    redAlert: "#ef4444",
  },
};
