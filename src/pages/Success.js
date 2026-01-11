import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-container">
      <h1>✅ Order Placed Successfully</h1>
      <p>Thank you for shopping with <strong>M Store</strong></p>

      <Link to="/" className="success-btn">
        Back to Home
      </Link>
    </div>
  );
}
