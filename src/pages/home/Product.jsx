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
        border-r border-b border-[#e7e7e7]"
      data-testid="product-container"
    >
      <Link className="mb-4" to={`/product/${product.id}/details`}>
        <div className="h-[180px] mb-4">
          <img
            className="max-w-full max-h-full"
            data-testid="product-image"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <h3 className="h-10 line-clamp-2 leading-5">{product.title}</h3>
      </Link>

      <div className="flex items-center mb-2.5">
        <img
          className="w-[100px] mr-1.5"
          data-testid="product-rating-stars-image"
          src={`/images/ratings/rating-${Math.round(product.rating) * 10}.png`}
          alt="rating"
        />
        <div className="text-[#017cb6] cursor-pointer mt-[3px] link-primary">
          {product.reviews?.length ?? 0}
        </div>
      </div>

      <div className="font-bold mb-2.5">$ {product.price}</div>

      <div className="mb-[17px]">
        <select
          value={quantity}
          name="product-quantity"
          disabled={product.stock <= 0}
          onChange={selectQuantity}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1"></div>

      {
        <div
          className={`flex items-center mb-2 text-[#067d62 text-[16px] ${
            isAdded ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            className="h-5 mr-[5px]"
            src="/images/icons/checkmark.png"
            alt="Added"
          />
          Added
        </div>
      }

      <button
        className="w-full py-1 text-[12px] rounded-[50px] bg-[#ffd814] border border-[#fcd200]
                   hover:bg-[#f7ca00] hover:border-[#f2c200]
                   active:shadow-none button-primary"
        data-testid="add-to-cart-button"
        disabled={product.stock <= 0}
        onClick={handleAddToCart}
      >
        {product.stock > 0 ? "Add to Cart" : "Out of stock"}
      </button>
    </div>
  );
}
