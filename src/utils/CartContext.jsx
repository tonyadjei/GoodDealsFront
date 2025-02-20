import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productID, quantity, name, imageUrl) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((product) => product.id === productID);
      if (existingItem) {
        return prevCart.map((product) => {
          return product.id === productID
            ? { ...product, quantity: quantity }
            : product;
        });
      } else {
        return [
          ...prevCart,
          { id: productID, quantity: quantity, name: name, imageUrl: imageUrl },
        ];
      }
    });
  };

  const removeFromCart = (productID) => {
    setCart((prevCart) => {
      return prevCart.filter((product) => {
        return !(product.id === productID);
      });
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any,
};

export const useCart = () => useContext(CartContext);
