import { useState } from "react";
import { auth } from "/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto py-40 max-w-md">
      <h2 className="text-4xl text-white text-center font-bold mb-4">
        Register
      </h2>
      <Form onSubmitCapture={handleRegister} className="flex flex-col gap-4">
        <Input
          className="p-2 border rounded"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          className="p-2 border rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          className="p-2 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="primary"
          htmlType="submit"
          className="cta-button px-8 py-3 rounded-full bg-rose-300 hover:bg-rose-400 text-rose-100 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
