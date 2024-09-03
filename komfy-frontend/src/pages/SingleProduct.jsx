import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch.get(`/products/${id}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    // console.log(response.data.data);
    return { product: response.data.data };
  };

const SingleProduct = () => {
  const { product } = useLoaderData();
  // console.log(product);
  const { name, price, description, colors, productImages } = product;

  // console.log(colors[0].color);
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0].color);
  const [thumbnail, setThumbnail] = useState(
    productImages && productImages.length > 0
      ? productImages[0].image_url
      : "placeholder.jpg"
  );
  const [selectedThumbnail, setSelectedThumbnail] = useState(
    productImages && productImages.length > 0
      ? productImages[0].image_url
      : "placeholder.jpg"
  );
  const [amount, setAmount] = useState(1);

  const handleThumbnailClick = (imageUrl) => {
    setThumbnail(imageUrl);
    setSelectedThumbnail(imageUrl);
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    thumbnail,
    name,
    price,
    productColor,
    amount,
  };

  const dispatch = useDispatch();
  //action.payload chính là đối tượng { product: cartProduct }
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <p>{name}</p>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* IMAGE */}
        <div className="relative">
          <img
            src={`http://localhost:8099/api/v1/products/images/${thumbnail}`}
            alt="product thumbnail"
            className="h-96 max-w-full rounded-lg"
          />
          {/* SMALL IMAGES */}
          <div className="bottom-0 left-0 grid grid-cols-5 gap-2 mt-2">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:8099/api/v1/products/images/${image.image_url}`}
                alt="product image"
                onClick={() => handleThumbnailClick(image.image_url)}
                className={`h-auto max-w-full rounded-lg cursor-pointer ${
                  image.image_url === selectedThumbnail
                    ? "border-4 border-blue-500"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral font-bold mt-2">{}</h4>

          <p className="mt-3 text-xl">{dollarsAmount}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color_obj, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color_obj.color === productColor &&
                      "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color_obj.color }}
                    onClick={() => setProductColor(color_obj.color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-neutral select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10 ">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
