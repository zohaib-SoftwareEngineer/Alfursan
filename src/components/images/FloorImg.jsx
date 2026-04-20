import { useState } from "react";
import { THUMB } from "../../data/cdn.js";
import { FloorplanSVG } from "./FloorplanSVG.jsx";

/** Smart image: tries the real CDN URL, falls back to `<FloorplanSVG />`. */
export function FloorImg({ style = {} }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div style={{ width: "100%", height: "100%", ...style }}>
        <FloorplanSVG />
      </div>
    );
  }

  return (
    <img
      src={THUMB}
      alt="floorplan"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
      onError={() => setErr(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
    />
  );
}
