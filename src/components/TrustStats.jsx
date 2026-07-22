const STATS = [
  { value: "5.000+", label: "Anggota Aktif" },
  { value: "10+", label: "Tahun Beroperasi" },
  { value: "No. 518/BH/2015", label: "Berbadan Hukum Resmi" },
];

export default function TrustStats() {
  return (
    <section className="trust">
      <div className="container trust__row">
        {STATS.map((s, i) => (
          <div className="trust__item" key={s.label}>
            <span className="trust__index">0{i + 1}</span>
            <div>
              <div className="trust__value">{s.value}</div>
              <div className="trust__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
