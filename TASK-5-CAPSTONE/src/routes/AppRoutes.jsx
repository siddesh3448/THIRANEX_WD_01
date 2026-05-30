import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Lazy load key pages to optimize Lighthouse speed, bundle chunk sizes and load performance
const Home = lazy(() => import('../pages/Home'));
const Products = lazy(() => import('../pages/Products'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Cart = lazy(() => import('../pages/Cart'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));

// Pure loading spinner component for Suspense chunks
function PageSpinnerFallback() {
  return (
    <div className="chunk-loader-overlay" id="page-suspense-loader">
      <div className="loader-box-wrapper text-center">
        <Loader2 className="spinning-loader-icon" />
        <p className="loader-text-status">Assembling Catalog Shelf...</p>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageSpinnerFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Wildcard 404 handler rerouting to catalog shelf */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
