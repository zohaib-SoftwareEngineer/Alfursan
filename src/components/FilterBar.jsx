import { useInView } from "../hooks/useInView.js";
import { BUILDINGS } from "../data/apartments.js";

function Label({ children }) {
  return (
    <div style={{ fontSize: 9, color: "#4A8C5C", letterSpacing: 2.2, textTransform: "uppercase", fontWeight: 700 }}>
      {children}
    </div>
  );
}

function CheckBox({ on }) {
  return (
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: 3,
        border: `1.5px solid ${on ? "#4A8C5C" : "rgba(74,140,92,.35)"}`,
        background: on ? "#4A8C5C" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {on && (
        <svg width="8" height="6" viewBox="0 0 8 6">
          <path d="M1 3L3 5L7 1" stroke="#fff" strokeWidth="1.5" fill="none" />
        </svg>
      )}
    </span>
  );
}

/** Filter bar — Select building, floor, m², price + toggles (Zone_All). */
export function FilterBar({ filter, setFilter, floors }) {
  const [ref, vis] = useInView();

  return (
    <div
      ref={ref}
      className="filter-shell"
      style={{
        background: "#162717",
        border: "1px solid rgba(74,140,92,.2)",
        borderRadius: 10,
        padding: "24px 28px",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: "all .6s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 10, color: "#4A8C5C", letterSpacing: 2.4, textTransform: "uppercase", fontWeight: 700 }}>
            filters
          </span>
        </div>
      </div>

      <div className="filter-grid">
        <div>
          <Label>Building</Label>
          <select
            className="filter-select"
            value={filter.building}
            onChange={(e) => setFilter((f) => ({ ...f, building: e.target.value }))}
          >
            <option value="all">Select building</option>
            {BUILDINGS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Floor</Label>
          <select
            className="filter-select"
            value={filter.floor}
            onChange={(e) => setFilter((f) => ({ ...f, floor: e.target.value }))}
          >
            <option value="all">All floors</option>
            {floors.map((fl) => (
              <option key={fl} value={String(fl)}>
                {fl}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Square metrage [m²]</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <input
              className="filter-input"
              type="text"
              inputMode="decimal"
              placeholder="—"
              value={filter.sqMin}
              onChange={(e) => setFilter((f) => ({ ...f, sqMin: e.target.value }))}
            />
            <span style={{ color: "rgba(157,184,159,.45)", fontSize: 12 }}>–</span>
            <input
              className="filter-input"
              type="text"
              inputMode="decimal"
              placeholder="—"
              value={filter.sqMax}
              onChange={(e) => setFilter((f) => ({ ...f, sqMax: e.target.value }))}
            />
          </div>
        </div>

        <div>
          <Label>Price (SAR)</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            <input
              className="filter-input"
              type="text"
              inputMode="numeric"
              placeholder="—"
              value={filter.priceMin}
              onChange={(e) => setFilter((f) => ({ ...f, priceMin: e.target.value }))}
            />
            <span style={{ color: "rgba(157,184,159,.45)", fontSize: 12 }}>–</span>
            <input
              className="filter-input"
              type="text"
              inputMode="numeric"
              placeholder="—"
              value={filter.priceMax}
              onChange={(e) => setFilter((f) => ({ ...f, priceMax: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <Label>Show only</Label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
          {[
            ["With balcony", "balcony"],
            ["Duplex", "duplex"],
            ["Favorites", "favorites"],
            ["For sale", "sale"],
          ].map(([lbl, k]) => (
            <button
              key={k}
              type="button"
              className={`togchip ${filter[k] ? "on" : ""}`}
              onClick={() => setFilter((f) => ({ ...f, [k]: !f[k] }))}
            >
              <CheckBox on={filter[k]} />
              {lbl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
