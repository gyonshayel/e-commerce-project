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
    <div
      key={cartItem.id}
      className="border border-[#DEDEDE] rounded-sm p-[18px] mb-3"
    >
      <div className="text-[19px] font-bold text-[rgb(0,118,0)] mt-[5px] mb-[22px]">
        Delivery date:{" "}
        {formatDate(addDays(today, selectedDeliveryOption.deliveryDays))}
      </div>

      <div className="grid grid-cols-[100px_1fr_1fr] gap-x-[25px] max-[1000px]:grid-cols-[100px_1fr] max-[1000px]:gap-y-[30px]">
        <img
          className="max-w-full max-h-[120px] mx-auto"
          src={cartItem.product.thumbnail}
          alt={cartItem.product.title}
        />

        <div className="cart-item-details">
          <div className="font-bold mb-2">{cartItem.product.title}</div>
          <div className="text-[rgb(177,39,4)] font-bold mb-[5px]">
            ${cartItem.product.price}
          </div>
          <div className="text-[15px]">
            <span>
              Quantity:{" "}
              {isUpdating ? (
                <span>
                  <input
                    className="outline outline-gray-400"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => {
                      const value = parseInt(event.target.value);
                      setQuantity(isNaN(value) ? 1 : value);
                    }}
                  />
                  <span
                    className="text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] ml-[3px] cursor-pointer link-primary"
                    onClick={handleSave}
                  >
                    Save
                  </span>
                </span>
              ) : (
                <span>
                  <span className="quantity-label">{cartItem.quantity}</span>
                  <span
                    className="text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] ml-[3px] cursor-pointer link-primary"
                    onClick={() => setIsUpdating(true)}
                  >
                    Update
                  </span>
                </span>
              )}
            </span>
            <span
              className="text-[rgb(1,124,182)] hover:text-[rgb(196,80,0)] ml-[3px] cursor-pointer link-primary"
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
