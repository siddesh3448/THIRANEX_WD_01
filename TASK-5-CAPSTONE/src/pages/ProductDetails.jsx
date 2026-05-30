import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Check, Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Parse ID and find product from data array
  useEffect(() => {
    const matched = products.find((p) => p.id === parseInt(id, 10));
    if (matched) {
      setProduct(matched);
      setQuantity(1); // Reset counter on product switch
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found container" id="not-found-view">
        <div className="not-found-box">
          <ArrowLeft className="warning-back-icon" />
          <h2 className="not-found-heading">Product Not Located</h2>
          <p className="not-found-tag">
            The workspace index couldn't recover product ID: {id}. It may have been discontinued 
            or renamed by the curator team.
          </p>
          <Link to="/products" className="btn btn-primary" id="go-products-btn">
            Return to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Manage counter controls
  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  // Trigger global context checkout append
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    
    // Animate item added label check state
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-details-page container" id="extended-product-view">
      {/* 1. Back button trigger */}
      <div className="details-header-nav">
        <Link to="/products" className="btn-back-link" id="back-catalog-link">
          <ArrowLeft className="back-arrow-icon" /> Back to Catalog
        </Link>
      </div>

      {/* 2. Structured Layout: Card grid separating visual and textual resources */}
      <main className="details-grid-layout" id={`details-container-${product.id}`}>
        {/* Left Column: Visual image showcase panel */}
        <section className="details-visual-showcase">
          <div className="details-image-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="details-display-image"
              id="main-details-img"
            />
          </div>
        </section>

        {/* Right Column: Detailed pricing, information, specs & dynamic counter */}
        <section className="details-content-panel">
          <span className="details-category-bubble">{product.category}</span>
          
          <h1 className="details-title" id="details-product-title">{product.name}</h1>

          {/* Ratings row */}
          <div className="details-rating-row">
            <div className="star-rating big-stars">
              <Star className="star-icon-filled" />
              <span className="rating-score">{product.rating.toFixed(1)}</span>
            </div>
            <span className="reviews-label">Based on {product.reviewsCount} customer verify ratings</span>
          </div>

          {/* Pricing panel */}
          <div className="details-price-tag" id="details-product-price">
            ${product.price.toFixed(2)}
          </div>

          <p className="details-long-description" id="details-product-desc">
            {product.description}
          </p>

          {/* Feature Bullets showcase */}
          {product.features && product.features.length > 0 && (
            <div className="details-feature-showcase">
              <h3 className="specs-section-heading">Product Highlights</h3>
              <ul className="details-feature-list">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="spec-item">
                    <span className="spec-indicator-bullet">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Counter widget + Purchase Action Row */}
          <div className="purchase-controls-card">
            <div className="counter-column">
              <label htmlFor="qty-counter" className="counter-input-label">Select Quantity:</label>
              <div className="counter-component-body">
                <button 
                  type="button" 
                  onClick={handleDecrease}
                  disabled={quantity <= 1}
                  className="counter-btn"
                  id="qty-minus-btn"
                  aria-label="Decrease specific count"
                >
                  <Minus className="counter-btn-icon" />
                </button>
                <span className="counter-qty-number" id="qty-count-display">{quantity}</span>
                <button 
                  type="button" 
                  onClick={handleIncrease}
                  className="counter-btn"
                  id="qty-plus-btn"
                  aria-label="Increase specific count"
                >
                  <Plus className="counter-btn-icon" />
                </button>
              </div>
            </div>

            <div className="cta-button-column">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`btn btn-primary btn-add-fullwide ${isAdded ? 'success-cta' : ''}`}
                id="details-add-to-cart-btn"
              >
                {isAdded ? (
                  <>
                    <Check className="cta-icon-decor" />
                    <span>Added to Cart Securely!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="cta-icon-decor" />
                    <span>Add {quantity} to Shopping Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Shipping and security claims */}
          <div className="details-claims-list">
            <div className="claim-bullet">
              <Truck className="claim-icon" />
              <span>Complimentary expedited shipping within 3-5 standard days.</span>
            </div>
            <div className="claim-bullet">
              <Shield className="claim-icon" />
              <span>Covers a comprehensive 1-year product warranty.</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
