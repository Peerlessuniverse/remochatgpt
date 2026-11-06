import { interpolate, useCurrentFrame } from 'remotion';

const WASTE_EMOJI: Record<string, string> = {
  organik: '🍂',
  anorganik: '🥤',
  b3: '🔋',
};

export const WasteItem = ({ type }: { type: string }) => {
  const frame = useCurrentFrame();

  // Animasi jatuh: dari atas ke tengah
  const top = interpolate(frame, [0, 60], [-100, 250], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rotate = interpolate(frame, [0, 60], [-10, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      position: 'absolute',
      top,
      left: '50%',
      transform: `translateX(-50%) rotate(${rotate}deg)`,
      fontSize: 80,
    }}>
      {WASTE_EMOJI[type] ?? '🗑️'}
    </div>
  );
};