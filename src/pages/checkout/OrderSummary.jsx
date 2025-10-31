import { useCart } from "../../context/CartContext";
import { DeliveryOptions } from "./DeliveryOptions";
import { addDays } from "../../utils/addDays";

export function OrderSummary({ deliveryOptions }) {
  const { cart, removeFromCart } = useCart();
  const today = new Date();

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );

          const deleteCartItem = () => {
            removeFromCart(cartItem.productId);
          };

          return (
            <div key={cartItem.id} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {addDays(today, selectedDeliveryOption.deliveryDays)}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartItem.product.thumbnail}
                />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.title}</div>
                  <div className="product-price">{cartItem.product.price}</div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
