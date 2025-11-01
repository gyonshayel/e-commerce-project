import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export function OrderSummary({ deliveryOptions }) {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <p>Your Cart is empty</p>
        <Link to="/">
          <button>View Products</button>
        </Link>
      </>
    );
  }

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => (
          <CartItem
            key={cartItem.id}
            cartItem={cartItem}
            deliveryOptions={deliveryOptions}
          />
        ))}
    </div>
  );
}
