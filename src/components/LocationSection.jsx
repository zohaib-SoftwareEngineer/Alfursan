import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useInView } from "../hooks/useInView.js";
import { LOCATION_POINTS, PROJECT_CENTER } from "../data/locations.js";

/**
 * Free vector style from OpenFreeMap (no API key, OSM data).
 * Liberty includes the building footprints we extrude in 3D below.
 */
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

/** Camera defaults — tilted so the 3D extrusions read clearly. */
const DEFAULT_PITCH = 55;
const DEFAULT_BEARING = -17;
const DEFAULT_ZOOM = 14.4;
const ACTIVE_ZOOM = 16.5;

/** Build the marker DOM once per pin so we can later toggle the `.on` class. */
function buildMarkerEl() {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "loc-mlpin";
  el.setAttribute("aria-label", "Location pin");
  return el;
}

export function LocationSection({ activeLoc, setActiveLoc }) {
  const [revealRef, vis] = useInView();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const setActiveLocRef = useRef(setActiveLoc);

  // Keep the latest setter in a ref so the marker click handlers (registered
  // once on mount) can always call the freshest version.
  useEffect(() => {
    setActiveLocRef.current = setActiveLoc;
  }, [setActiveLoc]);

  // Initialise MapLibre once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [PROJECT_CENTER.lng, PROJECT_CENTER.lat],
      zoom: DEFAULT_ZOOM,
      pitch: DEFAULT_PITCH,
      bearing: DEFAULT_BEARING,
      antialias: true,
      attributionControl: { compact: true },
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");

    map.on("load", () => {
      // Add 3D building extrusions on top of the OpenFreeMap "openmaptiles"
      // vector source. The `building` layer ships with `render_height` /
      // `render_min_height` properties courtesy of the OMT schema.
      const labelLayer = map.getStyle().layers.find((l) => l.type === "symbol");
      const beforeId = labelLayer?.id;

      if (!map.getLayer("3d-buildings") && map.getSource("openmaptiles")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "openmaptiles",
            "source-layer": "building",
            type: "fill-extrusion",
            minzoom: 13,
            paint: {
              "fill-extrusion-color": [
                "interpolate",
                ["linear"],
                ["get", "render_height"],
                0,    "#1c2a22",
                20,   "#274234",
                60,   "#3a6b48",
                120,  "#4a8c5c",
              ],
              "fill-extrusion-height": ["coalesce", ["get", "render_height"], 6],
              "fill-extrusion-base":   ["coalesce", ["get", "render_min_height"], 0],
              "fill-extrusion-opacity": 0.85,
            },
          },
          beforeId
        );
      }
    });

    // Drop one DOM marker per landmark; clicks select the row in the panel.
    LOCATION_POINTS.forEach((p, i) => {
      const el = buildMarkerEl();
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setActiveLocRef.current(i);
      });

      const popup = new maplibregl.Popup({
        offset: 18,
        closeButton: false,
        className: "loc-pop",
      }).setHTML(
        `<strong style="color:#0F1F17;">${p.name}</strong><br/>` +
        `<span style="color:#3A6B48;font-size:11px;">${p.sub}</span>`
      );

      const marker = new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([p.lng, p.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current[i] = marker;
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Pan / tilt to the selected landmark + toggle pin highlight + open popup.
  useEffect(() => {
    const map = mapRef.current;
    const point = LOCATION_POINTS[activeLoc];
    if (!map || !point) return;

    markersRef.current.forEach((m, i) => {
      m.getElement().classList.toggle("on", i === activeLoc);
    });

    map.flyTo({
      center: [point.lng, point.lat],
      zoom: ACTIVE_ZOOM,
      pitch: 60,
      bearing: DEFAULT_BEARING,
      speed: 0.9,
      essential: true,
    });

    // Close any other open popups so only the active one stays visible.
    markersRef.current.forEach((m, i) => {
      if (i !== activeLoc) m.getPopup()?.remove();
    });
    markersRef.current[activeLoc]?.togglePopup();
  }, [activeLoc]);

  const active = LOCATION_POINTS[activeLoc];

  return (
    <div
      ref={revealRef}
      className="loc-grid"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: "all .75s ease",
      }}
    >
      {/* MapLibre canvas */}
      <div className="loc-map-shell">
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

        {/* Bottom-right active landmark pill */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: "rgba(12,18,15,.92)",
            border: "1px solid rgba(74,140,92,.3)",
            padding: "8px 14px",
            borderRadius: 4,
            fontSize: 10,
            color: "#9DB89F",
            fontWeight: 600,
            letterSpacing: 0.5,
            maxWidth: "min(78%, 360px)",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          {active ? (
            <>
              <span style={{ color: "#4A8C5C", marginRight: 8 }}>●</span>
              {active.name}
              <span style={{ opacity: 0.45, marginLeft: 8 }}>— {active.sub}</span>
            </>
          ) : (
            "Alfursan — Riyadh corridor"
          )}
        </div>
      </div>

      {/* Landmark panel */}
      <aside className="loc-panel">
        <div className="loc-panel-hd">
          <h2 className="loc-panel-title" style={{ margin: 0 }}>
            Locations
          </h2>
          <div className="loc-panel-sub">Key landmarks & access</div>
        </div>
        <div className="loc-panel-body">
          {LOCATION_POINTS.map((loc, i) => (
            <button
              key={loc.name}
              type="button"
              className={`loc-row ${activeLoc === i ? "on" : ""}`}
              onClick={() => setActiveLoc(i)}
            >
              <span className="loc-dot" />
              <span>
                <div className="loc-row-ti">{loc.name}</div>
                <div className="loc-row-su">{loc.sub}</div>
              </span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
