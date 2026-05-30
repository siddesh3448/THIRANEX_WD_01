import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, Heart, ShoppingBag, CreditCard, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { 
    cart, 
    increaseQuantity, 
    decreaseQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    cartItemsCount 
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('review'); // 'review' | 'confirmed'
  const [orderId, setOrderId] = useState('');

  // Fixed financial rules
  const taxRate = 0.08; // 8% sales tax
  const freeShippingThreshold = 49.00;
  
  const calculatedShipping = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0.00 : 9.99;
  const calculatedTax = cartTotal * taxRate;
  const grandTotal = cartTotal + calculatedShipping + calculatedTax;

  // Simulate transactional checkout
  const handleProceedCheckout = () => {
    if (cart.length === 0) return;
    
    // Generate a beautiful mock order ID
    const generatedOrder = "THX-" + Math.floor(Math.random() * 900000 + 100000);
    setOrderId(generatedOrder);
    setCheckoutStep('confirmed');
    
    // Defer cart clear to let react clear details smoothly
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  // If order was simulated successfully, render a high-quality confirmation screen
  if (checkoutStep === 'confirmed') {
    return (
      <div className="cart-page-wrapper container" id="confirmed-receipt-view">
        <div className="receipt-container">
          <div className="receipt-success-badge">
            <Sparkles className="badge-sparkle-icon" />
          </div>
          <h1 className="receipt-title">Order Confirmed!</h1>
          <p className="receipt-subtitle">
            Thank you for shopping at ThiraShop! Your simulation order has been processed.
          </p>

          <div className="receipt-summary-box">
            <h3 className="summary-title">Reservation Summary</h3>
            <div className="summary-row-item">
              <span className="summary-label">Order Identifer:</span>
              <strong className="summary-value" id="receipt-order-id">{orderId}</strong>
            </div>
            <div className="summary-row-item">
              <span className="summary-label">Status of Order:</span>
              <span className="summary-value order-status-chip">Paid & Ready</span>
            </div>
            <div className="summary-row-item">
              <span className="summary-label">Transaction Method:</span>
              <strong className="summary-value">Simulated Wallet Gate</strong>
            </div>
            <hr className="receipt-divider" />
            <div className="summary-row-item grand-total-row">
              <span className="summary-label">Final Charged Bill:</span>
              <span className="summary-value" id="receipt-grand-total">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-footer-warnings">
            <AlertCircle className="warning-decor-icon" />
            <p className="warning-short-text">
              <strong>Demo Notice:</strong> This is a frontend Capstone simulation. 
              No physical packages will be delivered, and no actual bank cards were charged.
            </p>
          </div>

          <Link to="/products" className="btn btn-primary btn-full-width" id="receipt-back-btn">
            Return to Products Shop
          </Link>
        </div>
      </div>
    );
  }

  // Render original Shopping Cart View
  return (
    <div className="cart-page-wrapper container" id="shopping-cart-view">
      <section className="cart-header">
        <h1 className="page-title">Your Cart Shelf</h1>
        <p className="page-subtitle">
          Manage your selected workspace accessories, skincare oils and fashion statements. 
          Enjoy complimentary shipping on all orders over $49.
        </p>
      </section>

      {cart.length > 0 ? (
        <div className="cart-grid-layout" id="cart-workspace">
          {/* Left Side: Product line-items list */}
          <main className="cart-items-collection">
            <div className="cart-collection-header">
              <span>Selected Products ({cartItemsCount} items)</span>
              <button 
                type="button" 
                onClick={clearCart} 
                className="btn-clear-all"
                id="clear-cart-btn"
              >
                Clear All Goods
              </button>
            </div>

            <div className="cart-items-list" id="cart-list-container">
              {cart.map((item) => (
                <article key={item.id} className="cart-item-row" id={`cart-item-${item.id}`}>
                  {/* Thumbnail Cover */}
                  <div className="cart-item-thumbnail">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="thumbnail-img" 
                    />
                  </div>

                  {/* Detail Context block */}
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.category}</span>
                    <Link to={`/product/${item.id}`} className="cart-item-title-link">
                      <h3 className="cart-item-name" id={`cart-item-title-${item.id}`}>{item.name}</h3>
                    </Link>
                    <span className="cart-item-unit-price" id={`cart-item-price-${item.id}`}>
                      Price: ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity adjustment cluster */}
                  <div className="cart-item-qty-cluster">
                    <span className="control-label">Qty:</span>
                    <div className="qty-selectors">
                      <button 
                        type="button" 
                        onClick={() => decreaseQuantity(item.id)}
                        className="qty-selector-btn decrement-btn"
                        id={`qty-minus-${item.id}`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="selector-icon" />
                      </button>
                      <span className="qty-selector-display" id={`qty-display-${item.id}`}>{item.quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => increaseQuantity(item.id)}
                        className="qty-selector-btn increment-btn"
                        id={`qty-plus-${item.id}`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="selector-icon" />
                      </button>
                    </div>
                  </div>

                  {/* Total pricing item and direct delete anchor */}
                  <div className="cart-item-pricing-action">
                    <span className="item-row-total" id={`item-row-total-${item.id}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => removeFromCart(item.id)}
                      className="trash-delete-btn"
                      id={`delete-btn-${item.id}`}
                      aria-label={`Delete ${item.name} from cart`}
                    >
                      <Trash2 className="trash-icon" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Back indicator */}
            <div className="cart-back-navigation">
              <Link to="/products" className="cart-continue-link" id="cart-continue-shopping-link">
                <ArrowLeft className="back-nav-arrow" /> Let's Add More Items
              </Link>
            </div>
          </main>

          {/* Right Side: High-fidelity order financials summary card */}
          <aside className="cart-summary-sidebar">
            <div className="summary-billing-card" id="summary-billing-block">
              <h3 className="summary-card-heading">Order Financials</h3>
              
              <div className="billing-rows-stack">
                <div className="billing-row-item">
                  <span className="bill-label">Catalog Subtotal</span>
                  <span className="bill-value" id="subtotal-val">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="billing-row-item">
                  <span className="bill-label">Expedited Shipping</span>
                  <span className="bill-value" id="shipping-val">
                    {calculatedShipping === 0 ? "FREE" : `$${calculatedShipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="billing-row-item">
                  <span className="bill-label">Sales Surcharge (8%)</span>
                  <span className="bill-value" id="tax-val">${calculatedTax.toFixed(2)}</span>
                </div>

                {calculatedShipping > 0 && (
                  <div className="shipping-upsell-warning">
                    Add <strong>${(freeShippingThreshold - cartTotal).toFixed(2)}</strong> more to unlock <strong>FREE Shipping</strong>!
                  </div>
                )}
                
                <hr className="billing-summary-hr" />

                <div className="billing-row-item total-billing-row">
                  <span className="bill-label">Grand Gross Total</span>
                  <span className="bill-value" id="grand-total-val">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout triggers with demo descriptions */}
              <div className="billing-checkout-trigger">
                <button 
                  type="button" 
                  onClick={handleProceedCheckout}
                  className="btn btn-primary btn-checkout-execute"
                  id="checkout-trigger-btn"
                >
                  <CreditCard className="checkout-icon-decor" />
                  <span>Secure Mock Checkout</span>
                </button>
                <p className="checkout-badge-help">
                  End-to-end sandbox simulated gate. No billing data will be requested.
                </p>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Empty cart placeholder section */
        <div className="cart-empty-fallback-box" id="empty-cart-plate">
          <div className="empty-cart-icon-wrapper">
            <ShoppingCart className="fallback-cart-icon" />
          </div>
          <h2 className="empty-cart-heading">Your Cart is Currently Empty</h2>
          <p className="empty-cart-desc">
            It looks like you haven't selected any premium digital lifestyle, fashion, 
            or beauty wellness catalog items yet. Head to our curated catalog to begin!
          </p>
          <Link to="/products" className="btn btn-primary" id="empty-cart-catalog-link">
            Start Filling Cart
          </Link>
        </div>
      )}
    </div>
  );
}
