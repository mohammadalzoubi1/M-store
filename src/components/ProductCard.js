import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="card-body">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>

        <div className="card-actions">
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <Link to={`/product/${product.id}`}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
