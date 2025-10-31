import { Fragment } from "react";
import { Header } from "../../components/Header";
import { formatMoney } from "../../utils/money";
import { addDays } from "../../utils/addDays";
import "./OrdersPage.css";

export function OrdersPage({ deliveryOptions }) {
  const orders = JSON.parse(localStorage.getItem("orders"));

  return (
    <>
      <title>Orders</title>
      <Header />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.orderId} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>
                        {new Date(order.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.orderId}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.thumbnail} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.title}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {addDays(
                              order.date,
                              deliveryOptions.find(
                                (deliveryOption) =>
                                  deliveryOption.id ===
                                  orderProduct.deliveryOptionId
                              ).deliveryDays
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Order Again
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
