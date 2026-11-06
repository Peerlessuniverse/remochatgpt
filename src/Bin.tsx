import { interpolate, useCurrentFrame } from 'remotion';

const BIN_COLOR: Record<string, { bg: string; label: string; emoji: string }> = {
    organik: { bg: '#4caf50', label: 'ORGANIK', emoji: '🟢' },
    anorganik: { bg: '#2196f3', label: 'ANORGANIK', emoji: '🔵' },
    b3: { bg: '#f44336', label: 'B3', emoji: '🔴' },
};

export const Bin = ({ type }: { type: string }) => {
    const frame = useCurrentFrame();
    const scale = interpolate(frame, [0, 20], [0.5, 1], { extrapolateRight: 'clamp' });
    const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

    const config = BIN_COLOR[type] ?? { bg: '#9e9e9e', label: 'LAINNYA', emoji: '⚪' };

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 80,
                left: '50%',
                transform: `translateX(-50%) scale(${scale})`,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
            }}
        >
            {/* Tong */}
            <div
                style={{
                    width: 120,
                    height: 140,
                    backgroundColor: config.bg,
                    borderRadius: '0 0 16px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px ${config.bg}88`,
                    fontSize: 48,
                }}
            >
                🗑️
            </div>
            {/* Tutup */}
            <div
                style={{
                    width: 140,
                    height: 20,
                    backgroundColor: config.bg,
                    borderRadius: 8,
                    marginBottom: -148,
                    marginTop: -168,
                    boxShadow: `0 4px 12px ${config.bg}66`,
                }}
            />
            {/* Label */}
            <div
                style={{
                    marginTop: 12,
                    backgroundColor: config.bg,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                    padding: '6px 16px',
                    borderRadius: 20,
                    letterSpacing: 2,
                }}
            >
                {config.emoji} {config.label}
            </div>
        </div>
    );
};
