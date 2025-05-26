import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Row, Col } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
import { auth, db } from "/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  const location = useLocation();

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const navRef = useRef();

  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      return cartSnap.exists() ? cartSnap.data().items : [];
    },
    refetchOnWindowFocus: false,
  });

  const cartCount = cart.length;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isLandingPage = location.pathname === "/";

  const showNavbar = () => navRef.current.classList.toggle("responsive_nav");
  const handleClick = () => {
    showNavbar();
    scrollToTop();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`w-full${
        isLandingPage ? "bg-transparent z-50 absolute top-0 left-0" : "bg-white "
      }`}
    >
      <Row justify={"center"}>
        <Col className="navbar" span={20}>
          <h3>
            <NavLink to="/">
              <img className="w-40 " src="./LOGO1.png" alt="Logo" />
            </NavLink>
          </h3>

          <nav ref={navRef}>
            <NavLink onClick={handleClick} className="nav-menu-logo hidden">
              <img className="logo-menu" src="./LOGO1.png" alt="Logo" />
            </NavLink>

            <NavLink
              onClick={handleClick}
              className={
                isLandingPage
                  ? "nav-link active-link"
                  : ({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
              }
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              onClick={handleClick}
              className={
                isLandingPage
                  ? "nav-link active-link"
                  : ({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
              }
              to="/products"
            >
              Products
            </NavLink>

            <NavLink
              onClick={handleClick}
              className={
                isLandingPage
                  ? "nav-link active-link"
                  : ({ isActive }) =>
                      isActive ? "nav-link active-link" : "nav-link"
              }
              to="/contact"
            >
              Contact
            </NavLink>

            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="nav-link active-link logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link" onClick={handleClick}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="nav-link"
                  onClick={handleClick}
                >
                  Register
                </NavLink>
              </>
            )}
            <NavLink
              to="/cart"
              onClick={handleClick}
              className="nav-link relative cart-icon"
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="cart-counter absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <button
              className="nav-btn nav-close-btn flex ms-auto"
              onClick={handleClick}
            >
              <h1>Menu</h1> <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </Col>
      </Row>
    </header>
  );
}

export default Navbar;
