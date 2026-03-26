import React from 'react';

interface NavbarProps {
    cartCount: number;
    onCartClick: () => void;
}

function Navbar({ cartCount, onCartClick }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-50 flex flex-col items-center justify-between px-6 py-4 bg-slate-800 shadow-md md:flex-row">
            <h1 className="mb-4 text-2xl font-bold text-blue-600 md:mb-0">ShopFusion</h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <a href="#" className="font-bold text-white hover:text-blue-600">Shop</a>
                <a href="#" className="font-bold text-white hover:text-blue-600">Categories</a>
                <a href="#" className="font-bold text-white hover:text-blue-600">About</a>

                <button
                    onClick={onCartClick}
                    className="px-4 py-2 font-bold text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                    🛒 Cart: {cartCount}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
