import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const product = products.find(p => p.id === Number(id));

  // ✅ تأكد من وجود المنتج أولاً
  if (!product) {
    return <h2 className="empty">Product not found</h2>;
  }

  // ✅ بعد التأكد
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-details container">
      <div className="details-wrapper">

        {/* IMAGE */}
        <div className="details-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="details-price">${product.price}</p>
          <p className="details-desc">{product.description}</p>

          {quantity > 0 ? (
            <div className="quantity-control">
              <button onClick={() => decreaseQty(product.id)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => increaseQty(product.id)}>+</button>
            </div>
          ) : (
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
