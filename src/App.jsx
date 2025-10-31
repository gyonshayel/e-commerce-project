import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
// import { TrackingPage } from "./pages/tracking/TrackingPage";
import "./App.css";

const deliveryOptions = [
  { id: 1, price: 0, deliveryDays: 7 },
  { id: 2, price: 499, deliveryDays: 3 },
  { id: 3, price: 999, deliveryDays: 1 },
];

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path="checkout"
        element={<CheckoutPage deliveryOptions={deliveryOptions} />}
      />
      <Route
        path="orders"
        element={<OrdersPage deliveryOptions={deliveryOptions} />}
      />
      {/* <Route path="tracking" element={<TrackingPage />} /> */}
    </Routes>
  );
}

export default App;
