import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Header } from "../../components/Header";
import { useCart } from "../../context/CartContext";

export function ProductDetailsPage() {
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
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
        setMainImage(data.thumbnail);
      } catch (error) {
        alert(error.message);
      }
    };

    getProductDetails();
  }, [id]);

  return (
    <>
      <Header />
      <div className="mt-[60px] px-6 md:px-12 lg:px-20 py-10 bg-white text-gray-800">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex flex-col items-center w-full lg:w-1/2">
            <img
              className="w-full max-w-[400px] rounded-lg shadow-md mb-4 object-contain"
              src={mainImage}
              alt={productDetails.title}
            />
            <div className="flex gap-3 flex-wrap justify-center">
              {productDetails.images?.map((image, index) => (
                <img
                  className="w-[70px] h-[70px] object-cover rounded-md border border-gray-200 hover:border-yellow-400 cursor-pointer transition-all duration-200"
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          <div className=" flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold mb-3">
              {productDetails.title}
            </h1>

            <div className="text-sm text-gray-500 mb-4 space-y-1">
              <p className="product-category">
                Category:{" "}
                <strong className="text-gray-700">
                  {productDetails.category}
                </strong>
              </p>
              <p className="product-brand">
                Brand:{" "}
                <strong className="text-gray-700">
                  {productDetails.brand}
                </strong>
              </p>
            </div>

            <div className="flex items-center mb-3">
              <span className="text-yellow-500 text-lg">⭐</span>
              <strong className="ml-1 text-gray-700">
                {productDetails.rating}
              </strong>
              <span className="text-sm text-gray-500 ml-1">/ 5</span>
            </div>

            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              {productDetails.description}
            </p>

            <div className="mb-5 space-y-1">
              <p className="text-3xl font-bold text-green-700">
                {`$ ${productDetails.price}`}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Stock:</strong>{" "}
                <span
                  className={`${
                    productDetails.stock > 0 ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {productDetails.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
            </div>

            <div className="text-sm text-gray-600 mb-5 space-y-1">
              <p>
                <strong>Warranty:</strong> {productDetails.warrantyInformation}
              </p>
              <p>
                <strong>Return Policy:</strong> {productDetails.returnPolicy}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <div>
                <select
                  className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                  value={quantity}
                  name="product-quantity"
                  onChange={selectQuantity}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                disabled={productDetails.stock <= 0}
                className={`flex-1 py-2 rounded-md shadow-md font-semibold transition-all duration-200 ${
                  productDetails.stock > 0
                    ? "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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
                disabled={productDetails.stock <= 0}
                className={`flex-1 py-2 rounded-md shadow-md font-semibold transition-all duration-200 ${
                  productDetails.stock > 0
                    ? "bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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

        <section className="mt-14 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Product Details
          </h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>
              <strong>SKU:</strong> {productDetails.sku}
            </li>
            <li>
              <strong>Weight:</strong> {productDetails.weight}
            </li>
            <li>{`Depth: ${productDetails.dimensions?.depth}cm Height: ${productDetails.dimensions?.height}cm Width: ${productDetails.dimensions?.width}cm`}</li>
          </ul>
        </section>

        <section className="mt-14 border-t pt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Customer Reviews
          </h2>

          {productDetails.reviews?.length > 0 ? (
            productDetails.reviews.map((review, index) => (
              <div
                key={index}
                className="border-b pb-4 mb-4 last:border-none last:mb-0"
              >
                <p className="font-semibold text-gray-800">
                  {review.reviewerName}
                </p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-700 text-sm mt-1">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
