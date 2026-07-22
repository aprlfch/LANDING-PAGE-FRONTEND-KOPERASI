import { useState } from "react";

const TESTIMONI = [
  {
    nama: "Ibu Sri Wahyuni",
    usaha: "Pemilik Warung Sembako, Bandung",
    kutipan:
      "Berkat pinjaman modal dari koperasi, saya bisa menambah stok dagangan tanpa pusing bunga tinggi. Prosesnya juga cepat dan pengurusnya sangat membantu.",
  },
  {
    nama: "Pak Agus Setiawan",
    usaha: "Pengrajin Furnitur, Jepara",
    kutipan:
      "SHU yang saya terima tiap tahun benar-benar terasa manfaatnya untuk mengembangkan usaha mebel keluarga. Semua laporan keuangannya transparan.",
  },
  {
    nama: "Ibu Ratna Dewi",
    usaha: "Katering Rumahan, Yogyakarta",
    kutipan:
      "Simpanan sukarela di sini membantu saya disiplin menabung untuk membeli peralatan dapur baru. Pelayanannya ramah seperti keluarga sendiri.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONI.length;

  const go = (dir) => setIndex((i) => (i + dir + total) % total);
  const current = TESTIMONI[index];

  return (
    <section className="section testimoni">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Cerita Anggota</span>
          <h2>Dipercaya para pelaku usaha kecil</h2>
        </div>

        <div className="testimoni__card">
          <span className="testimoni__quote-mark" aria-hidden="true">&ldquo;</span>
          <p className="testimoni__text">{current.kutipan}</p>
          <div className="testimoni__footer">
            <div className="testimoni__avatar">{current.nama.charAt(0)}</div>
            <div>
              <div className="testimoni__nama">{current.nama}</div>
              <div className="testimoni__usaha">{current.usaha}</div>
            </div>
          </div>

          <div className="testimoni__nav">
            <button onClick={() => go(-1)} aria-label="Testimoni sebelumnya">‹</button>
            <div className="testimoni__dots">
              {TESTIMONI.map((_, i) => (
                <span key={i} className={i === index ? "active" : ""} onClick={() => setIndex(i)} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Testimoni berikutnya">›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
