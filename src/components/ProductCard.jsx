/* eslint-disable react/prop-types */
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="border bg-gray-400 p-4 shadow-lg rounded-lg text-center flex flex-col relative overflow-hidden transition duration-300 transform hover:scale-105 hover:shadow-xl h-80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md"
      />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p>${product.price.toFixed(2)}</p>
      
      {/* Hover Effect */}
      <div
        className={`mt-auto transition-all duration-300 ${isHovered ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full">Add to Cart</button>
        <button className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 w-full">Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
