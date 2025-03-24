// src/components/FeaturedCollection.jsx
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Card, Skeleton } from "antd";
import { Link } from "react-router-dom";

const fetchFeaturedProducts = async () => {
  const response = await fetch("/products.json");
  const allProducts = await response.json();
  return allProducts
    .filter((product) => product.featured) // or .slice(0, 4) if not using featured property
    .slice(0, 4);
};

const FeaturedCollection = () => {
  const {
    data: featuredProducts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: fetchFeaturedProducts,
  });

  if (isError) {
    return (
      <div className="text-center py-8 text-rose-600">
        Error loading featured products: {error.message}
      </div>
    );
  }

  return (
    <section className="featured-collection py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-white text-center mb-8 text-burgundy-800 font-bold">
          Featured Collection
        </h2>

        <Row gutter={[24, 24]} justify="center">
          {isLoading
            ? [1, 2, 3, 4].map((item) => (
                <Col key={item} xs={24} sm={12} md={8} lg={6}>
                  <Card className="product-card h-full">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </Card>
                </Col>
              ))
            : featuredProducts.map((product) => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <div className="product-card p-4 hover:transform hover:scale-105 transition-all h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-contain mb-4"
                    />
                  </div>
                </Col>
              ))}
        </Row>

        {!isLoading && (
          <div className="text-center mt-8">
            <Link to="/products">
              <button
                type="primary"
                className="cta-button px-8 py-3 rounded-full bg-rose-300 hover:bg-rose-400  text-rose-100 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                size="large"
              >
                View All Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollection;
