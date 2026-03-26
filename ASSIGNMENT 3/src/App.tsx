import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { Product } from './data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Calculate total number of items in the cart
  let cartCount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartCount += cartItems[i].quantity;
  }

  // Handle adding a product to the cart
  function handleAddToCart(product: Product) {
    setCartItems((prevItems) => {
      // Check if product is already in the cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Product exists, so we create a new array AND a new item object to cleanly update its quantity
        const updatedItems = [...prevItems];
        const previousItem = updatedItems[existingItemIndex];

        updatedItems[existingItemIndex] = {
          ...previousItem,
          quantity: previousItem.quantity + 1
        };

        return updatedItems;
      } else {
        // Product is new to the cart, add it with quantity 1
        return [...prevItems, { product: product, quantity: 1 }];
      }
    });

    // Make sure to open the sidebar so the user sees their item
    setIsCartOpen(true);
  }

  // Handle increasing or decreasing quantity
  function handleUpdateQuantity(productId: number, delta: number) {
    setCartItems((prevItems) => {
      let updatedItems = prevItems.map((item) => {
        if (item.product.id === productId) {
          // Update the quantity, but don't let it go below 0
          let newQuantity = item.quantity + delta;
          if (newQuantity < 0) {
            newQuantity = 0;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      // Remove items that have a quantity of 0
      updatedItems = updatedItems.filter((item) => item.quantity > 0);

      return updatedItems;
    });
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />

      <Hero />

      {/* Pass the add to cart function down to the Products component */}
      <Products onAddToCart={handleAddToCart} />

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

export default App;
