import React, { createContext, useContext, useState, useEffect } from 'react';

// Create internal React Context for the Shopping Cart
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize the cart from localStorage (if exists) or fall back to an empty array
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('thiranex_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart data from localStorage", error);
      return [];
    }
  });

  // Sync cart state with localStorage whenever the cart changes
  useEffect(() => {
    try {
      localStorage.setItem('thiranex_cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to persist cart data to localStorage", error);
    }
  }, [cart]);

  // Method to add a product to the cart (with variable quantity)
  const addToCart = (product, qtyToAdd = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        // Product already in cart, increment quantity
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + qtyToAdd,
        };
        return updatedCart;
      } else {
        // Add new product with initial quantity
        return [...prevCart, { ...product, quantity: qtyToAdd }];
      }
    });
  };

  // Method to completely remove a product from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Method to change quantity specifically (useful for direct inputs)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Increment item quantity helper
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement item quantity helper (removes if quantity drops below 1)
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === productId);
      if (item && item.quantity === 1) {
        return prevCart.filter((i) => i.id !== productId);
      }
      return prevCart.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // Clear shopping cart method
  const clearCart = () => {
    setCart([]);
  };

  // Calculate high-level cart summaries on the fly
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartItemsCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook to easily consume cart values across any consumer components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider element');
  }
  return context;
}
