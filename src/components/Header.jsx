import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export function Header() {
  const [query, setQuery] = useState("");
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
      <header
        className="bg-[rgb(19,25,33)] text-white px-[15px]
         flex items-center justify-between
         fixed top-0 left-0 right-0 h-[60px]"
      >
        <div className="shrink-0">
          <Link
            to="/"
            className="inline-block p-1.5 rounded-xs cursor-pointer no-underline border border-transparent hover:border-white"
          >
            <img
              className="w-[100px] mt-[5px] max-[575px]:hidden"
              src="/images/logo-white.png"
              alt="Amazon Logo"
            />
            <img
              className="hidden max-[575px]:block h-[35px] mt-[5px]"
              src="/images/mobile-logo-white.png"
              alt="Amazon Logo"
            />
          </Link>
        </div>

        <input
          id="search-bar"
          className="flex-1 shrink bg-white text-black  text-[16px] h-[38px] pl-[15px] md:ml-[30px] border-none
             rounded-l-sm"
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="bg-[rgb(254,189,105)] border-none w-[45px] h-10
             rounded-r-sm shrink-0"
          onClick={handleSearch}
        >
          <img
            className="h-[22px] m-auto"
            src="/images/icons/search-icon.png"
          />
        </button>

        <div className=" w-[180px] shrink-0 flex justify-end">
          <Link
            className="text-white no-underline text-center mr-4"
            to="/orders"
          >
            <span className="block text-[13px] text-left">Returns</span>
            <span className="block text-[15px] font-bold">& Orders</span>
          </Link>

          <Link
            className="text-white flex items-center relative"
            to="/checkout"
          >
            <img
              className="w-[50px]"
              src="/images/icons/cart-icon.png"
              alt="cart"
            />
            <div
              className="text-[rgb(240,136,4)] text-[16px] font-bold
               absolute top-0 left-4 w-[26px] text-center"
            >
              {" "}
              {totalQuantity}
            </div>
            <div className="mt-3 text-[15px] font-bold">Cart</div>
          </Link>
        </div>
      </header>
    </>
  );
}
