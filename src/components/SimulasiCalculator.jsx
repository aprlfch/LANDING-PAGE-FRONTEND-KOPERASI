import { useState, useEffect } from "react";

const formatRupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function SimulasiCalculator() {
  const [tipe, setTipe] = useState("kie"); // Default ke Organik KIE
  const [pokok, setPokok] = useState(5000000);
  const [tenor, setTenor] = useState(10);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const maxPokok = tipe === "usb" ? 5000000 : 20000000;

  // Auto-koreksi plafon maksimal jika tipe karyawan berubah
  useEffect(() => {
    if (pokok > maxPokok) {
      setPokok(maxPokok);
    }
  }, [tipe, maxPokok, pokok]);

  // Auto-koreksi tenor jika plafon tidak memenuhi syarat minimal tenor
  useEffect(() => {
    let valid = false;
    if (tenor === 10) valid = true;
    if (tenor === 12 && pokok >= 3000000) valid = true;
    if (tenor === 24 && tipe === "kie" && pokok >= 6000000) valid = true;

    if (!valid) {
      setTenor(10);
    }
  }, [pokok, tipe, tenor]);

  function hitungSimulasi(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // Menggunakan kalkulasi lokal agar hasil 100% presisi dengan tabel
    setTimeout(() => {
      try {
        // Margin: 1.15% untuk 10 & 12 bln, 1.10% untuk 24 bln
        const marginPerBulan = tenor === 24 ? 0.011 : 0.0115;

        const totalBunga = pokok * marginPerBulan * tenor;
        const totalBayar = pokok + totalBunga;
        // Dibulatkan untuk menyesuaikan dengan nilai mutlak di tabel
        const cicilanPerBulan = Math.round(totalBayar / tenor);

        setResult({
          pokok,
          tenor,
          bungaPersenPerBulan: tenor === 24 ? 1.1 : 1.15,
          cicilanPerBulan,
          totalBayar,
        });
      } catch (err) {
        setError("Terjadi kesalahan kalkulasi. Coba lagi.");
      } finally {
        setLoading(false);
      }
    }, 400); // Simulasi delay proses UI
  }

  return (
    <section id="simulasi" className="section simulasi">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Simulasi Pembiayaan</span>
          <h2>Hitung estimasi cicilan Anda</h2>
          <p>
            Pilih tipe keanggotaan, jumlah, dan tenor pinjaman, lalu lihat
            estimasi cicilan bulanan Anda langsung di buku tabungan digital berikut.
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
              <label htmlFor="tipe">Tipe Keanggotaan</label>
              <select
                id="tipe"
                value={tipe}
                onChange={(e) => setTipe(e.target.value)}
                style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
              >
                <option value="usb">Karyawan USB</option>
                <option value="kie">Organik KIE</option>
              </select>
            </div>

            <div className="passbook__field">
              <label htmlFor="pokok">Jumlah Pinjaman</label>
              <input
                id="pokok"
                type="range"
                min="1000000"
                max={maxPokok}
                step="1000000" // Step disesuaikan per 1 Juta sesuai tabel
                value={pokok}
                onChange={(e) => setPokok(Number(e.target.value))}
              />
              <div className="passbook__value">{formatRupiah(pokok)}</div>
            </div>

            <div className="passbook__field">
              <label htmlFor="tenor">Tenor Pinjaman</label>
              <select
                id="tenor"
                value={tenor}
                onChange={(e) => setTenor(Number(e.target.value))}
                style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
              >
                <option value={10}>10 bulan</option>
                {pokok >= 3000000 && <option value={12}>12 bulan</option>}
                {tipe === "kie" && pokok >= 6000000 && (
                  <option value={24}>24 bulan</option>
                )}
              </select>
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
            <LedgerRow
              label="Pokok Pinjaman"
              value={formatRupiah(result?.pokok ?? pokok)}
            />
            <LedgerRow
              label="Tenor"
              value={`${result?.tenor ?? tenor} bulan`}
            />
            <LedgerRow
              label="Margin / bulan"
              value={`${result?.bungaPersenPerBulan ?? (tenor === 24 ? 1.1 : 1.15)}%`}
            />
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
              *Simulasi bersifat estimasi. Margin final ditentukan setelah
              verifikasi pengajuan.
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