import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Import the background image
  // Ensure you have this path correct

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(250, 250, 250, 0.93));
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  color: #fff;  // Changed text color for better readability on dark background
`;

const Title = styled.h2`
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.85);  // Increased opacity for better readability
  padding: 10px;
  border-radius: 10px;
  color:black;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #34495E;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 100px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  color: #fff;
  background-color: #3498DB;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #2980B9;
    transform: translateY(-2px);
  }
`;

const AddMenu = () => {
  const [menuItem, setMenuItem] = useState({
    name: '',
    img: '',
    price: '',
    desc: '',
    category: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add-menu', menuItem);
      alert('Menu item added successfully');
      setMenuItem({
        name: '',
        img: '',
        price: '',
        desc: '',
        category: '',
        rating: ''
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
      alert('Failed to add menu item');
    }
  };

  return (
    <Container>
      <Title>Add Menu Item</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Name:</Label>
        <Input type="text" name="name" value={menuItem.name} onChange={handleChange} />

        <Label>Image URL:</Label>
        <Input type="text" name="img" value={menuItem.img} onChange={handleChange} />

        <Label>Price:</Label>
        <Input type="text" name="price" value={menuItem.price} onChange={handleChange} />

        <Label>Description:</Label>
        <TextArea name="desc" value={menuItem.desc} onChange={handleChange} />

        <Label>Category:</Label>
        <Input type="text" name="category" value={menuItem.category} onChange={handleChange} />

        <Label>Rating:</Label>
        <Input type="text" name="rating" value={menuItem.rating} onChange={handleChange} />

        <Button type="submit">Add Item</Button>
      </Form>
    </Container>
  );
};

export default AddMenu;
