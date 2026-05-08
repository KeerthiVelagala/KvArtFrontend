import './App.css';
import { Routes, Route } from 'react-router-dom';
import ArtMainPage from './Screens/ArtMainPage';
import ProductsPage from './Screens/ProductsPage';
import CartPage from './Components/CartPage';
import { CartProvider } from './Context/CartContext';
import CheckoutPage from './Components/CheckoutPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
   
    <CartProvider>
      
        <Routes>
          <Route path="/" element={<ArtMainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
     
    </CartProvider>
   
  );
}

export default App;