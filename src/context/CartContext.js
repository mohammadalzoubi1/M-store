// src/context/CartContext.js
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // ➕ إضافة منتج للسلة
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);

      if (exist) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // ❌ حذف منتج كامل
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // ➕ زيادة الكمية
  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ نقصان الكمية
  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // 🧹 تفريغ السلة
  const clearCart = () => setCartItems([]);

  // 💰 السعر الإجمالي
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // 📝 حفظ الطلب
  const placeOrder = (order) => {
    setOrders(prev => [...prev, order]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        orders,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
