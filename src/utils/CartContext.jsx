import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [subTotal, setSubTotal] = useState(0);

  const calculateSubTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    setSubTotal(total);
  };

  const emptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateSubTotal();
  }, [cart]);

  const addToCart = (productID, quantity, price, name, imageUrl) => {
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
          { id: productID, quantity, price, name, imageUrl },
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
    <CartContext.Provider
      value={{
        cart,
        subTotal,
        calculateSubTotal,
        addToCart,
        removeFromCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export const useCart = () => useContext(CartContext);
