import React from 'react';
import type { CartItem } from '../App';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, delta: number) => void;
}

function CartSidebar(props: CartSidebarProps) {
    const { isOpen, onClose, cartItems, onUpdateQuantity } = props;

    // Calculate total price of all items in the cart
    let subtotal = 0;
    cartItems.forEach((item) => {
        subtotal += item.product.price * item.quantity;
    });

    // If the cart is not open, we can still render it but it will be hidden off-screen by Tailwind classes.
    return (
        <>
            {/* Dark background overlay when cart is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 transition-opacity bg-black bg-opacity-50"
                    onClick={onClose}
                />
            )}

            {/* The actual sidebar panel */}
            <div
                className={`fixed top-0 right-0 z-50 flex flex-col w-full h-full max-w-md transition-transform duration-300 ease-in-out transform bg-white shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-800"
                    >
                        {/* Close Icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Main Content Area (Scrollable) */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {cartItems.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="mt-1 text-sm">Add some products to get started!</p>
                        </div>
                    ) : (
                        // List of items in cart
                        <div className="space-y-6">
                            {cartItems.map((item) => {
                                const itemTotalPrice = item.product.price * item.quantity;

                                return (
                                    <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="w-20 h-20 overflow-hidden bg-white rounded-lg shrink-0 border border-gray-100">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="block object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-800 truncate">{item.product.title}</h3>
                                            <p className="mt-1 font-medium text-blue-600">₹{item.product.price.toFixed(2)}</p>

                                            <div className="flex items-center gap-3 mt-3">
                                                {/* Decrease Quantity Button */}
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                                                    className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-red-500"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                </button>

                                                {/* Current Quantity */}
                                                <span className="w-6 font-medium text-center text-gray-800">
                                                    {item.quantity}
                                                </span>

                                                {/* Increase Quantity Button */}
                                                <button
                                                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                                                    className="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-600"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price for this Item */}
                                        <div className="text-right shrink-0">
                                            <p className="font-bold text-gray-900">
                                                ₹{itemTotalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Sidebar Footer area for checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-white border-t sm:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-medium text-gray-600">Subtotal</span>
                            <span className="text-2xl font-bold text-gray-900">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <p className="mb-6 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                        <button
                            onClick={() => alert("Proceeding to payments... Integration coming soon!")}
                            className="w-full px-6 py-4 text-lg font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Proceed to payments
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartSidebar;
