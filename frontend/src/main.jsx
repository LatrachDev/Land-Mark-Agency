import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './fonts.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactGA from "react-ga4";

ReactGA.initialize("G-HTXEP3YFW0");

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
