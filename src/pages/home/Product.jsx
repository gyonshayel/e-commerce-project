import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

export function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      quantity: quantity,
      product: product,
      deliveryOptionId: 1,
    });

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <div
      className="flex flex-col 
        pt-10 pb-[25px] px-[25px] 
        border-r border-b border-[rgb(231,231,231)]"
      data-testid="product-container"
    >
      <Link to={`/product/${product.id}/details`}>
        <div className="flex justify-center items-center h-[180px] mb-5">
          <img
            className="max-w-full max-h-full"
            data-testid="product-image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="h-10 mb-[5px] line-clamp-2 limit-text-to-2-lines">
          {product.title}
        </div>
      </Link>

      <div className="flex items-center mb-2.5">
        <img
          className="w-[100px] mr-1.5"
          data-testid="product-rating-stars-image"
          src={`../../public/images/ratings/rating-${
            Math.round(product.rating) * 10
          }.png`}
          alt="rating"
        />
        <div className="text-[rgb(1,124,182)] cursor-pointer mt-[3px] link-primary">
          {product.reviews.length}
        </div>
      </div>

      <div className="font-bold mb-2.5">$ {product.price}</div>

      <div className="mb-[17px]">
        <select
          value={quantity}
          name="product-quantity"
          onChange={selectQuantity}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="flex-1"></div>

      {
        <div
          className={`flex items-center mb-2 text-[rgb(6,125,98)] text-[16px] opacity-${
            isAdded ? "100" : "0"
          }`}
        >
          <img
            className="h-5 mr-[5px]"
            src="../public/images/icons/checkmark.png"
            alt="Added"
          />
          Added
        </div>
      }

      <button
        className="w-full py-2 rounded-[50px] bg-[rgb(255,216,20)] border border-[rgb(252,210,0)]
                   hover:bg-[rgb(247,202,0)] hover:border-[rgb(242,194,0)]
                   active:shadow-none button-primary"
        data-testid="add-to-cart-button"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
