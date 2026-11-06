import "./index.css";
import { Composition } from "remotion";
import { WasteSorting } from "./Wastesorting";
import { DebatGenerasi } from "./DebatGenerasi";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="WasteSorting"
        component={WasteSorting}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          wasteType: "organik",
          tip: "Sisa makanan? Jadikan kompos, bukan beban bumi! 🌍",
        }}
      />
      <Composition
        id="DebatGenerasi"
        component={DebatGenerasi}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
