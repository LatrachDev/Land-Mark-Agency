import { BrowserRouter } from 'react-router-dom';
import RoutesList from './Routes/Routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RoutesList />
    </BrowserRouter>
  );
}

export default App;
