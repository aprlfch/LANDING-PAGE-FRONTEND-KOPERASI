import { useState } from "react";

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function SimulasiCalculator() {
  const [pokok, setPokok] = useState(5000000);
  const [tenor, setTenor] = useState(12);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function hitungSimulasi(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/simulasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokok, tenor, bunga: 1.5 }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal menghitung simulasi.");
      setResult(json.data);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="simulasi" className="section simulasi">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Simulasi Pembiayaan</span>
          <h2>Hitung estimasi cicilan Anda</h2>
          <p>
            Geser jumlah dan tenor pinjaman, lalu lihat estimasi cicilan
            bulanan Anda langsung di buku tabungan digital berikut.
          </p>
        </div>

        <div className="passbook">
          <div className="passbook__perforation" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <form className="passbook__form" onSubmit={hitungSimulasi}>
            <div className="passbook__field">
              <label htmlFor="pokok">Jumlah Pinjaman</label>
              <input
                id="pokok"
                type="range"
                min="1000000"
                max="100000000"
                step="500000"
                value={pokok}
                onChange={(e) => setPokok(Number(e.target.value))}
              />
              <div className="passbook__value">{formatRupiah(pokok)}</div>
            </div>

            <div className="passbook__field">
              <label htmlFor="tenor">Tenor (bulan)</label>
              <input
                id="tenor"
                type="range"
                min="3"
                max="36"
                step="1"
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
              />
              <div className="passbook__value">{tenor} bulan</div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Menghitung..." : "Hitung Simulasi"}
            </button>
            {error && <p className="passbook__error">{error}</p>}
          </form>

          <div className="passbook__ledger">
            <div className="passbook__ledger-header">
              <span>Rincian</span>
              <span>Estimasi</span>
            </div>
            <LedgerRow label="Pokok Pinjaman" value={formatRupiah(result?.pokok ?? pokok)} />
            <LedgerRow label="Tenor" value={`${result?.tenor ?? tenor} bulan`} />
            <LedgerRow label="Margin / bulan" value={`${result?.bungaPersenPerBulan ?? 1.5}%`} />
            <div className="passbook__ledger-divider" />
            <LedgerRow
              label="Cicilan per bulan"
              value={result ? formatRupiah(result.cicilanPerBulan) : "—"}
              highlight
            />
            <LedgerRow
              label="Total Pembayaran"
              value={result ? formatRupiah(result.totalBayar) : "—"}
            />
            <p className="passbook__note">
              *Simulasi bersifat estimasi, bukan penawaran resmi. Margin final
              ditentukan setelah verifikasi pengajuan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LedgerRow({ label, value, highlight }) {
  return (
    <div className={`ledger-row ${highlight ? "ledger-row--highlight" : ""}`}>
      <span>{label}</span>
      <span className="ledger-row__value">{value}</span>
    </div>
  );
}
