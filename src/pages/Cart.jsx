import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { db } from "/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/firebase";

const Cart = () => {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.uid],
    queryFn: async () => {
      if (!user) return [];
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      return cartSnap.exists() ? cartSnap.data().items : [];
    },
  });

  const updateCart = async (updatedCart) => {
    if (!user) return;

    await queryClient.cancelQueries(["cart", user.uid]);
    const previousCart = queryClient.getQueryData(["cart", user.uid]) || [];
    queryClient.setQueryData(["cart", user.uid], updatedCart);

    try {
      await setDoc(doc(db, "carts", user.uid), { items: updatedCart });
    } catch {
      queryClient.setQueryData(["cart", user.uid], previousCart);
      toast.error("Failed to update cart");
    }

    queryClient.invalidateQueries(["cart", user.uid]);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        toast.info(`${item.title} quantity increased!`);
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCart(updatedCart);
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
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    const removedProduct = cartItems.find((item) => item.id === productId);
    if (removedProduct) toast.error(`${removedProduct.title} removed!`);
    updateCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const goToCheckout = () => navigate("/checkout");

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-card">
          <h2>Your cart is empty!</h2>
          <button
            className="cta-button px-8 py-3 rounded-full bg-rose-300 hover:bg-rose-400  text-rose-100 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-40">
      <Row gutter={[16, 16]} justify="center">
        {cartItems.map((product) => (
          <Col key={product.id} xs={22} sm={12} md={8} lg={8}>
            <div className="product-card bg-rose-200 p-4 border rounded-lg shadow-md h-full flex flex-col justify-between">
              <img
                src={product.image}
                className="object-contain w-full h-full p-4"
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </Button>
                  <span>{product.quantity}</span>
                  <Button onClick={() => increaseQuantity(product.id)}>
                    +
                  </Button>
                </div>
                <Button
                  className="text-red-500"
                  onClick={() => removeItemFromCart(product.id)}
                >
                  X
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

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
