import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import "./ProductDetailsPage.css";

export function ProductDetailsPage() {
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok)
          throw new Error("Failed to get product details from the server");

        const data = await response.json();

        setProductDetails(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProductDetails();
  }, [id]);

  return (
    <>
      <div className="product-details-page">
        <div className="product-container">
          <div className="product-images">
            <img
              className="main-image"
              src={productDetails.thumbnail}
              alt="Essence Mascara Lash Princess"
            />
            <div className="thumbnail-list">
              {productDetails.images?.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1 className="product-title">{productDetails.title}</h1>
            <p className="product-category">
              Category: <strong>{productDetails.category}</strong>
            </p>
            <p className="product-brand">
              Brand: <strong>{productDetails.brand}</strong>
            </p>
            <div className="product-rating">
              ⭐ <strong>{productDetails.rating}</strong> / 5
            </div>

            <p className="product-description">{productDetails.description}</p>

            <div className="product-pricing">
              <p className="price">
                <strong>{`$ ${productDetails.price}`}</strong>
              </p>
              <p className="availability">
                <strong>Stock:</strong> {productDetails.stock}
              </p>
            </div>

            <div className="product-meta">
              <p>
                <strong>Warranty:</strong> {productDetails.warrantyInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {productDetails.returnPolicy}
              </p>
            </div>

            <div className="product-actions">
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
              <button
                className="add-to-cart-btn"
                onClick={() =>
                  addToCart({
                    id: productDetails.id,
                    quantity: quantity,
                    product: productDetails,
                    deliveryOptionId: 1,
                  })
                }
              >
                Add to Cart
              </button>
              <button
                className="buy-now-btn"
                onClick={() => {
                  addToCart({
                    id: productDetails.id,
                    quantity: quantity,
                    product: productDetails,
                    deliveryOptionId: 1,
                  });
                  navigate(`/checkout`);
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <section className="product-extra">
          <h2>Product Details</h2>
          <ul>
            <li>
              <strong>SKU:</strong> {productDetails.sku}
            </li>
            <li>
              <strong>Weight:</strong> {productDetails.weight}
            </li>
            <li>{`Depth: ${productDetails.dimensions?.depth}cm Height: ${productDetails.dimensions?.depth}cm Width: ${productDetails.dimensions?.depth}cm`}</li>
          </ul>
        </section>

        <section className="product-reviews">
          <h2>Customer Reviews</h2>

          {productDetails.reviews?.length > 0 ? (
            productDetails.reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="reviewer">{review.reviewerName}</p>
                <p className="rating">⭐ {review.rating}</p>
                <p className="comment">{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
