import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { ProductsSkeleton } from "../../components/ProductsSkeleton";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 30;

  useEffect(() => {
    const getHomeData = async (skipNumber) => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skipNumber}`
        );
        if (!response.ok)
          throw new Error("Failed to get Product details from the server");

        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
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

      {loading ? (
        <ProductsSkeleton />
      ) : (
        <div className="mt-[60px]">
          <ProductsGrid products={products} loading={loading} />
        </div>
      )}

      <div className="flex items-center justify-center gap-2 my-6 mx-0.5">
        {/* Previous button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>

        {/* Page buttons */}
        {generatePagination().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => goToPage(page)}
              className={`px-2 py-1 text-sm rounded-md border transition ${
                page === currentPage
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </>
  );
}
