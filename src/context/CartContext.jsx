import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const arr = localStorage.getItem("cart");
    return arr ? JSON.parse(arr) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === product.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + product.quantity }
            : cartItem
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const updateDeliveryOption = (cartItemId, deliveryOptionId) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === cartItemId
          ? { ...cartItem, deliveryOptionId }
          : cartItem
      )
    );
  };

  const updateQuantity = (cartItemId, quantity) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem.id === cartItemId ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateDeliveryOption,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
