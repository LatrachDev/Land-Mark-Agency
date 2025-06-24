import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import RoutesList from './Routes/Routes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SmoothFollower from './components/SmoothFollower';
import './App.css';
import './fonts.css';

function App() {
  return (
    <BrowserRouter>
      <SmoothFollower /> 
      <ScrollToTop />
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
