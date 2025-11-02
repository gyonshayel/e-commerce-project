import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export function OrderSummary({ deliveryOptions }) {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <p>Your Cart is empty.</p>
        <Link to="/" className="link-primary">
          View Products
        </Link>
      </div>
    );
  }

  return (
    <div className="main max-[1000px]:max-w-[500px]">
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
