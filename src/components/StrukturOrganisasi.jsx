import React from "react";

export default function StrukturOrganisasi() {
  // Data Dewan Pengawas (Ketua ditaruh di tengah / urutan ke-2)
  const dataPengawas = [
    {
      id: "pengawas-1",
      name: "Hodi Maolidi",
      role: "Anggota",
      image: "/assets/pengawas/hodi.png",
      isLeader: false,
    },
    {
      id: "pengawas-2",
      name: "Ali Mustofa",
      role: "Ketua",
      image: "/assets/pengawas/ali.png",
      isLeader: true,
    },
    {
      id: "pengawas-3",
      name: "Juliendo Bastian",
      role: "Anggota",
      image: "/assets/pengawas/juliendo.png",
      isLeader: false,
    },
  ];

  // Data Pengurus Koperasi (Ketua ditaruh di tengah / urutan ke-2)
  const dataPengurus = [

    {
      id: "pengurus-1",
      name: "Fatih Anugerah",
      role: "Sekretaris Koperasi",
      image: "/assets/pengurus/fatih.png",
      isLeader: false,
    },
    {
      id: "pengurus-2",
      name: "Indra Bhuwana",
      role: "Ketua Koperasi",
      image: "/assets/pengurus/indra.png",
      isLeader: true,
    },
    {
      id: "pengurus-3",
      name: "M. Hamdan Prasetyo",
      role: "Bendahara Koperasi",
      image: "/assets/pengurus/hamdan.png", // Sesuaikan path foto
      isLeader: false,
    },
  ];

  // Fungsi untuk mencetak kartu agar kode tidak berulang panjang
  const renderCard = (person) => (
    <div
      key={person.id}
      className={`pengawas-card ${person.isLeader ? "pengawas-card--leader" : ""}`}
    >
      <div className="pengawas-card__image-wrapper">
        {person.image ? (
          <img src={person.image} alt={person.name} />
        ) : (
          <div className="pengawas-card__placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        )}
        <div className="pengawas-card__pattern"></div>
      </div>

      <div className="pengawas-card__info">
        <div className="pengawas-card__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
        </div>
        <div className="pengawas-card__text">
          <h3>{person.name}</h3>
          <span className="pengawas-card__role">{person.role}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section id="struktur" className="section pengawas">
      <div className="container">
        <div className="section-heading" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          <span className="eyebrow">Struktur Organisasi</span>
          <h2>Susunan Kepengurusan</h2>
          <p>
            Berkomitmen untuk menjaga transparansi, integritas, dan mengelola setiap langkah demi kemajuan bersama seluruh anggota Koperasi Karyawan PT KIE.
          </p>
        </div>

        {/* --- BAGIAN DEWAN PENGAWAS --- */}
        <div className="struktur-group">
          <h3 className="struktur-title">Dewan Pengawas</h3>
          <div className="pengawas__grid">
            {dataPengawas.map(renderCard)}
          </div>
        </div>

        {/* --- GARIS PEMISAH --- */}
        <div className="struktur-divider"></div>

        {/* --- BAGIAN PENGURUS KOPERASI --- */}
        <div className="struktur-group">
          <h3 className="struktur-title">Pengurus Koperasi</h3>
          <div className="pengawas__grid">
            {dataPengurus.map(renderCard)}
          </div>
        </div>

      </div>
    </section>
  );
}
