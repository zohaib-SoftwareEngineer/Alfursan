import { useEffect, useState } from "react";
import { SaudiFlagIcon } from "./icons/SaudiFlagIcon.jsx";

const REGISTER_REQUEST_TYPES = [
  { value: "",           label: "Select" },
  { value: "viewing",    label: "Schedule a viewing" },
  { value: "info",       label: "Request more information" },
  { value: "investment", label: "Investment inquiry" },
  { value: "other",      label: "Other" },
];

/**
 * Glass modal — opened from Navbar (Log in / contact us) and Footer.
 *  - Locks body scroll while open.
 *  - Closes on Escape and on backdrop click.
 *  - Shows a thank-you state after submit (no real network call yet).
 */
export function RegisterInterestModal({ open, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="reg-overlay" role="dialog" aria-modal="true" aria-labelledby="reg-interest-title">
      <div className="reg-overlay-bg" aria-hidden onClick={onClose} />
      <div className="reg-card">
        <button type="button" className="reg-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <h2 id="reg-interest-title" className="reg-title">
          Register your interest
        </h2>
        <p className="reg-sub">Fill out the form</p>

        {sent ? (
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 15, lineHeight: 1.6, margin: "8px 0 0" }}>
            Thank you. Our team will review your details and contact you soon.
          </p>
        ) : (
          <form onSubmit={submit}>
            <div className="reg-grid">
              <div className="reg-field">
                <span className="reg-label">Name</span>
                <input
                  className="reg-input"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="reg-field">
                <span className="reg-label">Phone Number</span>
                <div className="reg-phone">
                  <div className="reg-phone-prefix">
                    <SaudiFlagIcon />
                    <select className="reg-phone-code" aria-label="Country code" defaultValue="+966">
                      <option value="+966">+966</option>
                    </select>
                  </div>
                  <input
                    className="reg-phone-input"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="5x xxx xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel-national"
                  />
                </div>
              </div>

              <div className="reg-field">
                <span className="reg-label">Email</span>
                <input
                  className="reg-input"
                  name="email"
                  type="email"
                  placeholder="@"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="reg-field">
                <span className="reg-label">RequestType</span>
                <select
                  className="reg-select"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  required
                >
                  {REGISTER_REQUEST_TYPES.map((o) => (
                    <option key={o.value || "sel"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="reg-footer-row">
              <button type="submit" className="reg-submit">
                Send the form
              </button>
              <p className="reg-disclaimer">
                By submitting this form, you agree that your data will be sent to Safa Investment Company and read by our team.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
