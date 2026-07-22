export default function Hero() {
  return (
    <section id="beranda" className="hero">
      <div className="hero__pattern" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow" style={{ color: "var(--gold-light)" }}>
            Koperasi Simpan Pinjam Berbadan Hukum
          </span>
          <h1 className="hero__headline">
            Membangun Kesejahteraan Bersama Secara Transparan dan Aman.
          </h1>
          <p className="hero__sub">
            Bergabunglah dengan ribuan anggota lainnya. Nikmati layanan
            simpan pinjam dengan proses mudah, margin yang adil, dan
            pembagian SHU yang menguntungkan.
          </p>
          <div className="hero__cta">
            <a href="#daftar" className="btn btn-primary">Daftar Sekarang</a>
            <a href="#layanan" className="btn btn-ghost">Konsultasi Layanan</a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <PassbookIllustration />
        </div>
      </div>
    </section>
  );
}

function PassbookIllustration() {
  return (
    <svg viewBox="0 0 420 460" width="100%" height="100%">
      <defs>
        <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F3D3E" />
          <stop offset="100%" stopColor="#0A2B2C" />
        </linearGradient>
      </defs>

      {/* Bayangan */}
      <ellipse cx="210" cy="430" rx="150" ry="18" fill="rgba(15,61,62,0.12)" />

      {/* Sampul buku tabungan */}
      <rect x="40" y="40" width="340" height="380" rx="18" fill="url(#cover)" />
      <rect x="40" y="40" width="340" height="380" rx="18" stroke="#C9A227" strokeOpacity="0.35" strokeWidth="1.5" />

      {/* Perforasi tepi kiri */}
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx="58" cy={78 + i * 38} r="3.5" fill="#FAF9F6" fillOpacity="0.25" />
      ))}

      {/* Emblem */}
      <circle cx="210" cy="120" r="34" fill="none" stroke="#C9A227" strokeWidth="2" />
      <path
        d="M195 122l10 10 20-22"
        stroke="#C9A227"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <text x="210" y="185" textAnchor="middle" fill="#FAF9F6" fontSize="17" fontFamily="Fraunces, serif" fontWeight="600">
        Buku Anggota
      </text>
      <text x="210" y="207" textAnchor="middle" fill="#C9A227" fontSize="11" letterSpacing="2" fontFamily="monospace">
        SIMPAN · PINJAM · TUMBUH
      </text>

      {/* Garis ledger */}
      {[250, 280, 310, 340].map((y, i) => (
        <g key={y}>
          <line x1="80" y1={y} x2="340" y2={y} stroke="#FAF9F6" strokeOpacity="0.15" />
          <circle cx="90" cy={y - 8} r="2" fill="#C9A227" fillOpacity={0.6 - i * 0.1} />
        </g>
      ))}

      {/* Garis pertumbuhan */}
      <polyline
        points="80,390 140,365 190,378 250,335 310,300 340,285"
        fill="none"
        stroke="#C9A227"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [80, 390],
        [190, 378],
        [310, 300],
        [340, 285],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="4.5" fill="#FAF9F6" stroke="#C9A227" strokeWidth="2" />
      ))}
    </svg>
  );
}
