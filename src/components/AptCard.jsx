import { useInView } from "../hooks/useInView.js";
import { FloorImg } from "./images/FloorImg.jsx";

const STATUS_COLOR = { Sold: "#C05050", Available: "#4A8C5C", Reserved: "#C49A30" };

function Tag({ children }) {
  return (
    <span
      style={{
        fontSize: 9,
        background: "rgba(46,93,58,.45)",
        color: "#9DB89F",
        padding: "3px 9px",
        borderRadius: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}

export function AptCard({ apt, idx }) {
  const [ref, vis] = useInView();
  const sc = STATUS_COLOR[apt.status];

  return (
    <div
      ref={ref}
      className="apt-card"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(34px) scale(.97)",
        transition: `opacity .55s ease ${(idx % 6) * 0.07}s, transform .55s cubic-bezier(.22,.68,0,1.2) ${(idx % 6) * 0.07}s`,
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 155, position: "relative", background: "#0A1610", overflow: "hidden" }}>
        <div className="apt-thumb-img" style={{ width: "100%", height: "100%", transition: "transform .5s ease" }}>
          <FloorImg />
        </div>

        <div
          className="apt-hover-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(74,140,92,.1)",
            opacity: 0,
            transition: "opacity .3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              color: "#E8EDE6",
              letterSpacing: 1.8,
              fontWeight: 700,
              textTransform: "uppercase",
              background: "rgba(8,15,10,.7)",
              padding: "6px 14px",
              borderRadius: 3,
            }}
          >
            View Details →
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            top: 9,
            right: 9,
            background: sc,
            color: "#fff",
            fontSize: 9,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          {apt.status}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "20px 10px 8px",
            background: "linear-gradient(to top,rgba(8,15,10,.92) 0%,transparent 100%)",
            fontSize: 9,
            color: "#9DB89F",
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          {apt.building}
        </div>
      </div>

      {/* Body — labels mirror the live list cards */}
      <div style={{ padding: "14px 15px 15px" }}>
        <div style={{ fontSize: 9, color: "#4A8C5C", letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
          Floorplan
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#E8EDE6",
            marginBottom: 12,
            direction: "ltr",
            unicodeBidi: "isolate",
          }}
        >
          {apt.unit}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 14px" }}>
          {[
            ["Unit size", `${apt.size} m²`],
            ["Floor", apt.floor],
            ["Bedrooms", apt.bedrooms],
            ["Bathrooms", apt.bathrooms],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 8.5, color: "#4A8C5C", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>
                {k}
              </div>
              <div style={{ fontSize: 13, color: "#C2D8C6", fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>

        {(apt.hasBalcony || apt.hasDuplex) && (
          <div style={{ display: "flex", gap: 6, marginTop: 11 }}>
            {apt.hasBalcony && <Tag>Balcony</Tag>}
            {apt.hasDuplex && <Tag>Duplex</Tag>}
          </div>
        )}

        <div
          style={{
            marginTop: 13,
            paddingTop: 12,
            borderTop: "1px solid rgba(74,140,92,.11)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 8.5, color: "#4A8C5C", letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 700 }}>
              Price
            </div>
            <div
              style={{
                fontSize: 14,
                color: apt.price ? "#E8EDE6" : "#C05050",
                fontWeight: 700,
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              {apt.price ? `SAR ${apt.price.toLocaleString()}` : "Sold"}
            </div>
          </div>

          {apt.status === "Available" && (
            <button
              style={{
                background: "#2E5D3A",
                border: "none",
                color: "#E8EDE6",
                padding: "6px 13px",
                borderRadius: 4,
                fontSize: 9.5,
                fontWeight: 700,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background .2s",
                fontFamily: "'Montserrat',sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#4A8C5C")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#2E5D3A")}
            >
              Reserve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
