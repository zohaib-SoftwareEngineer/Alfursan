/** Disclaimer marquee shown directly under the hero. */
export function Ticker() {
  const txt =
    "The images and virtual walkthroughs presented have been created and designed for illustrative purposes only and do not reflect the complete reality";

  return (
    <div
      style={{
        background: "#0A1610",
        borderTop: "1px solid rgba(74,140,92,.1)",
        borderBottom: "1px solid rgba(74,140,92,.1)",
        padding: "10px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 72,
          whiteSpace: "nowrap",
          animation: "marqueeL 30s linear infinite",
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: 10.5,
              color: "rgba(157,184,159,.45)",
              letterSpacing: 0.5,
              fontWeight: 400,
              flexShrink: 0,
            }}
          >
            {txt}&nbsp;&nbsp;✦
          </span>
        ))}
      </div>
    </div>
  );
}
