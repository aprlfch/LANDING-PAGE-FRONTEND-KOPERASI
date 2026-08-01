import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LOGOKOPERASI } from "../assets";

const LINKS = [
  { href: "#beranda", label: "Beranda" },
  { href: "#layanan", label: "Layanan" },
  { href: "#simulasi", label: "Simulasi" },
  { href: "#tentang", label: "Tentang Kami" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a href="#beranda" className="navbar__logo">
          <img src={LOGOKOPERASI} alt="LOGO KOPERASI" />
          <span>
            Koperasi <strong>Karyawan PT KIE</strong>
          </span>
        </a>

        <nav className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}

          {/* <Link to="/login" className="navbar__login-link" onClick={() => setOpen(false)}>
            Masuk Admin
          </Link> */}

          {/* <div className="navbar__actions navbar__actions--mobile">
            <a href="#daftar" className="btn btn-primary">Daftar Anggota</a>
          </div> */}
        </nav>

        {/* <div className="navbar__actions">
          <a href="#daftar" className="btn btn-primary">Daftar Anggota</a>
        </div> */}

        <button
          className="navbar__burger"
          aria-label="Buka menu navigasi"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
