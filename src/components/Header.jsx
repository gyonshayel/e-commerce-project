import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header className="bg-[rgb(19,25,33)] text-white fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between h-[60px] px-4 md:px-6">
          <div className="shrink-0">
            <Link
              to="/"
              className="p-1.5 rounded-sm cursor-pointer border border-transparent hover:border-white transition"
            >
              <img
                src="/images/logo-white.png"
                alt="Amazon Logo"
                className="w-[100px] hidden sm:block"
              />
              <img
                src="/images/mobile-logo-white.png"
                alt="Amazon Mobile Logo"
                className="w-[30px] min-w-[30px] block sm:hidden"
              />
            </Link>
          </div>

          <div className="flex items-center flex-[1_1_auto] min-w-0 mx-3">
            <input
              id="search-bar"
              className="flex-1 min-w-0 bg-white text-black text-[15px] h-[38px] pl-3 rounded-l-sm focus:outline-none"
              type="text"
              placeholder="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-[rgb(254,189,105)] w-[45px] h-[38px] rounded-r-sm flex items-center justify-center"
            >
              <img
                src="/images/icons/search-icon.png"
                alt="Search"
                className="h-5 min-w-5"
              />
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            <Link
              to="/orders"
              className="text-white no-underline hover:text-[rgb(254,189,105)] transition"
            >
              <span className="block text-[12px]">Returns</span>
              <span className="block text-[14px] font-bold">& Orders</span>
            </Link>

            <Link
              to="/checkout"
              className="relative flex items-center text-white no-underline hover:text-[rgb(254,189,105)] transition"
            >
              <img
                src="/images/icons/cart-icon.png"
                alt="Cart"
                className="w-[45px]"
              />
              <span className="absolute -top-1 left-4.5 bg-[rgb(254,189,105)] text-black font-bold text-[12px] rounded-full px-1.5">
                {totalQuantity}
              </span>
              <span className="ml-1 text-[15px] font-bold">Cart</span>
            </Link>
          </div>

          {/* Mobile nav button */}
          <div className="sm:hidden shrink-0">
            <button
              className="p-2 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src="/images/icons/hamburger-menu.png"
                alt="Menu"
                className="w-5 h-5"
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`sm:hidden bg-[rgb(19,25,33)] flex flex-col items-start px-5 py-3 space-y-3 text-white overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <Link
            to="/orders"
            className="w-full text-left text-[15px] transition"
            onClick={() => setMenuOpen(false)}
          >
            Returns & Orders
          </Link>

          <Link
            to="/checkout"
            className="w-full text-left text-[15px]  transition"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({totalQuantity})
          </Link>
        </div>
      </header>
    </>
  );
}
