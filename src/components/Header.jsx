import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">FankoskArt</div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <ul className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <li>
            <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</Link>
          </li>
          <li>
            <Link to="/products" className="block py-2 px-4 hover:bg-gray-700 rounded">Products</Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 px-4 hover:bg-gray-700 rounded">Contact</Link>
          </li>
          <li>
            <Link to="/cart" className="block py-2 px-4 hover:bg-gray-700 rounded">Shopping Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

