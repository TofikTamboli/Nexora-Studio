import { memo } from "react";
import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
} from "shaders/react";

export const HeroShader = memo(function HeroShader() {
  return (
    <div
      className="hero-shader-background"
      aria-hidden="true"
      data-shader-background="true"
    >
      <Shader
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
        }}
      >
        <Swirl
          colorA="#ffffff"
          colorB="#f0f0f0"
          detail={1.7}
        />

        <ChromaFlow
          baseColor="#ffffff"
          downColor="#4642ff"
          leftColor="#56c2fc"
          rightColor="#5b4fff"
          upColor="#7f66ff"
          momentum={13}
          radius={3.5}
        />

        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />

        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
});
