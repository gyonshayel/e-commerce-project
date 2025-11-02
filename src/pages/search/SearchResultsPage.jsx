import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "../home/ProductsGrid";

export function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (!response.ok)
          throw new Error("Failed to get search results from the server");

        const data = await response.json();

        setResults(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    getSearchResults();
  }, [query]);

  return (
    <>
      <Header />
      {results.length === 0 ? (
        <div>
          <p>No search results</p>
        </div>
      ) : (
        <>
          <title>E-Commerce Store</title>
          <div className="mt-[60px]">
            <ProductsGrid products={results} />
          </div>
        </>
      )}
    </>
  );
}
