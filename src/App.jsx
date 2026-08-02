import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Skeleton } from 'antd';
import { ToastContainer } from 'react-toastify';
import { PrivateRoute } from './constants/routesConfig';
import { ProfileContext } from './context/ProfileContext';
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TrustStats from "./components/TrustStats.jsx";
import Services from "./components/Services.jsx";
import SimulasiCalculator from "./components/SimulasiCalculator.jsx";
import Testimonials from "./components/Testimonials.jsx";
import NewsSection from "./components/NewsSection.jsx";
import Footer from "./components/Footer.jsx";
import NewsDetail from './components/NewsDetail.jsx';
import MasterContent from './pages/Content/MasterContent/MasterContent.jsx';
import CreateContent from './pages/Content/CreateContent/CreateContent.jsx';
import Pengawas from './components/Pengawas.jsx';
import StrukturOrganisasi from './components/StrukturOrganisasi.jsx';


// Lazy pages
const Login = lazy(() => import('./pages/Login/Login'));
const Home = lazy(() => import('./pages/Home/Home'));
const ErrorPage = lazy(() => import('./pages/Error/ErrorPage'));


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <StrukturOrganisasi />
        {/* <Pengawas /> */}
        <SimulasiCalculator />
        {/* <Testimonials /> */}
        <NewsSection />
      </main>
      <Footer />
    </>
  );
};



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

    // LANDING
    {
      path: "/",
      element: <LandingPage />,
    },


    // LOGIN
    {
      path: "/login",
      element: <Login />,
    },


    // HOME
    {
      path: "/home",
      element:
        <PrivateRoute>
          <Home />
        </PrivateRoute>
    },


    // CONTENT MASTER LAPORAN SHIFT
    {
      path: "/content",
      element:
        <PrivateRoute>
          <MasterContent />
        </PrivateRoute>
    },

    {
      path: "/content/create-content",
      element:
        <PrivateRoute>
          <CreateContent />
        </PrivateRoute>
    },



    // DETAIL BERITA
    {
      path: "/berita/:slug",
      element: <NewsDetailPage />,
    },


    // ERROR
    {
      path: "*",
      element:
        <ErrorPage
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
    }

  ];



  return (
    <Router>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
      />


      <Suspense fallback={<Skeleton active />}>

        <Routes>

          {
            routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))
          }

        </Routes>

      </Suspense>


    </Router>
  );
}


export default App;