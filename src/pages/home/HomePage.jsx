import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 30;

  useEffect(() => {
    const getHomeData = async (skipNumber) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skipNumber}`
        );
        if (!response.ok)
          throw new Error("Failed to get Product details from the server");

        const data = await response.json();
        setHasMore(skip + limit < data.total);
        setProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    getHomeData(skip);
  }, [skip]);

  const handlePaginationUp = () => setSkip((prev) => prev + 30);
  const handlePaginationDown = () => setSkip((prev) => prev - 30);

  return (
    <>
      <title>E-Commerce Store</title>

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>

      <div>
        <button onClick={handlePaginationDown} disabled={skip === 0}>
          Previous Page
        </button>
        <button onClick={handlePaginationUp} disabled={!hasMore}>
          Next Page
        </button>
      </div>
    </>
  );
}
