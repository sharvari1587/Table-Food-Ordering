import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  width: 300px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #0056b3;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #004494;
  }
`;

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/adlogin', {
        username,
        password
      });
      localStorage.setItem('adminToken', response.data.token);
      alert('Login successful!');
      navigate('/admin/orders');
      // Redirect to admin dashboard or wherever needed
    } catch (error) {
      alert('Failed to login!');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Admin Login</Title>
        <label>
          <Input type="text" value={username} placeholder="Username" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <Input type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </label>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;
