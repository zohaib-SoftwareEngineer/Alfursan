import { NAV_LOGO_SRC } from "../data/locations.js";
import { scrollToSection } from "../lib/layout.js";
import { NavLoginIcon } from "./icons/NavLoginIcon.jsx";

/** Live export — keep in sync with production `ApartmentListNav`. */
const APARTMENT_NAV_LINKS = [
  { key: "Home",         className: "ApartmentListNav___StyledButton3-sc-se1kik-6 iBZuJe" },
  { key: "Apartments",   className: "ApartmentListNav___StyledButton4-sc-se1kik-7 NTDmM" },
  { key: "Amenities",    className: "ApartmentListNav___StyledButton5-sc-se1kik-8 jGLKEq" },
  { key: "Localization", className: "ApartmentListNav___StyledButton6-sc-se1kik-9 hWvHRE" },
];

/**
 * Navbar — character-for-character structure from `Zone_All.html`. The only
 * additions are the React click handlers; class names map to `navbar.css`.
 */
export function Navbar({ onOpenRegister }) {
  return (
    <nav className="ApartmentListNavstyled__Wrapper-sc-1xx6gcz-0 iPVVek">
      <div className="ApartmentListNav___StyledDiv2-sc-se1kik-2 feiOvI">
        <div className="ApartmentListNav___StyledDiv3-sc-se1kik-3 iiVOLD">
          <img
            src={NAV_LOGO_SRC}
            alt="Safa Al Fursan"
            width={130}
            height={40}
            style={{ height: 28, width: "auto", display: "block" }}
          />
          <button
            type="button"
            className="ApartmentListNav___StyledButton2-sc-se1kik-4 gstSei"
            onClick={() => window.open("https://safaalfursan.sa/", "_blank", "noopener,noreferrer")}
          >
            Safa website
          </button>
        </div>

        <div className="ApartmentListNav___StyledDiv4-sc-se1kik-5 biwPMc">
          {APARTMENT_NAV_LINKS.map(({ key, className }) => (
            <button key={key} type="button" className={className} onClick={() => scrollToSection(key)}>
              {key}
            </button>
          ))}

          <button type="button" className="nav-lang" aria-label="Language: English">
            EN
          </button>

          <button
            type="button"
            className="ApartmentListNav___StyledButton7-sc-se1kik-10 jLMNzk"
            onClick={onOpenRegister}
          >
            <NavLoginIcon />
            Log in
          </button>

          <button
            type="button"
            className="Buttonstyles__Wrapper-sc-zduq50-0 gXAfBx"
            onClick={onOpenRegister}
          >
            <span>contact us</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
