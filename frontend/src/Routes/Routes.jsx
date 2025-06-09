import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ServicesPage from '../pages/ServicesPage';
import Blog from '../pages/Blog';
import Portfolio from '../pages/Portfolio';

function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default RoutesList;
