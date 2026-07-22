import { useEffect, useState } from "react";

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let active = true;
    async function loadNews() {
      try {
        const res = await fetch("/api/news?limit=3");
        if (!res.ok) throw new Error("Gagal memuat berita");
        const json = await res.json();
        if (active) {
          setNews(json.data);
          setStatus("success");
        }
      } catch (err) {
        if (active) setStatus("error");
      }
    }
    loadNews();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="tentang" className="section berita">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Berita &amp; Informasi Terkini</span>
          <h2>Kabar terbaru dari koperasi</h2>
          <p>Diperbarui langsung dari server — informasi resmi seputar pengumuman, edukasi, dan kegiatan anggota.</p>
        </div>

        {status === "loading" && (
          <div className="berita__grid">
            {[1, 2, 3].map((i) => (
              <div className="berita-card berita-card--skeleton" key={i} />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="berita__error">
            Berita belum bisa dimuat. Pastikan server Express berjalan di
            <code> localhost:4000</code>.
          </p>
        )}

        {status === "success" && (
          <div className="berita__grid">
            {news.map((item) => (
              <article className="berita-card" key={item.id}>
                <span className="berita-card__kategori">{item.kategori}</span>
                <h3>{item.judul}</h3>
                <p>{item.ringkasan}</p>
                <div className="berita-card__footer">
                  <time>{formatTanggal(item.tanggal)}</time>
                  <a href="#" className="berita-card__link">Baca Selengkapnya →</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
