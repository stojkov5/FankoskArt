import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Row, Col, Button } from "antd";
import ReactCardFlip from "react-card-flip";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from "react";

const Products = () => {
  const [isFlipped, setIsFlipped] = useState({});
  const [cardHeights, setCardHeights] = useState({});
  const cardRefs = useRef({}); // Store references to the cards

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

  useEffect(() => {
    // After products are rendered, calculate the max height of the front side of each card
    const heights = {};
    products.forEach((product) => {
      const frontCard = cardRefs.current[product.id]?.front;
      if (frontCard) {
        heights[product.id] = frontCard.clientHeight; // Store the height
      }
    });
    setCardHeights(heights); // Store card heights in state
  }, [products]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto py-40">
      <Row gutter={[16, 16]} justify={"center"} className="flex items-center">
        {products.map((product) => (
          <Col key={product.id} xs={22} sm={12} md={8} lg={8}>
            <ReactCardFlip
              isFlipped={isFlipped[product.id] || false}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <Card
                ref={(el) => (cardRefs.current[product.id] = { ...cardRefs.current[product.id], front: el })}
                onClick={() => handleFlip(product.id)}
                className="product-card"
                title={product.title}
                cover={
                  <img
                    className="product-image"
                    src={product.image}
                    alt={product.title}
                  />
                }
                style={{ width: "100%" }}
              >
                <div className="product-card-content">
                  <p>Price: {product.price}</p>
                  <Button
                    type="primary"
                    onClick={(event) => addToCart(product, event)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>

              {/* Back Side */}
              <Card
                ref={(el) => (cardRefs.current[product.id] = { ...cardRefs.current[product.id], back: el })}
                onClick={() => handleFlip(product.id)}
                className="product-card"
                title={product.title}
                cover={
                  <div className="px-4 text-center">
                    <h1>{product.description}</h1>
                  </div>
                }
                style={{
                  width: "100%",
                  minHeight: cardHeights[product.id] || "auto", // Ensure the back card has the same height as the front
                }}
              >
                <div className="product-card-content">
                
                  <p>Width: {product.width}</p>
                  <p>Height: {product.height}</p>
                </div>
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
