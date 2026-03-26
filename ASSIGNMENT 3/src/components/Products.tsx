import React from 'react';
import ProductCard from './ProductCard';
import { products, type Product } from '../data/products';

interface ProductsProps {
    onAddToCart: (product: Product) => void;
}

function Products({ onAddToCart }: ProductsProps) {
    return (
        <section className="px-4 py-12 mx-auto text-center max-w-7xl md:py-16">
            <h2 className="mb-8 text-3xl font-bold text-slate-800 md:text-4xl">Our Products</h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </section>
    );
}

export default Products;
