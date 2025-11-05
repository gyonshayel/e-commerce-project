import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

export function CheckoutPage({ deliveryOptions }) {
  const [paymentSummary, setPaymentSummary] = useState({});
  const { cart } = useCart();

  useEffect(() => {
    let productCostCents = 0;
    let totalItems = 0;
    let shippingCostCents = 0;

    cart.forEach((cartItem) => {
      totalItems += cartItem.quantity;
      productCostCents += Math.round(
        cartItem.quantity * cartItem.product.price * 100
      );

      const deliveryOption = deliveryOptions.find(
        (option) => option.id === cartItem.deliveryOptionId
      );

      shippingCostCents += deliveryOption ? deliveryOption.price : 0;
    });

    const taxCents = Math.round(productCostCents * 0.1);
    const totalCostCents = productCostCents + shippingCostCents + taxCents;

    setPaymentSummary({
      productCostCents,
      shippingCostCents,
      taxCents,
      totalCostCents,
      totalItems,
    });
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <div className="fixed top-0 left-0 right-0 z-50 h-[60px] px-[30px] bg-white flex justify-center">
        <div className="w-full max-w-[1100px] flex items-center">
          <div className="w-[150px] max-[575px]:w-auto">
            <Link to="/">
              <img
                className="w-[100px] mt-3 max-[575px]:hidden"
                src="images/logo.png"
                alt="Logo"
              />
              <img
                className="hidden max-[575px]:inline-block h-[35px] mt-[5px]"
                src="images/mobile-logo.png"
                alt="Mobile Logo"
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-center text-center text-[22px] font-medium max-[1000px]:text-[20px] max-[1000px]:mr-[60px] max-[575px]:mr-[5px]">
            Checkout (
            <Link
              className="text-[rgb(0,113,133)] no-underline cursor-pointer max-[1000px]:text-[18px]"
              to="/"
              aria-label={`${paymentSummary.totalItems} items in cart`}
            >
              {`${paymentSummary.totalItems} items`}
            </Link>
            )
          </div>

          <div className="text-right w-[150px] max-[1000px]:w-auto">
            <img
              className="w-4"
              src="images/icons/checkout-lock-icon.png"
              alt="Secure Icon"
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] px-[30px] mt-[140px] mb-[100px] mx-auto">
        <h1 className="font-bold text-[22px] mb-[18px]">Review your order</h1>

        <div className="grid grid-cols-[1fr_350px] gap-x-3 items-start max-[1000px]:grid-cols-1">
          <OrderSummary deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
