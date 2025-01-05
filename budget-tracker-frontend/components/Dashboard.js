// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login'; // Redirect to login if no token
    }

    const fetchExpenses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(data);
      } catch (err) {
        console.log('Error fetching expenses', err);
      }
    };

    fetchExpenses();
  }, [token]);

  return (
    <div>
      <h2>Your Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <p>{expense.category}: ${expense.amount}</p>
            <p>{expense.description}</p>
            <p>{new Date(expense.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;