import { useState } from "react";
import { POI_URL } from "../../data/cdn.js";

/**
 * Lazy POI image. If the asset 404s the component unmounts itself, and any
 * parent that wires up `onError` can also remove its surrounding card.
 */
export function POIImg({ name, title, onError }) {
  const [err, setErr] = useState(false);
  if (err) return null;

  return (
    <img
      src={POI_URL(name)}
      alt={title}
      referrerPolicy="no-referrer"
      onError={() => {
        setErr(true);
        onError?.();
      }}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}
