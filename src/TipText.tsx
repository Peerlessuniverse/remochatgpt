import { interpolate, useCurrentFrame } from 'remotion';

export const TipText = ({ message }: { message: string }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const translateY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

    return (
        <div
            style={{
                position: 'absolute',
                bottom: 40,
                left: 40,
                right: 40,
                opacity,
                transform: `translateY(${translateY}px)`,
                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                color: 'white',
                fontSize: 24,
                fontWeight: 600,
                textAlign: 'center',
                padding: '16px 24px',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                lineHeight: 1.5,
            }}
        >
            💡 {message}
        </div>
    );
};
