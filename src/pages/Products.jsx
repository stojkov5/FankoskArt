// src/pages/Products.jsx (updated)
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Button, Skeleton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import ProductDetailsModal from "../components/ProductDetailsModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Products = () => {
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

  const { data: cart = [] } = useQuery({
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
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    await setDoc(cartRef, { items: updatedCart });
    toast.success(`${product.title} added to cart!`);
  };

  if (isLoading) return <Skeleton active paragraph={{ rows: 8 }} />;

  return (
    <div className="container mx-auto py-40">
      <Row gutter={[16, 16]} justify="center" className="flex items-center">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <div className="product-card bg-rose-200 p-4 border rounded-lg shadow-md h-full flex flex-col justify-between">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain md:w-52 h-full p-0"
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <div className="flex flex-col gap-2">
                <Button className='add-to-cart-btn' type="primary" onClick={() => addToCart(product)}>
                  Add to Cart
                </Button>
                <Button className='add-to-cart-btn' onClick={() => showProductDetails(product)}>
                  View Details
                </Button>
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

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default Products;