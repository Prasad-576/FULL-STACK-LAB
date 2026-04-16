import React from 'react';

import type { Product } from '../data/products';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="flex flex-col overflow-hidden text-left bg-white rounded-lg shadow-md transition-shadow hover:shadow-xl">
            <img className="object-cover w-full h-56" src={product.image} alt={product.title} />

            <div className="flex flex-col flex-grow p-5">
                <h3 className="mb-2 text-lg font-bold text-slate-800">{product.title}</h3>
                <p className="mt-auto mb-4 text-xl font-bold text-blue-600">₹{product.price}</p>

                <button
                    className="w-full px-4 py-2 font-bold text-white transition-colors bg-slate-800 rounded-md hover:bg-blue-600"
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
