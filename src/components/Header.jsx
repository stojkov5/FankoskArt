import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => JSON.parse(localStorage.getItem("cart")) || [],
    refetchOnWindowFocus: false,
  });

  const cartCount = cart.length

  return (
    <header className="bg-opacity-0 fixed top-0 w-full z-50">
      <nav className="container mx-auto p-4 flex justify-between items-center relative">
        <div className="text-lg font-semibold md:w-1/3 text-center md:text-left">
          <img className="header-logo w-24" src="./LOGO1.png" alt="Logo" />
        </div>

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

        <div className="md:w-1/3 flex justify-end">
          <NavLink to="/cart" className="shopping-cart-btn relative text-white text-xl">
            <FaShoppingCart className="text-gray-700 hover:text-black" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
