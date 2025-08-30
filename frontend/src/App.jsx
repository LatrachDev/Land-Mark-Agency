import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RoutesList from './Routes/Routes';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import MobilePerformanceOptimizer from './components/MobilePerformanceOptimizer';
import MobilePerformanceMonitor from './components/MobilePerformanceMonitor';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SmoothFollower from './components/SmoothFollower';
import './App.css';
import './fonts.css';
import './styles/mobile-performance.css';
import usePageTracking from './hooks/usePageTracking';
import useMobilePerformance from './hooks/useMobilePerformance';

function App() {
  usePageTracking();
  useMobilePerformance(); // Initialize mobile performance optimizations

  return (
    <>
      <PerformanceOptimizer />
      <MobilePerformanceOptimizer />
      <MobilePerformanceMonitor />
      <SmoothFollower /> 
      <ScrollToTop />
      <RoutesList />
    </>
  );
}

export default App;
