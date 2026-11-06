import React from "react";

export const ZONES = {
  J: { left: 65, top: 116, width: 950, height: 200 },
  HUD: { left: 65, top: 336, width: 950, height: 120 },
  L: { left: 65, top: 476, width: 421, height: 900 },
  R: { left: 594, top: 476, width: 421, height: 900 },
  F: { left: 65, top: 476, width: 950, height: 900 },
  SUB: { left: 65, top: 1460, width: 950, height: 344 },
};

export const ZoneJ: React.FC<{
  title: string;
  subtitle?: string;
  color?: string;
}> = ({ title, subtitle, color = "#16214a" }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: ZONES.J.left,
        top: ZONES.J.top,
        width: ZONES.J.width,
        height: ZONES.J.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Segoe UI', Roboto, 'Comic Sans MS', sans-serif",
          fontSize: 52,
          fontWeight: 900,
          color,
          lineHeight: 1.25,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#64748b",
            marginTop: 8,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export const ZoneHUD: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: ZONES.HUD.left,
        top: ZONES.HUD.top,
        width: ZONES.HUD.width,
        height: ZONES.HUD.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      {children}
    </div>
  );
};

export const ZoneSlot: React.FC<{
  type: "L" | "R" | "F";
  label?: string;
  children: React.ReactNode;
}> = ({ type, label, children }) => {
  const zone = ZONES[type];
  const navy = "#16214a";

  return (
    <div
      style={{
        position: "absolute",
        left: zone.left,
        top: zone.top,
        width: zone.width,
        height: zone.height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Konten Utama Slot */}
      <div
        style={{
          width: "100%",
          height: label ? zone.height - 100 : zone.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {children}
      </div>

      {/* Label Bawah (jika ada) */}
      {label && (
        <div
          style={{
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            border: `3px solid ${navy}`,
            borderRadius: 16,
            padding: "8px 24px",
            fontSize: 26,
            fontWeight: 800,
            color: navy,
            boxShadow: `4px 4px 0px ${navy}`,
            marginTop: 12,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

export const ZoneSUB: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: ZONES.SUB.left,
        top: ZONES.SUB.top,
        width: ZONES.SUB.width,
        height: ZONES.SUB.height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          fontFamily: "'Segoe UI', Roboto, sans-serif",
          fontSize: 34,
          fontWeight: 800,
          color: "#16214a",
          textAlign: "center",
          lineHeight: 1.4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "3px solid #16214a",
          borderRadius: 20,
          padding: "16px 32px",
          boxShadow: "4px 4px 0px #16214a",
          maxWidth: "100%",
        }}
      >
        {text}
      </div>
    </div>
  );
};
