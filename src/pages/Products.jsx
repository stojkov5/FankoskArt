import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Row, Col, Skeleton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Products = () => {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user] = useAuthState(auth);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/products.json");
      return await response.json();
    },
  });

  useQuery({
    queryKey: ["cart", user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      return cartSnap.exists() ? cartSnap.data().items : [];
    },
  });

  const showProductDetails = (product) => {
    
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const addToCart = async (product) => {
    

    if (!user) {
      toast.error("Please login to add items to cart!");
      return;
    }

    const cartRef = doc(db, "carts", user.uid);

    await queryClient.cancelQueries(["cart", user.uid]);
    const previousCart = queryClient.getQueryData(["cart", user.uid]) || [];

    const updatedCart = [...previousCart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    queryClient.setQueryData(["cart", user.uid], updatedCart);

    try {
      await setDoc(cartRef, { items: updatedCart });
      toast.success(`${product.title} added to cart!`);
    } catch {
      queryClient.setQueryData(["cart", user.uid], previousCart);
      toast.error("Failed to update cart");
    }

    queryClient.invalidateQueries(["cart", user.uid]);
  };

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  return (
    <div className="container mx-auto py-20">
      <div className="text-center mb-8">
        <h2 className="text-4xl text-white text-center font-bold">Products</h2>
        <h3 className="text-center text-white">
          Note: You can order a painting similar to this one, with different
          size and color.
        </h3>
      </div>

      <Row gutter={[16, 16]} justify="center" className="flex items-center">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="product-card bg-rose-200 p-4 border rounded-lg shadow-md h-full flex flex-col justify-between relative">
              {product.soldOut && (
                <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  SOLD
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="object-contain md:w-52 h-full p-0"
              />
              <div className="text-center product-info">
                <h3>{product.title}</h3>
                <p>Price: {product.price}€</p>
                <div className="flex flex-col gap-2">
                  <button
                    className={`cta-button px-8 py-3 rounded-full font-semibold transition-all duration-300 transform shadow-lg bg-rose-300 hover:bg-rose-400 text-rose-100 hover:scale-105 hover:shadow-xl"
                    }`}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="cta-button px-8 py-3 rounded-full font-semibold transition-all duration-300 transform shadow-lg bg-rose-300 hover:bg-rose-400 text-rose-100 hover:scale-105 hover:shadow-xl"
                    onClick={() => showProductDetails(product)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <ProductDetailsModal
        product={selectedProduct}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />

      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Products;
