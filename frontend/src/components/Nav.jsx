import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import whiteLogo from '../assets/Logotype/White.png';
import mainLogo from '../assets/Logotype/Main.png';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'À PROPOS DE NOUS', path: '/about' },
    { name: 'BLOG', path: '/blog' },
  ];

  return (
    // <nav className="w-[90%] m-auto">
    <nav className={`w-full sticky top-0 z-50 backdrop-blur-sm ${
    isHome ? 'bg-transparent' : 'bg-white/60'
    } transition-colors duration-300`}>
      
      <div className="w-[90%] m-auto">
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4"> */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center pt-4 sm:px-6">
            <img
              src={isHome ? whiteLogo : mainLogo}
              alt="Landmark"
              className="w-40"
            />
          </Link>

          {/* Desktop Nav - Show only when there's enough space */}
          <div className={`hidden xl:flex items-center space-x-8 ${isHome ? 'text-white' : 'text-black'}`}>
            <div className="flex justify-between space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm md:text-base relative group whitespace-nowrap ${location.pathname === link.path ? 'font-semibold' : ''}`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 ${
                      location.pathname === link.path ? 'w-full' : 'w-0'
                    } h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full`}
                  ></span>
                </Link>
              ))}
            </div>
            <Link to="/contact"
              className={`bg-transparent ${
                isHome ? 'text-white border-white' : 'text-black border-black'
              } border text-sm md:text-base px-4 py-1.5 transition-all duration-300 hover:border-blue-600 whitespace-nowrap`}
            >
              CONSULTATION GRATUITE
            </Link>
          </div>

          {/* Mobile Button - Show when space is limited */}
          <button
            className={`xl:hidden ${isHome ? 'text-white' : 'text-black'} focus:outline-none`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="xl:hidden h-screen pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base relative block py-2 group ${isHome ? 'text-white' : 'text-black'} ${
                    location.pathname === link.path ? 'font-semibold' : ''
                  }`}
                  onClick={() => setMenuOpen(false)} // Close menu on click
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 ${
                      location.pathname === link.path ? 'w-full' : 'w-0'
                    } h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full`}
                  ></span>
                </Link>
              ))}

              <button
                className={`bg-transparent text-base px-4 py-2 border ${
                  isHome ? 'text-white border-white' : 'text-black border-black'
                } transition-all duration-300 hover:border-blue-600 w-full mt-2`}
              >
                CONSULTATION GRATUITE
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;