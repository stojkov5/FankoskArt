import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-opacity-0 fixed top-0 w-full z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center relative">
        {/* Logo - Always on the left in desktop, centered in mobile */}
        <div className="text-lg font-semibold md:w-1/3 text-center md:text-left">
          <img className="header-logo w-24" src="./LOGO1.png" alt="Logo" />
        </div>

        {/* Desktop Navigation - Centered Menu */}
        <ul className="hidden md:flex md:items-center md:space-x-6 bg-white py-2 px-6 rounded-full shadow-lg">
          <li>
            <NavLink to="/" className="py-2 px-4 hover:text-gray-700">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="py-2 px-4 hover:text-gray-700">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="py-2 px-4 hover:text-gray-700">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Shopping Cart - Positioned to the far right */}
        <div className="md:w-1/3 flex justify-end">
          <NavLink to="/cart" className=" shopping-cart-btn relative text-white text-xl">
            <FaShoppingCart className="text-gray-700 hover:text-black" />
          </NavLink>
        </div>

        {/* Mobile Navigation - Burger Menu */}
        <div className="md:hidden absolute right-4 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu - Full screen dropdown with animation */}
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 transform transition-transform duration-500 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-2xl text-gray-700"
          >
            ✖
          </button>
          <NavLink
            to="/"
            className="text-2xl font-semibold hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className="text-2xl font-semibold hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/contact"
            className="text-2xl font-semibold hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            <FaShoppingCart className="text-3xl text-gray-700 hover:text-black" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
