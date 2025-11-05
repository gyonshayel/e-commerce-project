import { Fragment } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { formatMoney } from "../../utils/money";
import { addDays, formatDate } from "../../utils/addDays";
import { Header } from "../../components/Header";

export function OrdersPage({ deliveryOptions }) {
  const arr = localStorage.getItem("orders");
  const orders = arr ? JSON.parse(arr) : [];
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleTracking = (orderId, productId) => {
    const params = new URLSearchParams({
      orderId: orderId,
      productId: productId,
    });
    navigate(`/tracking?${params.toString()}`);
  };

  return (
    <>
      <title>Orders</title>
      <Header />

      <div className="max-w-[850px] mt-[90px] mb-[100px] px-5 mx-auto">
        <h1 className="font-bold text-[26px] mb-[25px]">Your Orders</h1>

        <div className="grid grid-cols-1 gap-y-[50px]">
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              You have no orders yet.
            </p>
          ) : (
            orders.map((order) => {
              return (
                <div key={order.orderId} className="order-container">
                  <div className="bg-[#f0f2f2] border border-[#D5D9D9] flex items-center justify-between p-[20px_25px] rounded-t-lg max-[575px]:flex-col max-[575px]:items-start max-[575px]:leading-[23px] max-[575px]:p-[15px]">
                    <div className="flex shrink-0 max-[575px]:flex-col">
                      <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                        <div className="font-medium mr-[45px] max-[575px]:mr-[5px]">
                          <strong>Order Placed:</strong>
                        </div>
                        <div>
                          {new Date(order.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                      <div className="mr-[45px] max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                        <div className="order-header-label">
                          {" "}
                          <strong>Total:</strong>
                        </div>
                        <div>{formatMoney(order.totalCostCents)}</div>
                      </div>
                    </div>

                    <div className="shrink max-[575px]:grid max-[575px]:grid-cols-[auto_1fr]">
                      <div className="text-[15px]">
                        {" "}
                        <strong>Order ID:</strong>
                      </div>
                      <div>{order.orderId}</div>
                    </div>
                  </div>

                  <div className="border border-[#D5D9D9] border-t-0 rounded-b-lg p-[40px_25px] grid grid-cols-[110px_1fr_220px] gap-x-[35px] gap-y-[60px] items-center max-[800px]:grid-cols-[110px_1fr] max-[800px]:gap-y-0 max-[800px]:pb-2 max-[450px]:grid-cols-1">
                    {order.products.map((orderProduct) => {
                      return (
                        <Fragment key={orderProduct.id}>
                          <div className="text-center max-[450px]:mb-[25px]">
                            <img
                              className="max-w-[110px] max-h-[110px] max-[450px]:max-w-[150px] max-[450px]:max-h-[150px] mx-auto"
                              src={orderProduct.product.thumbnail}
                              alt={orderProduct.product.title}
                            />
                          </div>

                          <div>
                            <div className="font-bold mb-[5px] max-[450px]:mb-2.5">
                              {orderProduct.product.title}
                            </div>
                            <div className="mb-[3px] max-[450px]:mb-[3px]">
                              Arriving on:{" "}
                              {formatDate(
                                addDays(
                                  order.date,
                                  deliveryOptions.find(
                                    (deliveryOption) =>
                                      deliveryOption.id ===
                                      orderProduct.deliveryOptionId
                                  ).deliveryDays
                                )
                              )}
                            </div>
                            <div className="mb-2 max-[450px]:mb-[15px]">
                              Quantity: {orderProduct.quantity}
                            </div>
                            <button
                              className="flex items-center justify-center text-[15px] w-[140px] h-9 rounded-lg max-[800px]:mb-2.5 max-[450px]:w-full max-[450px]:mb-[15px] button-primary"
                              onClick={() =>
                                addToCart({
                                  id: orderProduct.id,
                                  quantity: orderProduct.quantity,
                                  product: orderProduct.product,
                                  deliveryOptionId: 1,
                                })
                              }
                            >
                              <img
                                className="w-[25px] mr-[15px]"
                                src="images/icons/buy-again.png"
                                alt="buy-again-icon"
                              />
                              <span>Order Again</span>
                            </button>
                          </div>

                          <div className="self-start max-[800px]:col-start-2 max-[800px]:mb-[30px] max-[450px]:col-auto max-[450px]:mb-[70px]">
                            <button
                              onClick={() =>
                                handleTracking(order.orderId, orderProduct.id)
                              }
                              className="w-full text-[15px] p-2 max-[450px]:p-3 max-[800px]:w-[140px] max-[450px]:w-full max-[450px]:mb-[15px] button-secondary"
                            >
                              Track package
                            </button>
                          </div>
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
