export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="30" height="30" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="17" r="17" fill="#C9A227" />
              <path d="M10 22V12l7 5 7-5v10" stroke="#0F3D3E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span>Koperasi Karyawan PT KIE</span>
          </div>
          <p>
            Koperasi Simpan Pinjam berbadan hukum resmi yang melayani
            anggota dengan prinsip transparansi dan gotong royong sejak 2015.
          </p>
          <p className="footer__legal">
            No. Badan Hukum: 518/BH/2015 &nbsp;•&nbsp; NIK Koperasi: 12.03.4.5.6789
          </p>
        </div>

        <div className="footer__col">
          <h4>Kontak</h4>
          <p>Jl. Merdeka Raya No. 45, Bandung, Jawa Barat 40115</p>
          <p>Email: halo@koperasisejahtera.id</p>
          <p>WhatsApp: 0812-3456-7890</p>
        </div>

        <div className="footer__col">
          <h4>Tautan Cepat</h4>
          <a href="#layanan">Layanan</a>
          <a href="#simulasi">Simulasi Cicilan</a>
          <a href="#daftar">Daftar Anggota</a>
          <a href="#masuk">Masuk Anggota</a>
        </div>

        <div className="footer__col">
          <h4>Ikuti Kami</h4>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Koperasi Karyawan PT KIE. Seluruh hak cipta dilindungi.</span>
        <span>Diawasi oleh Kementerian Koperasi dan UKM Republik Indonesia</span>
      </div>
    </footer>
  );
}
