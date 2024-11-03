// src/components/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Separate state for email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add simple validation
    if (username === '' || email === '' || password === '') {
      setError('All fields are required.');
      return;
    }
    // You can add more signup logic here (e.g., API call)
    console.log('Sign Up:', { username, email, password });
    setError(''); // Clear error on successful submission
    // Reset fields
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Go Back Home Button */}
      <button
        type="button"
        onClick={() => navigate('/')} // Use navigate to go back home
        className="absolute top-4 left-72 py-2 px-4 font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Go Back Home
      </button>

      <div className="relative w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Names
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your names"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email" // Change type to email for better validation
              placeholder="Enter your email"
              value={email} // Use separate state for email
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
          
          <p className="text-sm text-center text-gray-500">
            Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
