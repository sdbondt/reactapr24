import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed for navigation

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
