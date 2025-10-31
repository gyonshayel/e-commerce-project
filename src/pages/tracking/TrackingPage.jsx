import { addDays } from "../../utils/addDays";
import { useSearchParams } from "react-router";
import "./TrackingPage.css";

export function TrackingPage({ deliveryOptions }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  const orders = JSON.parse(localStorage.getItem("orders"));
  const trackingOrder = orders.find(
    (order) => String(order.orderId) === orderId
  );
  const trackingProduct = trackingOrder?.products?.find(
    (product) => String(product.id) === productId
  );

  console.log(trackingProduct);

  return (
    <>
      <title>Tracking</title>

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on
            {addDays(
              new Date(trackingOrder.date),
              deliveryOptions.find(
                (deliveryOption) =>
                  deliveryOption.id === trackingProduct.deliveryOptionId
              ).deliveryDays
            )}
          </div>

          <div className="product-info">{trackingProduct.product.title}</div>

          <div className="product-info">
            Quantity: {trackingProduct.quantity}
          </div>

          <img
            className="product-image"
            src={trackingProduct.product.thumbnail}
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
