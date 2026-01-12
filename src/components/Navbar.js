import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();

  // ✅ عدد القطع الفعلي في السلة
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      {/* 🔹 Logo */}
      <h2 className="logo">
        <Link to="/">M Store</Link>
      </h2>

      {/* 🔹 Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">
            🛒 Cart ({totalItems})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

