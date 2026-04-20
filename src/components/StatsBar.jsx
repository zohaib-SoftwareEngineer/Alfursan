import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView.js";
import { pageWrap } from "../lib/layout.js";

function Counter({ target, suffix }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    let x = 0;
    const step = target / 52;
    const t = setInterval(() => {
      x += step;
      if (x >= target) {
        setV(target);
        clearInterval(t);
      } else {
        setV(Math.floor(x));
      }
    }, 20);
    return () => clearInterval(t);
  }, [target]);

  return (
    <>
      {v}
      {suffix}
    </>
  );
}

/**
 * Hero underline — total inventory + highlighted available count
 * (matches the live Zone_All pattern).
 */
export function StatsBar({ availableCount }) {
  const [ref, vis] = useInView();
  const stats = [
    { n: 384,            s: "", l: "units",      sub: "in development" },
    { n: availableCount, s: "", l: "available",  sub: "ready to match" },
    { n: 12,             s: "", l: "amenities",  sub: "on site" },
    { n: 6,              s: "", l: "buildings",  sub: "residential" },
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "#162717",
        borderBottom: "1px solid rgba(74,140,92,.1)",
        ...pageWrap({
          paddingTop: 28,
          paddingBottom: 28,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 12,
        }),
      }}
    >
      {stats.map(({ n, s, l, sub }, i) => (
        <div
          key={l}
          style={{
            textAlign: "center",
            borderRight: i < 3 ? "1px solid rgba(74,140,92,.09)" : "none",
            padding: "8px 12px",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(14px)",
            transition: `all .65s ease ${i * 0.08}s`,
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 40,
              fontWeight: 700,
              color: i === 1 ? "#4A8C5C" : "rgba(194,216,198,.95)",
              lineHeight: 1,
            }}
          >
            {vis ? <Counter target={n} suffix={s} /> : `0${s}`}
          </div>
          <div style={{ fontSize: 10, color: "#9DB89F", letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, marginTop: 8 }}>
            {l}
          </div>
          <div style={{ fontSize: 9, color: "rgba(157,184,159,.45)", marginTop: 4, fontWeight: 500 }}>{sub}</div>
        </div>
      ))}
    </div>
  );
}
