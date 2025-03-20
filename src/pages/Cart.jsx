import { useQuery } from "@tanstack/react-query";
import { Card, Button, Row, Col } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const goToCheckout = () => {
    navigate("/checkout");
  };

  // Fetch cart data from localStorage
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      return storedCart || [];
    },
  });

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    refetch(); // Refetch cart data
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        toast.info(`${item.title} quantity increased!`);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartInLocalStorage(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === productId && item.quantity > 1) {
          toast.info(`${item.title} quantity decreased!`);
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter((item) => item.quantity > 0); // Remove item if quantity is 0
    updateCartInLocalStorage(updatedCart);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    const removedProduct = cartItems.find((item) => item.id === productId);

    if (removedProduct) {
      toast.error(`${removedProduct.title} removed from cart!`);
    }

    updateCartInLocalStorage(updatedCart);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-card">
          <h2>Your cart is empty!</h2>
          <Button type="primary" onClick={() => navigate("/products")}>
            Shop Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-40">
      <Row gutter={[16, 16]} justify="center">
        {cartItems.map((product) => (
          <Col key={product.id} xs={22} sm={12} md={8} lg={8}>
            <Card
              className="product-card"
              title={product.title}
              cover={
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
              }
            >
              <p>Price: {product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <div className="flex justify-between items-center">
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <Button
                    className="text-xl"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </Button>
                  <span>{product.quantity}</span>
                  <Button
                    className="text-xl"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </Button>
                </div>
                {/* Remove Item */}
                <Button
                  className="text-xl text-red-500"
                  onClick={() => removeItemFromCart(product.id)}
                >
                  X
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Cart Summary */}
      <div className="mt-10 p-4 bg-gray-100 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">List of Products:</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>
              {item.quantity} x {item.title}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        {/* Total Price */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
          <h3 className="text-lg font-semibold">Total Price:</h3>
          <span className="text-lg font-semibold">
            ${totalPrice.toFixed(2)}
          </span>
          <Button
            type="primary"
            className="go-to-checkout"
            onClick={goToCheckout}
          >
            Go to Checkout
          </Button>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Cart;
