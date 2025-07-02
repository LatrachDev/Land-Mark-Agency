import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH } from '../config/routes';
import { Helmet } from "react-helmet";
import mainLogo from '../assets/Logotype/Main.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate(DASHBOARD_PATH);
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | LandMark</title>
        <meta name="description" content="Connectez-vous en tant qu'administrateur pour accéder au tableau de bord." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-white font-['Jost'] px-4">
        <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
         

          <div className="flex justify-center mb-8">
            <img
              src={mainLogo}
              alt="LandMark Logo"
              className="h-16"
            />
          </div>

          {error && <p className="text-red-500 font-semibold mb-4 text-center">{error}</p>}

          <div className="mb-4">
            <label className="block text-[#010e26] font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#445ef2]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[#010e26] font-bold mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#445ef2]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#445ef2] text-white font-bold uppercase tracking-wide py-3 px-6 rounded-lg w-full hover:bg-[#3344b5] transition duration-300"
          >
            Connexion
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
