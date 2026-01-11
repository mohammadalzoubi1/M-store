import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, totalPrice, placeOrder } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!customer.fullName || !customer.phone || !customer.address) {
      alert("Please fill in all customer information!");
      return;
    }

    const order = {
      items: cartItems,
      total: totalPrice,
      customer: customer,
      date: new Date().toLocaleString(),
    };

    placeOrder(order); // يحفظ الطلب ويخلّص السلة
    alert("✅ Order placed successfully!");
    navigate("/success"); // تحويل لصفحة النجاح
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* معلومات العميل */}
      <div className="checkout-box">
        <h3>Customer Information</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={customer.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />
      </div>

      {/* طريقة الدفع */}
      <div className="checkout-box">
        <h3>Payment Method</h3>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Cash"
            checked={customer.paymentMethod === "Cash"}
            onChange={handleChange}
          />
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Card"
            checked={customer.paymentMethod === "Card"}
            onChange={handleChange}
          />
          Credit / Debit Card
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="PayPal"
            checked={customer.paymentMethod === "PayPal"}
            onChange={handleChange}
          />
          PayPal
        </label>
      </div>

      {/* ملخص الطلب */}
      <div className="checkout-box">
        <h3>Order Summary</h3>

        {cartItems.length === 0 && <p>Your cart is empty</p>}

        {cartItems.map((item) => (
          <div key={item.id} className="summary-item">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr />
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
      </div>

      <button
        className="checkout-btn"
        disabled={cartItems.length === 0}
        onClick={handleOrder}
      >
        Place Order
      </button>
    </div>
  );
}
