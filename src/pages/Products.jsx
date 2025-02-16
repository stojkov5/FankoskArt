import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Row, Col, Button } from "antd";
import ReactCardFlip from "react-card-flip";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";

const Products = () => {
  const [isFlipped, setIsFlipped] = useState({});

  const handleFlip = (productId) => {
    setIsFlipped((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Toggle flip state for the specific product
    }));
  };

  const queryClient = useQueryClient();

  // Fetch products and store them in localStorage if not already stored
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const storedProducts = JSON.parse(localStorage.getItem("products"));
      if (storedProducts) return storedProducts;

      const response = await fetch("/products.json");
      const productsData = await response.json();
      localStorage.setItem("products", JSON.stringify(productsData));
      return productsData;
    },
    refetchOnWindowFocus: false,
  });

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: () => JSON.parse(localStorage.getItem("cart")) || [],
    refetchOnWindowFocus: false,
  });

  const addToCart = (product, event) => {
    event.stopPropagation(); // Prevent card from flipping

    const updatedCart = [...cart];
    const cartProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (cartProductIndex >= 0) {
      updatedCart[cartProductIndex].quantity += 1; // Increase quantity if product exists
    } else {
      updatedCart.push({ ...product, quantity: 1 }); // Add new product with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    queryClient.invalidateQueries("cart"); // Refetch cart data to update counter and UI
    toast.success(`${product.title} added to cart!`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto py-20">
      <Row gutter={[16, 16]} className="flex  items-center">
        {products.map((product) => (
          <Col key={product.id} xs={22} sm={12} md={8} lg={8}>
            {/* ReactCardFlip now ensures both sides have the same size */}
            <ReactCardFlip
              isFlipped={isFlipped[product.id] || false}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <Card
                onClick={() => handleFlip(product.id)} // Flip specific card
                className="product-card"
                title={product.title}
                cover={
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                }
                style={{ width: "100%"}} // Ensure the card has consistent size
              >
                <p>Price: {product.price}</p>
                <p>Description: {product.description || "No description"}</p>
                {/* Add event.stopPropagation() in the onClick handler */}
                <Button
                  type="primary"
                  onClick={(event) => addToCart(product, event)}
                >
                  Add to Cart
                </Button>
              </Card>

              {/* Back Side */}
              <Card
                key={product.id}
                onClick={() => handleFlip(product.id)} // Flip back to front
                className="product-card"
                style={{ width: "100%"  }} 
              >
                <p>Back Side</p>
                <p>{product.description}</p>
              </Card>
            </ReactCardFlip>
          </Col>
        ))}
      </Row>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Products;
