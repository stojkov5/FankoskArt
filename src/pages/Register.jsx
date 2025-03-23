import { useState } from 'react';
import { auth } from '/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto py-40 max-w-md">
      <h2 className="text-2xl mb-4">Register</h2>
      <Form onSubmitCapture={handleRegister} className="flex flex-col gap-4">
        <Form.Item label="Full Name" required>
          <Input 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" required>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;