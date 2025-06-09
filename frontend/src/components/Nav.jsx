import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import whiteLogo from '../assets/Logotype/White.png';
import mainLogo from '../assets/Logotype/Main.png';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'PORTFOLIO', path: '/' },
    { name: 'SERVICES', path: '/services' },
    { name: 'À PROPOS DE NOUS', path: '/about' },
    { name: 'BLOG', path: '/blog' },
  ];

  return (
    <nav className="w-[90%] m-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={isHome ? whiteLogo : mainLogo}
              alt="Landmark"
              className="h-10 md:min-w-[200px] md:h-14"
            />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center space-x-6 lg:space-x-8 ${isHome ? 'text-white' : 'text-black'}`}>
            <div className="flex justify-between space-x-6 lg:space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm md:text-base relative group ${location.pathname === link.path ? 'font-semibold' : ''}`}
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
            <button
              className={`bg-transparent ${
                isHome ? 'text-white border-white' : 'text-black border-black'
              } border text-sm md:text-base px-4 py-1.5 transition-all duration-300 hover:border-blue-600 whitespace-nowrap`}
            >
              CONSULTATION GRATUITE
            </button>
          </div>

          {/* Mobile Button */}
          <button
            className={`lg:hidden ${isHome ? 'text-white' : 'text-black'} focus:outline-none`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden h-screen pt-4 pb-2">
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
