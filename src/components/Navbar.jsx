import { useEffect, useState } from "react";

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
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="17" fill="#0F3D3E" />
            <path
              d="M10 22V12l7 5 7-5v10"
              stroke="#C9A227"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
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
          <div className="navbar__actions navbar__actions--mobile">
            <a href="#masuk" className="btn btn-outline">Masuk</a>
            <a href="#daftar" className="btn btn-primary">Daftar Anggota</a>
          </div>
        </nav>

        <div className="navbar__actions">
          <a href="#masuk" className="btn btn-outline">Masuk</a>
          <a href="#daftar" className="btn btn-primary">Daftar Anggota</a>
        </div>

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
