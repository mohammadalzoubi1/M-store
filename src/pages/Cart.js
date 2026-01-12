import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./cart.css";
export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <h2 className="empty">Your cart is empty</h2>;
  }

  return (
    <div className="cart container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-wrapper">

        {/* ITEMS */}
        <div className="cart-items">
          {cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                {/* Quantity Controls */}
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p className="item-total">
                  Item Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
