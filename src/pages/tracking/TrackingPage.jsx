import { Link } from "react-router";
import { addDays, formatDate } from "../../utils/addDays";
import { useSearchParams } from "react-router";
import { getTrackingProgress } from "../../utils/getTrackingProgress";
import { Header } from "../../components/Header";

export function TrackingPage({ deliveryOptions }) {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");

  const orders = JSON.parse(localStorage.getItem("orders") || []);
  const trackingOrder = orders.find(
    (order) => String(order.orderId) === orderId
  );
  const trackingProduct = trackingOrder?.products?.find(
    (product) => String(product.id) === productId
  );

  const deliveryDays = deliveryOptions.find(
    (deliveryOption) => deliveryOption.id === trackingProduct.deliveryOptionId
  ).deliveryDays;

  const { progress, status } = getTrackingProgress(
    trackingOrder.date,
    deliveryDays
  );

  return (
    <>
      <title>Tracking</title>
      <Header />

      <section>
        <div className="max-w-[850px] mt-[90px] mb-[100px] px-[30px] mx-auto">
          <Link
            className="inline-block mb-[30px] text-blue-600 hover:underline link-primary"
            to="/orders"
          >
            View all orders
          </Link>

          <div className="text-[25px] font-bold mb-2.5">
            Arriving on{" "}
            {formatDate(addDays(new Date(trackingOrder.date), deliveryDays))}
          </div>

          <div className="mb-[3px]">{trackingProduct.product.title}</div>

          <div className="mb-[3px]">Quantity: {trackingProduct.quantity}</div>

          <img
            className="max-w-[150px] max-h-[150px] mt-[25px] mb-[50px]"
            src={trackingProduct.product.thumbnail}
            alt={trackingProduct.product.title}
          />

          <div className="flex justify-between font-medium text-[20px] mb-[15px] max-[575px]:text-[16px] max-[450px]:flex-col max-[450px]:mb-[5px]">
            <div
              className={`max-[450px]:mb-[3px] ${
                status === "Preparing" ? "text-[rgb(6,125,98)]" : ""
              }`}
            >
              Preparing
            </div>
            <div
              className={`max-[450px]:mb-[3px] ${
                status === "Shipped" ? "text-[rgb(6,125,98)]" : ""
              }`}
            >
              Shipped
            </div>
            <div
              className={`max-[450px]:mb-[3px] ${
                status === "Delivered" ? "text-[rgb(6,125,98)]" : ""
              }`}
            >
              Delivered
            </div>
          </div>

          <div className="h-[25px] w-full border border-[rgb(200,200,200)] rounded-[50px] overflow-hidden">
            <div
              className="h-full bg-green-600 rounded-[50px]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}
