import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartItems } = useCart();

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
            Cart ({cartItems.length})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

