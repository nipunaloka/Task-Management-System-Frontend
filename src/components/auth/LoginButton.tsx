import React from 'react';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    // Redirect to the backend's Google OAuth login route
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Login with Google
    </button>
  );
};

export default LoginButton;
