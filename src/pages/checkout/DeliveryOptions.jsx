import { useCart } from "../../context/CartContext";
import { formatMoney } from "../../utils/money";
import { addDays, formatDate } from "../../utils/addDays";

export function DeliveryOptions({ cartItem, deliveryOptions }) {
  const { updateDeliveryOption } = useCart();
  const today = new Date();

  return (
    <div className="max-[1000px]:col-span-2">
      <div className="font-bold mb-2.5">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "FREE Shipping";

        if (deliveryOption.price > 0) {
          priceString = `${formatMoney(deliveryOption.price)} - Shipping`;
        }

        return (
          <div
            key={deliveryOption.id}
            className="grid grid-cols-[24px_1fr] gap-4 mb-3 cursor-pointer"
            onClick={() => updateDeliveryOption(cartItem.id, deliveryOption.id)}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="ml-0 cursor-pointer"
              name={`delivery-option-${cartItem.id}`}
            />
            <div>
              <div className="text-[rgb(0,118,0)] font-medium mb-[3px]">
                {formatDate(addDays(today, deliveryOption.deliveryDays))}
              </div>
              <div className="text-[15px] text-[rgb(120,120,120)]">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
