import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useCart } from "../context/CartContext";

export function Header() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalQuantity = cart.reduce(
    (sum, cartItem) => sum + cartItem.quantity,
    0
  );

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#131921]">
        <div className="flex justify-between items-center h-[60px] px-4 md:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 p-2 rounded-sm border border-transparent hover:border-white transition cursor-pointer"
          >
            <img
              src="/images/logo-white.png"
              alt="Amazon Logo"
              className="w-[100px] hidden sm:block"
            />
            <img
              src="/images/mobile-logo-white.png"
              alt="Amazon Mobile Logo"
              className="w-[30px] min-w-[30px] sm:hidden"
            />
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="hidden min-[415px]:flex flex-[1_1_auto] items-center max-w-[900px] px-6 mx-auto"
          >
            <input
              id="search-bar"
              className="flex-1 min-w-0 bg-white text-black text-sm h-[38px] pl-3 rounded-l-sm"
              type="text"
              placeholder="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-[#febd69] w-[45px] h-[38px] rounded-r-sm "
            >
              <img
                src="/images/icons/search-icon.png"
                alt="Search"
                className="h-5 min-w-5"
              />
            </button>
          </form>

          {/* Links */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            <Link
              to="/orders"
              className="text-white no-underline hover:text-[#febd69] transition"
            >
              <span className="block text-[12px]">Returns</span>
              <span className="block text-[14px] font-bold">& Orders</span>
            </Link>

            <Link
              to="/checkout"
              className="relative flex items-center text-white no-underline hover:text-[#febd69] transition"
            >
              <img
                src="/images/icons/cart-icon.png"
                alt="Cart"
                className="w-[45px]"
              />
              <span className="absolute -top-1 left-4.5 bg-[#febd69] text-black font-bold text-[12px] rounded-full px-1.5">
                {totalQuantity}
              </span>
              <span className="ml-1 text-[15px] font-bold">Cart</span>
            </Link>
          </div>

          {/* Mobile nav button */}
          <div className="sm:hidden shrink-0">
            <button
              aria-label="Toggle menu"
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
          className={`flex flex-col items-start px-4 pt-0 pb-3 space-y-3 bg-[#131921] text-white text-sm overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-[200px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } sm:hidden`}
        >
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-0 w-full min-[415px]:hidden"
          >
            <input
              id="search-bar"
              className="flex-1 min-w-0 h-[38px] pl-2 rounded-l-sm bg-white text-black text-[15px]"
              type="text"
              placeholder="Search for products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center justify-center w-[45px] h-[38px] bg-[#febd69] rounded-r-sm "
            >
              <img
                src="/images/icons/search-icon.png"
                alt="Search"
                className="h-5 min-w-5"
              />
            </button>
          </form>

          <Link
            to="/orders"
            className="w-full text-left transition"
            onClick={() => setMenuOpen(false)}
          >
            Returns & Orders
          </Link>

          <Link
            to="/checkout"
            className="w-full text-left transition"
            onClick={() => setMenuOpen(false)}
          >
            Cart ({totalQuantity})
          </Link>
        </div>
      </header>
    </>
  );
}
