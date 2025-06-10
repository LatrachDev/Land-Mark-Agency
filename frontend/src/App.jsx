import { BrowserRouter } from 'react-router-dom';
import RoutesList from './Routes/Routes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import './fonts.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
