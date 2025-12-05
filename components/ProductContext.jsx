// components/ProductContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the context object
const ProductContext = createContext({
  cartCount: 0,
  addToCart: () => {}, 
});

// 2. Custom hook for easy consumption
export const useProductContext = () => {
  return useContext(ProductContext);
};

// 3. Provider component to wrap the app
export const ProductProvider = ({ children }) => {
  // Start with 0 to match the server (avoids hydration errors)
  const [cartCount, setCartCount] = useState(0);

  // EFFECT 1: Load the count from LocalStorage when the app starts
  useEffect(() => {
    // Check if we are in the browser
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('voxen_cart_count');
      if (savedCount) {
        setCartCount(parseInt(savedCount, 10));
      }
    }
  }, []);

  // EFFECT 2: Save the count to LocalStorage whenever it changes
  useEffect(() => {
    if (cartCount > 0) {
      localStorage.setItem('voxen_cart_count', cartCount.toString());
    }
  }, [cartCount]);

  // Function to increment the cart count
  const addToCart = () => {
    setCartCount((prevCount) => {
        const newCount = prevCount + 1;
        // Save immediately to ensure it persists
        localStorage.setItem('voxen_cart_count', newCount.toString());
        return newCount;
    });
  };

  const value = {
    cartCount,
    addToCart,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};