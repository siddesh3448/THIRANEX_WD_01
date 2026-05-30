import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { cartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(s => !s);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header" id="app-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu} id="brand-link">
          <ShoppingBag className="icon-logo" />
          <span className="brand-text">Thira<span className="accent-text">Shop</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" id="desktop-navigation">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} end>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            Contact
          </NavLink>
        </nav>

        {/* Right Action Icons (Cart & Mobile Toggle) */}
        <div className="header-actions">
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'icon-nav-item active' : 'icon-nav-item'} id="cart-nav-link">
            <div className="cart-badge-container">
              <ShoppingCart className="cart-icon" />
              {cartItemsCount > 0 && (
                <span className="cart-badge-dot" id="cart-item-count">
                  {cartItemsCount}
                </span>
              )}
            </div>
          </NavLink>

          {/* Hamburger Menu Toggle for Mobile viewports */}
          <button 
            className="mobile-menu-toggle" 
            onClick={toggleMenu}
            aria-label="Toggle Navigation Options"
            id="mobile-menu-btn"
          >
            {isMenuOpen ? <X className="toggle-icon" /> : <Menu className="toggle-icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay and Navigation menu */}
      <div className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`} id="mobile-navigation-drawer">
        <div className="mobile-nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={closeMenu} end>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={closeMenu}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={closeMenu}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'mobile-nav-item active mobile-cart-item' : 'mobile-nav-item mobile-cart-item'} onClick={closeMenu}>
            <span>Cart ({cartItemsCount})</span>
            <ShoppingCart className="mobile-cart-icon" />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
