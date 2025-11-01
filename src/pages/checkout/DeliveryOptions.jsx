import { useCart } from "../../context/CartContext";
import { formatMoney } from "../../utils/money";
import { addDays, formatDate } from "../../utils/addDays";

export function DeliveryOptions({ cartItem, deliveryOptions }) {
  const { updateDeliveryOption } = useCart();
  const today = new Date();

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.price > 0) {
          priceString = `${formatMoney(deliveryOption.price)} - Shipping`;
        }

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={() => updateDeliveryOption(cartItem.id, deliveryOption.id)}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.id}`}
            />
            <div>
              <div className="delivery-option-date">
                {formatDate(addDays(today, deliveryOption.deliveryDays))}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
