import { useState } from "react";
import { useCart } from "../../context/CartContext";

export function Product({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.thumbnail}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.title}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${Math.round(product.rating) * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.reviews.length}
        </div>
      </div>

      <div className="product-price">$ {product.price}</div>

      <div className="product-quantity-container">
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

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={() =>
          addToCart({
            id: product.id,
            quantity: quantity,
            product: product,
            deliveryOptionId: 1,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
