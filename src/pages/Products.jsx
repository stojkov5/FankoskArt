import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Row, Col, Button } from "antd";

import { ToastContainer, toast } from "react-toastify";


const Products = () => {

  const queryClient = useQueryClient();

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

  const addToCart = (product) => {
    

    const updatedCart = [...cart];
    const cartProductIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (cartProductIndex >= 0) {
      updatedCart[cartProductIndex].quantity += 1; 
    } else {
      updatedCart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    queryClient.invalidateQueries("cart"); 
    toast.success(`${product.title} added to cart!`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="container mx-auto py-40">
      <Row gutter={[16, 16]} justify={"center"} className="flex items-center">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={8} xl={8}>
            <div className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Height: {product.height}</p>
              <p>Width: {product.width}</p>
              <p>Technique: {product.technique}</p>
              <p>Price: {product.price}</p>
              <Button
                type="primary"
                onClick={(event) => addToCart(product, event)}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
};

export default Products;
