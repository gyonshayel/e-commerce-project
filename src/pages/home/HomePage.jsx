import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
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
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.log(error.message);
      }
    };

    getHomeData(skip);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [skip]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = skip / limit + 1;

  const goToPage = (pageNumber) => {
    setSkip((pageNumber - 1) * limit);
  };

  const generatePagination = () => {
    const pages = [];

    if (totalPages > 1) pages.push(1); // Always show first page

    if (currentPage > 3) pages.push("...");

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    if (totalPages > 1) pages.push(totalPages); // Always show last page

    return pages;
  };

  return (
    <>
      <title>E-Commerce Store</title>

      <Header />

      <div className="mt-[60px]">
        <ProductsGrid products={products} />
      </div>

      <div>
        {/* Previous button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {/* Page buttons */}
        {generatePagination().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`}>...</span>
          ) : (
            <button key={`page-${page}`} onClick={() => goToPage(page)}>
              {page}
            </button>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
