import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import HeroLanding from "../components/HeroLanding";
const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  return (
    <div className="relative min-h-screen-screen overflow-hidden">
      {isLandingPage && <HeroLanding />}
      <Header />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
