import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Flame, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export default function Home() {
  // Select top 3 products sorted by rating as featured items
  const featuredProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="home-page" id="home-view">
      {/* 1. Hero Showcase Section */}
      <section className="hero-section" id="hero-banner">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tagline">
              <Flame className="tagline-icon" /> Pure Quality, Handcrafted Comfort
            </span>
            <h1 className="hero-title" id="main-hero-title">
              Elevate Your Daily <br />
              <span className="accent-glow">Digital Lifestyle</span>
            </h1>
            <p className="hero-description">
              Discover our exclusive summer curation of premium audio accessories, minimalist fashion 
              statements, smart ambient systems, and high-quality organic skincare elements.
            </p>
            <div className="hero-cta-row">
              <Link to="/products" className="btn btn-primary" id="hero-primary-link">
                Browse Catalog <ArrowRight className="btn-arrow" />
              </Link>
              <Link to="/about" className="btn btn-secondary" id="hero-secondary-link">
                Learn Story
              </Link>
            </div>
          </div>
          <div className="hero-visual-wrapper">
            {/* Visual element representing standard product aesthetic */}
            <div className="hero-image-card">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80" 
                alt="AeroSound Max Pro Headphones" 
                className="hero-image"
              />
              <div className="hero-badge-overlay">
                <div className="star-rating">
                  <Star className="star-icon-filled" />
                  <span className="rating-text">4.9 Star Curation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Propositions Row */}
      <section className="trust-badges-section" id="value-proposition-row">
        <div className="container trust-grid">
          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <Truck className="trust-icon" />
            </div>
            <h3 className="trust-title">Complimentary Delivery</h3>
            <p className="trust-desc">Enjoy free standard shipping on all global orders exceeding $49.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <ShieldCheck className="trust-icon" />
            </div>
            <h3 className="trust-title">Secure Checkouts</h3>
            <p className="trust-desc">Your credentials are protected with end-to-end 256-bit encryption.</p>
          </div>
          <div className="trust-card">
            <div className="trust-icon-wrapper">
              <RefreshCw className="trust-icon" />
            </div>
            <h3 className="trust-title">30-Day Replacements</h3>
            <p className="trust-desc">Not fully satisfied? Ship it back for a quick hassle-free refund.</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Display */}
      <section className="featured-section" id="featured-products-display">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-subtitle">Summer Highlights</span>
              <h2 className="section-title">The Top-Rated Curation</h2>
            </div>
            <Link to="/products" className="view-all-link">
              View Entire Collection <ArrowRight className="link-arrow" />
            </Link>
          </div>

          <div className="product-grid" id="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Call-to-action Promo Banner */}
      <section className="promo-banner-section" id="offer-promo-banner">
        <div className="container">
          <div className="promo-container">
            <div className="promo-content">
              <span className="promo-badge">Limited Seasonal Offer</span>
              <h2 className="promo-title">Upgrade Your Remote Setup with 15% Reduction</h2>
              <p className="promo-desc">
                Subscribe to our insider newsletter or secure your order today and recieve an immediate 
                discount on premium workspace essentials like split keyboards and adaptive lamps.
              </p>
              <Link to="/products" className="btn btn-primary btn-light-theme">
                Claim Now <ArrowRight className="btn-arrow" />
              </Link>
            </div>
            <div className="promo-visual-aside">
              <img 
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80" 
                alt="Workspace accessories promotional" 
                className="promo-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
