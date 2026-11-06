import {
    AbsoluteFill,
    Sequence,
    useCurrentFrame,
    interpolate,
    staticFile,
    Img,
} from 'remotion';
import { Audio } from '@remotion/media';

// ✅ Semua asset menggunakan staticFile() dengan path relatif ke public/
const LOGO_URL = staticFile('asset/logo.png');
const KARAKTER_MUDA_URL = staticFile('asset/karakter-muda.png');
const KARAKTER_SENIOR_URL = staticFile('asset/karakter-senior.png');
const BG_MUSIC_URL = staticFile('asset/music-inspirational.mp3');
const SFX_LIGHTBULB_URL = staticFile('asset/sfx-lightbulb.mp3');

// Posisi partikel yang stabil (tidak pakai Math.random agar tidak flicker)
const PARTICLE_POSITIONS = [30, 34, 38, 42, 46, 50, 54, 58, 62, 66];

const DIALOGUES = [
    { speaker: 'muda', text: 'Ah, masa sih sampah bisa jadi listrik?', frame: 0 },
    { speaker: 'senior', text: 'Tentu! Sampah organik bisa diolah jadi biogas.', frame: 60 },
    { speaker: 'senior', text: 'Lalu biogas itu menggerakkan generator.', frame: 120 },
    { speaker: 'muda', text: 'Wah, jadi sampah rumah tangga bisa bermanfaat?', frame: 180 },
    { speaker: 'senior', text: 'Betul! 1 ton sampah = 70-100 kWh listrik!', frame: 240 },
    { speaker: 'both', text: 'Mari kelola sampah untuk energi bersih!', frame: 300 },
];

// ============================================================
// Character — animasi bounce via interpolate, bukan CSS transition
// ============================================================
interface CharacterProps {
    src: string;
    position: 'left' | 'right';
    scale?: number;
    isActive: boolean;
}

const Character = ({ src, position, scale = 1, isActive }: CharacterProps) => {
    const frame = useCurrentFrame();

    const scaleAnim = interpolate(frame, [0, 15, 30], [0.8, 1.08, 1.0], {
        extrapolateRight: 'clamp',
    });
    const opacity = interpolate(frame, [0, 20], [0, 1], {
        extrapolateRight: 'clamp',
    });
    const brightness = isActive ? 1.15 : 0.85;

    return (
        <div
            style={{
                position: 'absolute',
                [position]: '2%',
                bottom: '2%',
                width: '20%',
                maxHeight: '52%',
                transform: `scale(${scaleAnim * scale})`,
                transformOrigin: 'bottom center',
                opacity,
                filter: `brightness(${brightness})`,
                overflow: 'hidden',
            }}
        >
            <Img src={src} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>
    );
};

// ============================================================
// SpeechBubble — animasi slide-down via interpolate
// ============================================================
const SpeechBubble = ({
    text,
    position,
}: {
    text: string;
    position: 'left' | 'right';
}) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
    const translateY = interpolate(frame, [0, 12], [-16, 0], { extrapolateRight: 'clamp' });

    const bubbleLeft = position === 'left' ? '23%' : '47%';
    const tailSide = position === 'left' ? 'left' : 'right';
    const tailBorder = position === 'left' ? 'borderLeft' : 'borderRight';

    return (
        <div
            style={{
                position: 'absolute',
                left: bubbleLeft,
                top: '16%',
                width: '28%',
                backgroundColor: 'white',
                padding: '18px 20px',
                borderRadius: 20,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                opacity,
                transform: `translateY(${translateY}px)`,
                fontSize: 22,
                fontWeight: 'bold',
                color: '#2d3748',
                lineHeight: 1.4,
            }}
        >
            {text}
            {/* Ekor balon */}
            <div
                style={{
                    position: 'absolute',
                    [tailSide]: -10,
                    top: '50%',
                    width: 0,
                    height: 0,
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    [tailBorder]: '10px solid white',
                }}
            />
        </div>
    );
};

// ============================================================
// SplitScreenVisual
// ============================================================
const SplitScreenVisual = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <div
            style={{
                position: 'absolute',
                top: '48%',
                left: 0,
                right: 0,
                height: '40%',
                display: 'flex',
                opacity,
            }}
        >
            {/* Kiri — Masalah */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    borderRight: '3px solid #e53e3e',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}
            >
                <div style={{ fontSize: 56 }}>🗑️</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#c53030' }}>Masalah Sampah</div>
                <div style={{ fontSize: 14, color: '#742a2a' }}>65 juta ton/tahun</div>
            </div>

            {/* Tengah — Logo */}
            <div
                style={{
                    width: 90,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    boxShadow: '0 0 20px rgba(72, 187, 120, 0.5)',
                    zIndex: 10,
                    borderRadius: 12,
                }}
            >
                <Img src={LOGO_URL} style={{ width: 70, height: 'auto' }} />
            </div>

            {/* Kanan — Solusi */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(72, 187, 120, 0.15)',
                    borderLeft: '3px solid #48bb78',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                }}
            >
                <div style={{ fontSize: 56 }}>⚡</div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#2f855a' }}>Energi Bersih</div>
                <div style={{ fontSize: 14, color: '#1c4532' }}>70-100 kWh/ton</div>
            </div>
        </div>
    );
};

