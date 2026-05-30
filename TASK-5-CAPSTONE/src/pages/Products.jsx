import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Grid, Grid3X3, Filter, RotateCcw } from 'lucide-react';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  // Extract unique categories from product list
  const categories = useMemo(() => {
    const list = new Set(products.map(item => item.category));
    return ['All', ...list];
  }, []);

  // Filter and sort products dynamically based on user choices
  const filteredSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Apply Search Query
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // 2. Apply Category Filtering
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Apply sorting options
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchTerm, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOption('default');
  };

  return (
    <div className="products-page" id="catalog-view">
      {/* 1. Header Section */}
      <section className="catalog-header container">
        <h1 className="page-title">Curated Shop Shelf</h1>
        <p className="page-subtitle">
          Discover handpicked lifestyle items. Refine by category, find exactly 
          what you need with instantaneous searching, and sort flawlessly.
        </p>
      </section>

      {/* 2. Control center (Search, Filters & Sorters) */}
      <section className="catalog-controls-section container">
        <div className="controls-layout" id="controls-panel">
          {/* Search Bar Input */}
          <div className="search-input-wrapper">
            <Search className="search-box-icon" />
            <input 
              type="text"
              placeholder="Search product name, details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-field"
              id="search-input"
              aria-label="Search items"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="clear-search-btn"
                id="search-clear-btn"
                title="Clear input"
              >
                &times;
              </button>
            )}
          </div>

          {/* Sorter Selector */}
          <div className="sort-select-wrapper">
            <SlidersHorizontal className="sort-icon-decor" />
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-dropdown"
              id="sort-select"
              aria-label="Sort options"
            >
              <option value="default">Relevance & Standard</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Row */}
        <div className="categories-tab-row" id="categories-tabs">
          <div className="filter-label-wrapper">
            <Filter className="filter-small-icon" />
            <span className="filter-label">Categories:</span>
          </div>
          <div className="categories-scroll-list">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`category-tab-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                id={`cat-btn-${category.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Catalog Shelves Display (Product Grid / No Results) */}
      <main className="catalog-grid-section container">
        {filteredSortedProducts.length > 0 ? (
          <div>
            <div className="catalog-results-summary">
              Showing <strong>{filteredSortedProducts.length}</strong> {filteredSortedProducts.length === 1 ? 'product' : 'products'} matching selection
            </div>
            <div className="product-grid" id="main-product-grid">
              {filteredSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-results-fallback" id="empty-results-card">
            <div className="fallback-illustration">
              <RotateCcw className="fallback-icon" />
            </div>
            <h3 className="fallback-heading">No Products Match Your Criterias</h3>
            <p className="fallback-text">
              We couldn't locate any products matching "{searchTerm}" inside category "{selectedCategory}". 
              Deepen search query, change filters, or reset entirely to view standard listings.
            </p>
            <button 
              type="button" 
              onClick={handleResetFilters} 
              className="btn btn-primary"
              id="reset-catalog-btn"
            >
              Reset Filters & Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
