import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import whiteLogo from '../assets/Logotype/White.png';
import mainLogo from '../assets/Logotype/Main.png';

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let scrollThreshold;

      if (window.innerWidth >= 1280) { // Desktop 
        scrollThreshold = 1350;
      } else if (window.innerWidth >= 768) { // Tablet 
        scrollThreshold = 1100;
      } else { // Mobile 
        scrollThreshold = 900;
      }

      setScrolled(scrollY > scrollThreshold);
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initialize scroll state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const shouldUseDarkColors = scrolled || !isHome;

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'PORTFOLIO', path: '/portfolio' },
    { name: 'SERVICES', path: '/services' },
    { name: 'À PROPOS DE NOUS', path: '/about' },
    { name: 'BLOG', path: '/blog' },
  ];

  return (
    <>
      <nav className={`w-full sticky top-0 z-50 backdrop-blur-sm ${
        shouldUseDarkColors ? 'bg-white/0' : 'bg-transparent'
      } transition-colors duration-300`}>
        
        <div className="w-[90%] m-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center py-4 sm:px-6 z-60 relative">
              <img
                src={shouldUseDarkColors || menuOpen ? mainLogo : whiteLogo}
                alt="Landmark"
                className="w-28 sm:w-40"
              />
            </Link>

            {/* Desktop Nav */}
            <div className={`hidden xl:flex items-center space-x-8 ${
              shouldUseDarkColors ? 'text-black' : 'text-white'
            }`}>
              <div className="flex justify-between space-x-8">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm md:text-base relative group whitespace-nowrap ${
                      location.pathname === link.path ? 'font-semibold' : ''
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 ${
                        location.pathname === link.path ? 'w-full' : 'w-0'
                      } h-0.5 bg-[#445EF2] transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </Link>
                ))}
              </div>
              <Link to="/contact"
                className={`bg-transparent ${
                  shouldUseDarkColors ? 'text-black border-black' : 'text-white border-white'
                } border text-sm md:text-base px-4 py-1.5 transition-all duration-300 hover:border-[#445EF2] hover:bg-[#445EF2] whitespace-nowrap`}
              >
                CONSULTATION GRATUITE
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              className={`xl:hidden z-60 relative ${
                shouldUseDarkColors || menuOpen ? 'text-black' : 'text-white'
              } focus:outline-none`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg 
                className={`w-6 h-6 transform transition-transform duration-300 ${
                  menuOpen ? 'rotate-90' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-white">
          <div className="flex flex-col justify-center items-center h-full px-8">
            <div className="flex flex-col mt-30 space-y-8 text-center">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xl sm:text-2xl relative block group text-black ${
                    location.pathname === link.path ? 'font-semibold' : ''
                  } hover:text-[#445EF2] transition-colors duration-300`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 ${
                      location.pathname === link.path ? 'w-full' : 'w-0'
                    } h-0.5 bg-[#445EF2] transition-all duration-300 group-hover:w-full`}
                  ></span>
                </Link>
              ))}

              <Link
                to="/contact"
                className="bg-transparent text-black border-black border text-sm sm:text-xl px-6 py-3 transition-all duration-300 hover:bg-[#445EF2] hover:border-[#445EF2] hover:text-white mt-8"
                onClick={() => setMenuOpen(false)}
              >
                CONSULTATION GRATUITE
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;