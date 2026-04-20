import { NAV } from "../data/locations.js";
import { pageWrap, scrollToSection } from "../lib/layout.js";

const FOOTER_COLUMNS = [
  ["Navigate", NAV],
  ["Contact", ["contact us", "Log in", "FAQ"]],
];

export function Footer({ onOpenRegister }) {
  return (
    <footer style={{ background: "#080F0A", borderTop: "1px solid rgba(74,140,92,.1)", padding: "52px 0 26px" }}>
      <div style={{ ...pageWrap(), display: "flex", justifyContent: "space-between", marginBottom: 38, flexWrap: "wrap", gap: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2E5D3A,#4A8C5C)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 700,
                color: "#E8EDE6",
              }}
            >
              ف
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 700, color: "#E8EDE6" }}>
              Safa Alfursan
            </span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(157,184,159,.38)", maxWidth: 270, lineHeight: 1.9, fontWeight: 400 }}>
            Premium residential development in Riyadh.
            <br />
            Images for illustrative purposes only.
          </p>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {FOOTER_COLUMNS.map(([t, items]) => (
            <div key={t}>
              <div style={{ fontSize: 9, color: "#4A8C5C", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>
                {t}
              </div>
              {items.map((item) => (
                <div
                  key={item}
                  style={{ fontSize: 12, color: "rgba(157,184,159,.45)", marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                  onClick={() => {
                    if (t === "Navigate") scrollToSection(item);
                    else if (item === "contact us" || item === "Log in") onOpenRegister?.();
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#9DB89F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(157,184,159,.45)")}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(74,140,92,.07)",
          paddingTop: 19,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ...pageWrap(),
        }}
      >
        <span style={{ fontSize: 10, color: "rgba(157,184,159,.28)", fontWeight: 400 }}>
          © 2024 Safa Alfursan. All rights reserved.
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "rgba(46,93,58,.28)",
            border: "1px solid rgba(74,140,92,.22)",
            color: "#9DB89F",
            padding: "6px 17px",
            fontSize: 10,
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: "'Montserrat',sans-serif",
            fontWeight: 700,
            letterSpacing: 0.8,
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2E5D3A";
            e.currentTarget.style.color = "#E8EDE6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(46,93,58,.28)";
            e.currentTarget.style.color = "#9DB89F";
          }}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  );
}
