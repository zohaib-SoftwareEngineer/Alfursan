import { useInView } from "../hooks/useInView.js";

export function SectionHeader({ eyebrow, title, sub, minimal }) {
  const [ref, vis] = useInView();
  const mb = minimal ? 36 : 52;

  return (
    <div ref={ref} style={{ textAlign: minimal ? "left" : "center", marginBottom: mb }}>
      {eyebrow ? (
        <div
          style={{
            fontSize: 9.5,
            letterSpacing: 4.5,
            textTransform: "uppercase",
            color: "#4A8C5C",
            fontWeight: 700,
            marginBottom: 10,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(12px)",
            transition: "all .6s ease",
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <h2
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: minimal ? "clamp(26px,3.5vw,36px)" : "clamp(32px,5vw,56px)",
          fontWeight: 700,
          color: "#E8EDE6",
          lineHeight: 1.08,
          marginBottom: sub ? 14 : 0,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(16px)",
          transition: "all .7s ease .08s",
        }}
      >
        {title}
      </h2>

      {sub ? (
        <p
          style={{
            color: "#9DB89F",
            fontSize: 13,
            maxWidth: minimal ? 520 : 400,
            margin: minimal ? "10px 0 0" : "0 auto",
            lineHeight: 1.75,
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(14px)",
            transition: "all .7s ease .15s",
          }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
