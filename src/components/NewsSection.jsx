import { useEffect, useState } from "react";
import { getPublicNewsList } from "../services/news.service"; // sesuaikan path service kamu

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
        const res = await getPublicNewsList({ page: 1, limit: 3 });
        // Struktur response: { status, data: { data: [...], pagination } }
        // axios membungkus sekali lagi jadi res.data, jadi array-nya
        // ada di res.data.data.data — bukan res.data.data.
        const items = res?.data?.data?.data ?? [];
        if (active) {
          setNews(items);
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

        {status === "success" && news.length === 0 && (
          <p className="berita__empty">Belum ada berita yang dipublikasikan.</p>
        )}

        {status === "success" && news.length > 0 && (
          <div className="berita__grid">
            {news.map((item) => (
              <article className="berita-card" key={item.id}>
                <span className="berita-card__kategori">
                  {item.category?.name || "Umum"}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <div className="berita-card__footer">
                  <time>
                    {formatTanggal(item.publishedAt || item.createdAt)}
                  </time>
                  <a href={`/berita/${item.slug}`} className="berita-card__link">
                    Baca Selengkapnya →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}