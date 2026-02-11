import Image from "next/image";
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Rupture de stock</span>
          </div>
        )}
        {product.stock <= 3 && !isOutOfStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            Limité ({product.stock})
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        <h3 className="font-bold text-gray-800 text-lg line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Prix */}
        <div className="mt-auto">
          <p className="text-2xl font-bold text-green-primary-600 mb-4">
            ${product.price}
          </p>

          {/* Bouton */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-200 ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-primary-600 text-white hover:bg-green-primary-700 active:scale-95"
            }`}
          >
            {isOutOfStock ? "Indisponible" : "Ajouter au panier"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
