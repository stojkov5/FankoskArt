import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Row, Col } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/NavBar.css";
import { useQuery } from "@tanstack/react-query";
import { FaShoppingCart } from "react-icons/fa";
function Navbar() {
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => JSON.parse(localStorage.getItem("cart")) || [],
    refetchOnWindowFocus: false,
  });



  

  const cartCount = cart.length;
  const navRef = useRef();
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const handleClick = () => {
    showNavbar();
    scrollToTop();
  };

  const isLandingPage = location.pathname === "/";

  return (
    <header>
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
            <NavLink to="/cart" onClick={handleClick} className="nav-link relative">
              <FaShoppingCart className="text-gray-700 hover:text-black" />
              {cartCount > 0 && (
                  <span className="cart-counter absolute  bg-red-500 text-white rounded-full  ">
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
