import React, { useState } from 'react';

const PASSWORD = 'business2025'; // Change this to your desired password

const PasswordGate: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem('bg_authorized', 'true');
      onAuth();
    } else {
      setError('Incorrect password.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Business Glossary Login</h2>
        <p className="text-sm text-gray-500 text-center mb-2">For access-related assistance, kindly connect with Devesh Nagar at devesh.nagar@gainwelltechnologies.com.</p>
        <input
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
        />
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default PasswordGate;
