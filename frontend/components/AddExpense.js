// src/components/AddExpense.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddExpense = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/expenses/add',
        { category, description, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/');
    } catch (err) {
      console.log('Error adding expense', err);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default AddExpense;