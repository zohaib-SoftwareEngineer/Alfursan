import { NAV_LOGO_SRC } from "../data/locations.js";
import { scrollToSection } from "../lib/layout.js";

export function Hero({ ready }) {
  const anim = (delay) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(28px)",
    transition: `all 1s cubic-bezier(.22,.68,0,1.2) ${delay}s`,
  });

  return (
    <section className="hero-section">
      {/* Hero video background */}
      <div className="hero-video-wrap">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          src="https://data.prographers.com/VinodeSafaAlfursan23/h264/mobile/Sequencer_CameraAlfursanZoneHero1_CameraAlfursanZoneHero1.mp4"
        />
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#0A1F12,#162717)", zIndex: -1 }}
        />
      </div>

      {/* Dark overlay — gradients only (no backdrop-filter blur) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          background: "linear-gradient(160deg,rgba(8,15,10,.55) 0%,rgba(8,15,10,.28) 45%,rgba(8,15,10,.55) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          background: "radial-gradient(ellipse 70% 55% at 18% 50%,rgba(46,93,58,.14) 0%,transparent 62%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "18%",
          zIndex: 2,
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          background: "linear-gradient(to top,#0F1F17,transparent)",
        }}
      />

      {/* compass top-left */}
      <div style={{ position: "absolute", top: 88, left: 48, zIndex: 6, ...anim(1.5) }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="16" stroke="#4A8C5C" strokeWidth="1" opacity=".5" />
          <path d="M17 3 L20 17 L17 31 L14 17 Z" fill="#4A8C5C" opacity=".7" />
          <path d="M3 17 L17 20 L31 17 L17 14 Z" fill="rgba(74,140,92,.3)" />
          <circle cx="17" cy="17" r="2.5" fill="#4A8C5C" />
          <text x="17" y="8" textAnchor="middle" fontSize="5" fill="#4A8C5C" fontFamily="monospace">N</text>
        </svg>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "104px 48px 72px",
          boxSizing: "border-box",
        }}
      >
        {/* Same mark as navbar — centred above the headline */}
        <div style={{ ...anim(0.15), marginBottom: 28 }}>
          <img
            src={NAV_LOGO_SRC}
            alt=""
            width={200}
            height={62}
            style={{
              width: "clamp(160px, 28vw, 220px)",
              height: "auto",
              display: "block",
              margin: "0 auto",
              filter: "drop-shadow(0 4px 24px rgba(0,0,0,.35))",
            }}
          />
        </div>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(44px, 7.5vw, 96px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -0.5,
            marginBottom: 36,
            maxWidth: 1100,
            ...anim(0.35),
          }}
        >
          <span style={{ color: "#E8EDE6" }}>Your place to </span>
          <span style={{ fontStyle: "italic", fontWeight: 600, color: "#4A8C5C" }}>embrace</span>
        </h1>

        <div style={anim(0.9)}>
          <button type="button" className="explore-btn" onClick={() => scrollToSection("Apartments")}>
            Explore
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        {/* scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 38,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 7,
            ...anim(1.3),
          }}
        >
          <span style={{ fontSize: 9, color: "#9DB89F", letterSpacing: 3.5, textTransform: "uppercase", fontWeight: 700 }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 34,
              background: "linear-gradient(to bottom,#4A8C5C,transparent)",
              animation: "pulse 1.7s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
