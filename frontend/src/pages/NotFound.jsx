import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | LandMark</title>
        <meta name="description" content="La page que vous recherchez est introuvable." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-white font-['Jost'] px-4">
        <div className="bg-gray-100 p-8 rounded-2xl shadow-md text-center max-w-lg w-full">
          <h1 className="text-5xl font-extrabold text-[#445ef2] mb-4">404</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-[#010e26] mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#445ef2] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#3344b5] transition duration-300"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
