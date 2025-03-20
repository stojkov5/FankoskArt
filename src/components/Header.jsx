import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: () => JSON.parse(localStorage.getItem('cart')) || [],
    refetchOnWindowFocus: false,
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartCount = cart.length;

  return (
    <header className="bg-opacity-0 fixed top-0 w-full z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center relative">
        <div className="text-lg font-semibold md:w-1/3 text-center md:text-left">
          <img className="header-logo w-24" src="./LOGO1.png" alt="Logo" />
        </div>

        {/* Hamburger Menu Button for mobile */}
        <button
          className="md:hidden text-gray-700 hover:text-black text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Fullscreen Mobile Menu with Close Button */}
        <ul
          className={`${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          } fixed top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center transition-all ease-in-out duration-500 md:hidden`}
        >
          <li className="py-4">
            <button
              className="text-gray-800 text-3xl absolute top-4 right-6"
              onClick={toggleMenu}
            >
              <FaTimes />
            </button>
          </li>
          <li className="py-4">
            <NavLink to="/" className="text-2xl text-gray-800" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li className="py-4">
            <NavLink to="/products" className="text-2xl text-gray-800" onClick={toggleMenu}>
              Products
            </NavLink>
          </li>
          <li className="py-4">
            <NavLink to="/contact" className="text-2xl text-gray-800" onClick={toggleMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
        

        {/* Normal Navbar for Desktop */}
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

        {/* Shopping Cart */}
        <div className="md:w-1/3 flex justify-end ps-4">
          <NavLink to="/cart" className="shopping-cart-btn relative text-white text-xl">
            <FaShoppingCart className="text-gray-700 hover:text-black" />
            {cartCount > 0 && (
              <span className="cart-counter absolute  bg-red-500 text-white rounded-full  ">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
