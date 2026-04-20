import { useState } from "react";
import { useInView } from "../hooks/useInView.js";
import { POIImg } from "./images/POIImg.jsx";

export function AmenityCard({ item, idx }) {
  const [ref, vis] = useInView();
  const [broken, setBroken] = useState(false);

  if (broken) return null;

  return (
    <div
      ref={ref}
      className="amenity-card"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${38 + (idx % 4) * 9}px)`,
        transition: `all .65s cubic-bezier(.22,.68,0,1.2) ${(idx % 4) * 0.08}s`,
      }}
    >
      <div className="poi-wrap">
        <POIImg name={item.key} title={item.title} onError={() => setBroken(true)} />
      </div>
      <div className="am-overlay" />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 13px" }}>
        <div
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: "#E8EDE6",
            letterSpacing: 0.08,
            fontFamily: "'Cormorant Garamond',serif",
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>
        <div className="am-desc">{item.desc}</div>
      </div>
    </div>
  );
}
