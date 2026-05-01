import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
      <Header cartItems={cartItems} setCartItems={setCartItems}/>
      <p1 className="text-center mt-1">Welcome to Flipzone - Your Ultimate Online Shopping Destination!</p1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems}/>} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
