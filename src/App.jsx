import { Routes, Route } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { ProductDetailsPage } from "./pages/details/ProductDetailsPage";
import { SearchResultsPage } from "./pages/search/SearchResultsPage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";

const deliveryOptions = [
  { id: 1, price: 0, deliveryDays: 7 },
  { id: 2, price: 499, deliveryDays: 3 },
  { id: 3, price: 999, deliveryDays: 1 },
];

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/product/:id/details" element={<ProductDetailsPage />} />
        <Route
          path="checkout"
          element={<CheckoutPage deliveryOptions={deliveryOptions} />}
        />
        <Route
          path="orders"
          element={<OrdersPage deliveryOptions={deliveryOptions} />}
        />
        <Route
          path="tracking"
          element={<TrackingPage deliveryOptions={deliveryOptions} />}
        />
      </Routes>
    </>
  );
}

export default App;
