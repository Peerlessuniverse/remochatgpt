import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from 'remotion';
import { WasteItem } from './WasteItem';
import { Bin } from './Bin';
import { TipText } from './TipText';

export const WasteSorting = ({ wasteType = 'organik', tip = 'Sisa makanan jadi kompos!' }) => {
  const frame = useCurrentFrame();

  // Animasi sederhana: opacity fade-in
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: '#e8f5e9', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <Sequence durationInFrames={60}>
        <div style={{
          position: 'absolute', top: 40, left: 0, right: 0, textAlign: 'center',
          fontSize: 32, fontWeight: 'bold', color: '#2e7d32', opacity
        }}>
          🌱 Pilah Sampah {wasteType.toUpperCase()}
        </div>
      </Sequence>

      {/* Animasi Item Jatuh */}
      <Sequence from={30}>
        <WasteItem type={wasteType} />
      </Sequence>

      {/* Tong Sampah Target */}
      <Sequence from={60}>
        <Bin type={wasteType} />
      </Sequence>

      {/* Muncul Tips */}
      <Sequence from={90}>
        <TipText message={tip} />
      </Sequence>
    </AbsoluteFill>
  );
};