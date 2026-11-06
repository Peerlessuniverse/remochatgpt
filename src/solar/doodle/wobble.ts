// Pseudo-random generator dengan seed deterministik (LCG)
export function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Menghasilkan jitter offset (x, y) yang berganti setiap 3 frame
export function getWobble(
  frame: number,
  seed: number,
  amplitude = 2.5
): { dx: number; dy: number } {
  const step = Math.floor(frame / 3);
  const r1 = pseudoRandom(step * 1000 + seed * 17);
  const r2 = pseudoRandom(step * 2000 + seed * 31);
  return {
    dx: (r1 - 0.5) * 2 * amplitude,
    dy: (r2 - 0.5) * 2 * amplitude,
  };
}

// Menghasilkan path SVG gelombang tangan (doodle stroke)
export function getWobblyPath(
  points: [number, number][],
  frame: number,
  baseSeed = 1
): string {
  if (points.length === 0) return "";
  const step = Math.floor(frame / 3);

  const modified = points.map(([x, y], idx) => {
    const rx = (pseudoRandom(step * 137 + baseSeed * 29 + idx * 13) - 0.5) * 4;
    const ry = (pseudoRandom(step * 241 + baseSeed * 47 + idx * 19) - 0.5) * 4;
    return [x + rx, y + ry];
  });

  return modified.reduce((acc, [x, y], idx) => {
    if (idx === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    return `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }, "");
}
