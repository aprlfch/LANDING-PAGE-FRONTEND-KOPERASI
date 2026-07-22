const SERVICES = [
  {
    title: "Simpanan",
    desc: "Mulai dari simpanan pokok, wajib, hingga sukarela — dikelola dengan prinsip kekeluargaan dan transparan tiap bulannya.",
    icon: <IconSimpanan />,
  },
  {
    title: "Pembiayaan / Pinjaman",
    desc: "Solusi modal usaha dengan cicilan ringan dan proses persetujuan yang cepat, tanpa jaminan yang memberatkan.",
    icon: <IconPinjaman />,
  },
  {
    title: "Pembagian SHU",
    desc: "Semakin aktif Anda bertransaksi, semakin besar Sisa Hasil Usaha yang Anda terima setiap akhir tahun buku.",
    icon: <IconSHU />,
  },
];

export default function Services() {
  return (
    <section id="layanan" className="section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Layanan Utama</span>
          <h2>Satu koperasi, tiga cara untuk bertumbuh</h2>
          <p>
            Dirancang agar anggota dari berbagai latar belakang usaha bisa
            menabung, meminjam modal, dan menikmati hasilnya bersama-sama.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-card__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconSimpanan() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 12l10-7 10 7v11a1 1 0 01-1 1H5a1 1 0 01-1-1V12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 24v-7h6v7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function IconPinjaman() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="3" y="7" width="22" height="15" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h22" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="17" r="2.3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconSHU() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="2" />
      <path d="M14 8v12M17.5 10.7c0-1.5-1.6-2.2-3.5-2.2s-3.5.9-3.5 2.4c0 3.1 7 1.4 7 4.6 0 1.6-1.6 2.5-3.5 2.5s-3.6-.9-3.6-2.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
