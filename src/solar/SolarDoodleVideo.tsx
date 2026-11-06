import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { SOLAR_TIMING } from "./timing";
import { Beat1Hook } from "./beats/Beat1Hook";
import { Beat2Problem } from "./beats/Beat2Problem";
import { Beat3Core } from "./beats/Beat3Core";
import { Beat4Example } from "./beats/Beat4Example";
import { Beat5Ending } from "./beats/Beat5Ending";
import { CrayonTransition } from "./components/CrayonTransition";

export const SolarDoodleVideo: React.FC = () => {
  const { beats, colors } = SOLAR_TIMING;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgPaper,
        width: 1080,
        height: 1920,
        overflow: "hidden",
      }}
    >
      {/* ── Musik Latar Inspiratif ── */}
      <Audio
        src={staticFile("asset/music-inspirational.mp3")}
        volume={() => 0.28}
      />

      {/* ── BEAT 1: HOOK (0 - 285 frame / 9.5s) ── */}
      <Sequence durationInFrames={beats.beat1.duration}>
        <Beat1Hook />
      </Sequence>

      {/* Transisi 1 ke 2 */}
      <Sequence from={beats.beat1.duration - 7} durationInFrames={14}>
        <CrayonTransition />
      </Sequence>

      {/* ── BEAT 2: MASALAH (285 - 780 frame / 16.5s) ── */}
      <Sequence from={beats.beat2.from} durationInFrames={beats.beat2.duration}>
        <Beat2Problem />
      </Sequence>

      {/* Transisi 2 ke 3 */}
      <Sequence from={beats.beat3.from - 7} durationInFrames={14}>
        <CrayonTransition />
      </Sequence>

      {/* ── BEAT 3: INTI (780 - 1215 frame / 14.5s) ── */}
      <Sequence from={beats.beat3.from} durationInFrames={beats.beat3.duration}>
        <Beat3Core />
      </Sequence>

      {/* Transisi 3 ke 4 */}
      <Sequence from={beats.beat4.from - 7} durationInFrames={14}>
        <CrayonTransition />
      </Sequence>

      {/* ── BEAT 4: CONTOH (1215 - 1800 frame / 19.5s) ── */}
      <Sequence from={beats.beat4.from} durationInFrames={beats.beat4.duration}>
        <Beat4Example />
      </Sequence>

      {/* Transisi 4 ke 5 */}
      <Sequence from={beats.beat5.from - 7} durationInFrames={14}>
        <CrayonTransition />
      </Sequence>

      {/* ── BEAT 5: PENUTUP (1800 - 2100 frame / 10.0s) ── */}
      <Sequence from={beats.beat5.from} durationInFrames={beats.beat5.duration}>
        <Beat5Ending />
      </Sequence>
    </AbsoluteFill>
  );
};
