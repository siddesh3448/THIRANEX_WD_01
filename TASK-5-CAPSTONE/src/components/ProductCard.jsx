import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    // Prevent clicking card navigation link when clicking the button
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    setIsAdded(true);
    
    // Reset added status animation after 1.5s
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Product Card Image Container */}
      <Link to={`/product/${product.id}`} className="card-image-link" id={`product-img-link-${product.id}`}>
        <div className="card-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            className="card-image"
            loading="lazy"
          />
          <span className="category-tag">{product.category}</span>
        </div>
      </Link>

      {/* Product Meta details */}
      <div className="card-content">
        <div className="card-rating-row">
          <div className="star-rating">
            <Star className="star-icon-filled" />
            <span className="rating-text">{product.rating.toFixed(1)}</span>
          </div>
          <span className="reviews-count">({product.reviewsCount} reviews)</span>
        </div>

        <Link to={`/product/${product.id}`} className="card-title-link">
          <h3 className="card-title" id={`product-title-${product.id}`}>{product.name}</h3>
        </Link>

        {/* Card footer details: Price & Dynamic Action Button */}
        <div className="card-pricing-row">
          <span className="card-price" id={`product-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            type="button"
            className={`btn-icon-add ${isAdded ? 'success-added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            id={`add-btn-${product.id}`}
          >
            {isAdded ? (
              <>
                <Check className="button-icon" />
              </>
            ) : (
              <>
                <ShoppingCart className="button-icon" />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
