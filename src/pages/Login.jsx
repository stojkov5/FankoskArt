import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "/firebase";
import { Button, Form, Input } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto py-40 max-w-md">
      <h2 className="text-4xl text-white text-center font-bold mb-4">Login</h2>
      <Form onFinish={handleLogin} className="flex flex-col gap-4">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          className="cta-button px-8 py-3 rounded-full bg-rose-300 hover:bg-rose-400 text-rose-100 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
