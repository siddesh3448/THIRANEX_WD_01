import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app-viewport-layout" id="catalog-app-root">
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          
          <main className="content-rendered-panel" id="main-content-flow">
            <AppRoutes />
          </main>
          
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}