// ============================================================
// EnergyAnimation — posisi stabil, animasi via interpolate
// ============================================================
const EnergyAnimation = () => {
    const frame = useCurrentFrame();

    return (
        <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, height: '40%' }}>
            {PARTICLE_POSITIONS.map((topPct, i) => {
                const delay = i * 6;
                const opacity = interpolate(
                    frame,
                    [delay, delay + 15, delay + 35],
                    [0, 1, 0],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                const translateY = interpolate(
                    frame,
                    [delay, delay + 35],
                    [0, -40],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );
                const scaleP = interpolate(
                    frame,
                    [delay, delay + 15, delay + 35],
                    [0, 1.2, 0.8],
                    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: `${43 + i * 1.5}%`,
                            top: `${topPct}%`,
                            width: 18,
                            height: 18,
                            backgroundColor: '#f6e05e',
                            borderRadius: '50%',
                            opacity,
                            transform: `translateY(${translateY}px) scale(${scaleP})`,
                            boxShadow: '0 0 10px #f6e05e',
                        }}
                    />
                );
            })}
        </div>
    );
};

// ============================================================
// FinalMessage — animasi slide-up via interpolate
// ============================================================
const FinalMessage = () => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
    const translateY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '5%',
                left: '8%',
                right: '8%',
                backgroundColor: '#48bb78',
                color: 'white',
                padding: '28px 32px',
                borderRadius: 16,
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center',
                opacity,
                transform: `translateY(${translateY}px)`,
                boxShadow: '0 8px 32px rgba(72,187,120,0.4)',
            }}
        >
            🌱 Mari Kelola Sampah untuk Energi Bersih! ⚡
        </div>
    );
};

// ============================================================
// Main Composition
// ============================================================
export const DebatGenerasi = () => {
    const frame = useCurrentFrame();
    const currentDialogue = DIALOGUES.filter((d) => frame >= d.frame).pop();

    return (
        <AbsoluteFill style={{ backgroundColor: '#f7fafc', fontFamily: 'Arial, sans-serif' }}>
            {/* ── Audio ── */}
            <Audio src={BG_MUSIC_URL} volume={0.3} loop />
            {/* SFX dibungkus Sequence agar tidak pakai conditional render */}
            <Sequence from={240} durationInFrames={30}>
                <Audio src={SFX_LIGHTBULB_URL} volume={0.5} />
            </Sequence>

            {/* ── Header ── */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '13%',
                    backgroundColor: '#2d3748',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 30,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                }}
            >
                DEBAT GENERASI: SAMPAHKU, ENERGIMU
            </div>

            {/* ── Logo sudut kiri atas ── */}
            <div style={{ position: 'absolute', top: 8, left: 12, width: 72, height: 72, zIndex: 100 }}>
                <Img src={LOGO_URL} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* ── Karakter (sepanjang komposisi) ── */}
            <Sequence durationInFrames={360}>
                <Character
                    src={KARAKTER_MUDA_URL}
                    position="left"
                    isActive={
                        currentDialogue?.speaker === 'muda' || currentDialogue?.speaker === 'both'
                    }
                />
                <Character
                    src={KARAKTER_SENIOR_URL}
                    position="right"
                    isActive={
                        currentDialogue?.speaker === 'senior' || currentDialogue?.speaker === 'both'
                    }
                />
            </Sequence>

            {/* ── Speech Bubbles (satu Sequence per dialog) ── */}
            {DIALOGUES.map((dialogue, index) => (
                <Sequence key={index} from={dialogue.frame} durationInFrames={60}>
                    {(dialogue.speaker === 'muda' || dialogue.speaker === 'both') && (
                        <SpeechBubble text={dialogue.text} position="left" />
                    )}
                    {(dialogue.speaker === 'senior' || dialogue.speaker === 'both') && (
                        <SpeechBubble text={dialogue.text} position="right" />
                    )}
                </Sequence>
            ))}

            {/* ── Split Screen (muncul dari frame 60) ── */}
            <Sequence from={60}>
                <SplitScreenVisual />
            </Sequence>

            {/* ── Animasi Partikel Energi ── */}
            <Sequence from={240}>
                <EnergyAnimation />
            </Sequence>

            {/* ── Pesan Final ── */}
            <Sequence from={300}>
                <FinalMessage />
            </Sequence>
        </AbsoluteFill>
    );
};
