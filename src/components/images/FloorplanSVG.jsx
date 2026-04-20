/** Inline floorplan illustration shown when the CDN thumbnail fails to load. */
export function FloorplanSVG() {
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <rect width="320" height="200" fill="#EAE6DC" />
      <rect x="18" y="12" width="284" height="176" fill="none" stroke="#2A2A2A" strokeWidth="3" />

      <rect x="18" y="12" width="112" height="95" fill="#E2DDD0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="74" y="62" textAnchor="middle" fontSize="8.5" fill="#555" fontFamily="monospace" fontWeight="600">Living Room</text>
      <rect x="28" y="72" width="60" height="26" rx="4" fill="#CCC9BF" stroke="#AAA" strokeWidth="1" />
      <rect x="28" y="72" width="60" height="10" rx="3" fill="#B5B2A8" />

      <rect x="130" y="12" width="84" height="58" fill="#DEDAD0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="172" y="44" textAnchor="middle" fontSize="8.5" fill="#555" fontFamily="monospace" fontWeight="600">Kitchen</text>
      <rect x="136" y="16" width="72" height="10" fill="#CCC9BF" stroke="#AAA" strokeWidth="1" />

      <rect x="214" y="12" width="88" height="95" fill="#DDDAD2" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="258" y="35" textAnchor="middle" fontSize="8" fill="#555" fontFamily="monospace">Master</text>
      <rect x="228" y="38" width="56" height="38" rx="4" fill="#C8C5BD" stroke="#AAA" strokeWidth="1" />
      <rect x="228" y="38" width="56" height="12" rx="3" fill="#AEABA3" />

      <rect x="130" y="70" width="84" height="37" fill="#E5E1D7" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="172" y="91" textAnchor="middle" fontSize="8" fill="#555" fontFamily="monospace">Dining</text>

      <rect x="18" y="107" width="84" height="81" fill="#E2DDD0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="60" y="125" textAnchor="middle" fontSize="8" fill="#555" fontFamily="monospace">Bedroom 1</text>
      <rect x="26" y="130" width="54" height="34" rx="3" fill="#C8C5BD" stroke="#AAA" strokeWidth="1" />
      <rect x="26" y="130" width="54" height="11" rx="2" fill="#AEABA3" />

      <rect x="102" y="107" width="80" height="81" fill="#E2DDD0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="142" y="125" textAnchor="middle" fontSize="8" fill="#555" fontFamily="monospace">Bedroom 2</text>
      <rect x="108" y="130" width="54" height="34" rx="3" fill="#C8C5BD" stroke="#AAA" strokeWidth="1" />
      <rect x="108" y="130" width="54" height="11" rx="2" fill="#AEABA3" />

      <rect x="182" y="107" width="44" height="42" fill="#D0EAE0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="204" y="130" textAnchor="middle" fontSize="7" fill="#444" fontFamily="monospace">Bath</text>

      <rect x="226" y="107" width="44" height="42" fill="#D0EAE0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="248" y="130" textAnchor="middle" fontSize="7" fill="#444" fontFamily="monospace">Bath</text>

      <rect x="214" y="149" width="88" height="39" fill="#DEDAD0" stroke="#2A2A2A" strokeWidth="1.5" />
      <text x="258" y="171" textAnchor="middle" fontSize="7.5" fill="#555" fontFamily="monospace">Maid Room</text>

      <rect x="182" y="70" width="30" height="37" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="4,2" />
      <text x="197" y="91" textAnchor="middle" fontSize="6.5" fill="#888" fontFamily="monospace">Balcony</text>

      <path d="M 130 12 Q 130 30 148 30" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="3,2" />
      <path d="M 18 107 Q 36 107 36 125" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="3,2" />
      <path d="M 102 107 Q 120 107 120 125" fill="none" stroke="#2A2A2A" strokeWidth="1" strokeDasharray="3,2" />

      <text x="308" y="196" textAnchor="end" fontSize="7" fill="#888" fontFamily="monospace">N ↑</text>
      <line x1="304" y1="182" x2="304" y2="175" stroke="#888" strokeWidth="1" />
    </svg>
  );
}
