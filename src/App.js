import './App.css';
import { Routes, Route } from 'react-router-dom';
import ArtMainPage from './Screens/ArtMainPage';
import ProductsPage from './Screens/ProductsPage';
import CartPage from './Components/CartPage';
import { CartProvider } from './Context/CartContext';
import CheckoutPage from './Components/CheckoutPage';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';

function App() {
  return (
   
    <CartProvider>
      
        <Routes>
          <Route path="/" element={<ArtMainPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="/about" element={<AboutPage/>} />
           <Route path="/contact" element={<ContactPage/>} />
        </Routes>
     
    </CartProvider>
   
  );
}

export default App;