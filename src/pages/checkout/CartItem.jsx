import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { DeliveryOptions } from "./DeliveryOptions";
import { addDays, formatDate } from "../../utils/addDays";

export function CartItem({ cartItem, deliveryOptions }) {
  const { removeFromCart, updateQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const today = new Date();

  const selectedDeliveryOption = deliveryOptions.find(
    (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId
  );

  const handleSave = () => {
    if (quantity < 1) {
      alert("Quantity must be a valid value");
      return;
    }
    updateQuantity(cartItem.id, quantity);
    setIsUpdating(false);
  };

  return (
    <div key={cartItem.id} className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {formatDate(addDays(today, selectedDeliveryOption.deliveryDays))}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.thumbnail} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.title}</div>
          <div className="product-price">${cartItem.product.price}</div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              {isUpdating ? (
                <span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(parseInt(event.target.value))
                    }
                  />
                  <span
                    className="update-quantity-link link-primary"
                    onClick={handleSave}
                  >
                    Save
                  </span>
                </span>
              ) : (
                <span>
                  <span className="quantity-label">{cartItem.quantity}</span>
                  <span
                    className="update-quantity-link link-primary"
                    onClick={() => setIsUpdating(true)}
                  >
                    Update
                  </span>
                </span>
              )}
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={() => removeFromCart(cartItem.id)}
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
}
