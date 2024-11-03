import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Custom authentication logic
    if (username === 'gyssagaraprince@gmail.com' && password === 'Prince123') {
      localStorage.setItem('auth', 'true');
      // Redirect to the dashboard or any other page after successful login
      window.location.href = '/dashboard'; // Change to your desired route
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
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
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}
          
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
          
          <p className="text-sm text-center text-gray-500">
            Don’t have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
