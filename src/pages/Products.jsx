
import products from "../products";
import ProductCard from "../components/ProductCard";
const Products= () => {
    return (
        <div className="container mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      );
    };


export default Products;