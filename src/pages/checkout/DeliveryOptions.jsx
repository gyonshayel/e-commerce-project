import { formatMoney } from "../../utils/money";
import { addDays } from "../../utils/addDays";

export function DeliveryOptions({ cartItem, deliveryOptions }) {
  const today = new Date();

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.price > 0) {
          priceString = `${formatMoney(deliveryOption.price)} - Shipping`;
        }

        const updateDeliveryOption = () => {
          cartItem.deliveryOptionId = deliveryOption.id;
        };

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={updateDeliveryOption}
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
                {addDays(today, deliveryOption.deliveryDays)}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
