import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calendar, Skeleton } from 'antd';
import { ToastContainer } from 'react-toastify';
import { PublicRoute, PrivateRoute } from './constants/routesConfig';
import { ProfileContext } from './context/ProfileContext';
import "./App.css";

// Import komponen UI dari kode kedua
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TrustStats from "./components/TrustStats.jsx";
import Services from "./components/Services.jsx";
import SimulasiCalculator from "./components/SimulasiCalculator.jsx";
import Testimonials from "./components/Testimonials.jsx";
import NewsSection from "./components/NewsSection.jsx";
import Footer from "./components/Footer.jsx";
import NewsDetail from './components/NewsDetail.jsx';

// Import halaman menggunakan lazy loading
const Login = lazy(() => import('./pages/Login/Login'));
const Home = lazy(() => import('./pages/Home/Home'));
const ErrorPage = lazy(() => import('./pages/Error/ErrorPage'));

// Komponen wrapper untuk halaman depan (Landing Page)
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <SimulasiCalculator />
        <Testimonials />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
};

// Wrapper untuk halaman detail berita, biar Navbar & Footer tetap konsisten
const NewsDetailPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <NewsDetail />
      </main>
      <Footer />
    </>
  );
};

function App() {
  const { getMe } = React.useContext(ProfileContext);

  const routes = [
    // Panggil LandingPage di dalam PublicRoute untuk path '/'
    { path: '/', element: <PublicRoute><LandingPage /></PublicRoute> },
    // Halaman detail berita, publik, tanpa wrapper PublicRoute/PrivateRoute
    { path: '/berita/:slug', element: <NewsDetail /> },
    { path: '/home', element: <PrivateRoute><Home /></PrivateRoute> },
    { path: '/error-403', element: <ErrorPage title='403' subTitle='Sorry, you cannot access this page!' /> },
    { path: '*', element: <ErrorPage title='404' subTitle='Sorry, the page you visited does not exist.' /> },
  ];

  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Suspense fallback={<Skeleton active />}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;