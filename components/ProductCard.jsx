"use client";

import React from 'react';
import { Tag, ArrowRight, Star } from 'lucide-react'; 

const ProductCard = ({ product }) => (
  <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
    
    {/* 1. Image Section with Border Radius & Gray Background */}
    <div className="p-4">
      <div className="relative h-56 w-full bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center group-hover:bg-gray-100 transition-colors duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null; 
            e.currentTarget.src = "https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image"; 
          }}
        />
        
        {/* Top Rated Tag */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-800 shadow-sm border border-gray-100 flex items-center gap-1">
           <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Rated
        </div>
      </div>
    </div>

    {/* 2. Content Section */}
    <div className="px-5 pb-5 flex flex-col flex-grow">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
        {product.name}
      </h3>
      
      {/* Description (Truncated neatly) */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
        {product.description}
      </p>
      
      {/* Price & Button Row */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
        <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Price</span>
            <span className="text-xl font-extrabold text-indigo-600">${product.price.toFixed(2)}</span>
        </div>

        <a href={`/products/${product.id}`}>
          <button className="bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-all duration-300 flex items-center gap-2 shadow-md group/btn">
             Details
             <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default ProductCard;