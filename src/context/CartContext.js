// src/context/CartContext.js
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // ➕ إضافة منتج للسلة
  const addToCart = (product) => {
    const exist = cartItems.find(item => item.id === product.id);

    if (exist) {
      // إذا المنتج موجود، نزيد فقط الكمية
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // إذا المنتج جديد، نضيفه مع quantity = 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ❌ حذف منتج كامل
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // ➕ زيادة الكمية
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ➖ نقصان الكمية (لا تسمح بالسالب)
  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // تمنع الصفر أو السالب
    );
  };

  // 🧹 تفريغ السلة بالكامل
  const clearCart = () => setCartItems([]);

  // 💰 حساب المجموع بدقة مع useMemo لتقليل إعادة الحساب
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // 📝 حفظ الطلب مع تفاصيل العميل
  const placeOrder = (order) => {
    // order = { items, total, customer, date }
    setOrders([...orders, order]);
    clearCart();
  };

  // ✅ القيم المتاحة لجميع الصفحات
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

// ✅ Hook لاستخدام السلة في أي صفحة
export const useCart = () => useContext(CartContext);

export default CartContext;

