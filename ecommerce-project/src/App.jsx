import {HomePage} from './pages/home/HomePage';
import { Routes, Route} from 'react-router';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import {TrackingPage} from './pages/TrackingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  }

  useEffect(() => {
    loadCart();

  }, []);

  window.axios = axios;

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>}></Route>
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>}></Route>
      <Route path="/orders" element={<OrdersPage cart={cart} loadCart={loadCart} />}></Route>
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>}></Route>
      <Route path="*" element={<NotFoundPage cart={cart} />}></Route>
    </Routes>
  )
}

export default App
