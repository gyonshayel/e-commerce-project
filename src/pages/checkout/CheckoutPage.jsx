import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ deliveryOptions }) {
  const [paymentSummary, setPaymentSummary] = useState({});
  const { cart } = useCart();

  useEffect(() => {
    const getPaymentSummary = () => {
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

        shippingCostCents += deliveryOption.price;
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
    };

    getPaymentSummary();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              {`${paymentSummary.totalItems} items`}
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
