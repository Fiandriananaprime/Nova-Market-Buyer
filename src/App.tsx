import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './components/shared';
import { Router } from './routes';

const App = () => (
  <BrowserRouter>
    <ShopProvider>
      <Router />
    </ShopProvider>
  </BrowserRouter>
);

export default App;
