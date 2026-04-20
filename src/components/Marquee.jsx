import { useState } from "react";
import { AMENITIES } from "../data/amenities.js";
import { POIImg } from "./images/POIImg.jsx";

function MarqueeTile({ item }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;

  return (
    <div
      style={{
        flexShrink: 0,
        width: 255,
        height: 160,
        borderRadius: 10,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(74,140,92,.13)",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <POIImg name={item.key} title={item.title} onError={() => setBroken(true)} />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top,rgba(8,15,10,.88) 0%,transparent 60%)",
        }}
      />
      <div style={{ position: "absolute", bottom: 11, left: 12, right: 12 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#E8EDE6", letterSpacing: 0.35, lineHeight: 1.35 }}>
          {item.title}
        </div>
      </div>
    </div>
  );
}

export function Marquee() {
  const [paused, setPaused] = useState(false);
  const items = [...AMENITIES, ...AMENITIES];

  return (
    <div
      style={{ overflow: "hidden", padding: "36px 0", cursor: "grab" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          gap: 14,
          animation: "marqueeL 36s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((a, i) => (
          <MarqueeTile key={`${a.key}-${i}`} item={a} />
        ))}
      </div>
    </div>
  );
}
