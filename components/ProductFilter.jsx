"use client";
import React, { useState } from "react";
import { categories, sortOptions } from "@/utils/products";

const ProductFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedSort, 
  onSortChange,
  priceRange,
  onPriceChange 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <>
      {/* Bouton mobile pour ouvrir/fermer les filtres */}
      <button
        onClick={() => setShowMobileFilters(!showMobileFilters)}
        className="lg:hidden mb-4 w-full bg-green-primary-600 text-white py-2 px-4 rounded-lg font-medium"
      >
        {showMobileFilters ? "Masquer les filtres" : "Afficher les filtres"}
      </button>

      {/* Filtres */}
      <div
        className={`${
          showMobileFilters ? "block" : "hidden"
        } lg:block bg-gray-50 rounded-lg p-6 space-y-6`}
      >
        {/* Catégories */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Catégories</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat.id}
                  checked={selectedCategory === cat.id}
                  onChange={() => onCategoryChange(cat.id)}
                  className="w-4 h-4 text-green-primary-600 cursor-pointer"
                />
                <span className="ml-3 text-gray-700 group-hover:text-green-primary-600 transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Tri */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Trier par</h3>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-primary-600 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Gamme de prix */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gamme de prix</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">
                Prix max: ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange}
                onChange={(e) => onPriceChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-primary-600"
              />
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-gray-600">$0</span>
              <span className="text-gray-600 ml-auto">$500</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
