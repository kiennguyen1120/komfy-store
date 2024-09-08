import { formatPrice } from "../utils";
import { removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  const { cartID, productID, name, price, thumbnail, amount, productColor } =
    cartItem;
  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };
  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <Link to={`/products/${productID}`}>
        <img
          src={`https://komfy-api.teeai.net/api/v1/products/images/${thumbnail}`}
          alt={name}
          className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
        />
      </Link>

      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <Link to={`/products/${productID}`} className="capitalize font-medium">
          {name}
        </Link>
        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
        {/* AMOUNT */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          amount :<span>{amount}</span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* REMOVE */}
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(amount * price)}</p>
    </article>
  );
};
export default CartItem;
