import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsBySlug } from "../services/news.service";
import Footer from "./Footer";

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function NewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    async function loadDetail() {
      setStatus("loading");
      try {
        const res = await getNewsBySlug(slug);
        const item = res?.data?.data ?? null;
        if (active) {
          if (item) {
            setNews(item);
            setStatus("success");
          } else {
            setStatus("error");
          }
        }
      } catch (err) {
        if (active) setStatus("error");
      }
    }
    loadDetail();
    return () => {
      active = false;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <>
        <section className="section berita-detail">
          <div className="container berita-detail__container">
            {/* Animasi Skeleton Loading */}
            <div className="berita-detail__skeleton-img"></div>
            <div className="berita-detail__skeleton-text"></div>
            <div className="berita-detail__skeleton-text short"></div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (status === "error" || !news) {
    return (
      <>
        <section className="section berita-detail">
          <div className="container berita-detail__container">
            <div className="berita-detail__error-box">
              <h2>Oopps!</h2>
              <p>Berita tidak ditemukan atau sudah tidak tersedia.</p>
              <Link to="/#tentang" className="btn btn-outline">
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="section berita-detail">
        <div className="container berita-detail__container">

          <div className="berita-detail__topbar">
            <Link to="/#tentang" className="berita-detail__back">
              <span aria-hidden="true" className="back-arrow">←</span>
              <span>Kembali</span>
            </Link>
            <span className="berita-card__kategori">
              {news.category?.name || "Umum"}
            </span>
          </div>

          {news.thumbnail ? (
            <img
              src={news.thumbnail}
              alt={news.title}
              className="berita-detail__thumbnail"
            />
          ) : (
            <div className="berita-detail__thumbnail berita-detail__thumbnail--placeholder">
              <span>{news.category?.name || "Berita Terbaru"}</span>
            </div>
          )}

          <h1 className="berita-detail__title">{news.title}</h1>

          <div className="berita-detail__meta">
            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>{formatTanggal(news.publishedAt || news.createdAt)}</span>
            </div>

            {news.author?.fullname && (
              <div className="meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Oleh {news.author.fullname}</span>
              </div>
            )}

            <div className="meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>{news.views ?? 0}x dibaca</span>
            </div>
          </div>

          {news.excerpt && (
            <div className="berita-detail__excerpt">
              <p>{news.excerpt}</p>
            </div>
          )}

          <div className="berita-detail__content">
            {news.content}
          </div>

          {news.tags?.length > 0 && (
            <div className="berita-detail__tags">
              {news.tags.map((tag) => (
                <span key={tag.id} className="berita-detail__tag">#{tag.name}</span>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}