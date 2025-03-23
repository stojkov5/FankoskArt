import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-40 text-center">
      <h1 className="text-3xl mb-8">Checkout Page</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="mb-4">Payment integration coming soon!</p>
        <Button type="primary" onClick={() => navigate(-1)}>
          Back to Cart
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
