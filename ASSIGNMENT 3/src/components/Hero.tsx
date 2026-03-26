import React from 'react';

function Hero() {
    return (
        <header className="flex flex-col items-center justify-around px-4 py-12 bg-slate-200 md:px-12 md:py-20 md:flex-row">
            <div className="max-w-lg text-center md:text-left">
                <h2 className="mb-4 text-4xl font-bold text-slate-800 md:text-5xl">Welcome to ShopFusion</h2>
                <p className="mb-6 text-lg text-slate-600 md:text-xl">
                    Find the best tech gadgets here. Quality products at affordable prices!
                </p>
                <button className="px-6 py-3 font-bold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                    Shop Now
                </button>
            </div>

            <img
                className="w-full max-w-md mt-10 rounded-lg shadow-xl md:mt-0"
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1000"
                alt="Tech Gadgets"
            />
        </header>
    );
}

export default Hero;
