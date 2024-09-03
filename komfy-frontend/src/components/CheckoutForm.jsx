import { Form, redirect } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { fullname, address, email, phone_number } =
      Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal } = store.getState().cartState;
    console.log(cartItems);
    const info = {
      fullname,
      address,
      email,
      phone_number,
      total_money: orderTotal,
      cart_items: cartItems.map((item) => ({
        productID: item.productID,
        amount: item.amount,
      })),
    };
    console.log(JSON.stringify(info));
    try {
      const response = await customFetch.post("/orders", info, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // remove query
      queryClient.removeQueries(["orders"]);
      // rest of the code
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage = "there was an error placing your order";

      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) {
        redirect("/login");
      }
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <input
        label="name"
        placeholder="Full Name"
        name="fullname"
        type="text"
        className={`input input-bordered`}
        required
      />
      <input
        label="email"
        placeholder="Email"
        name="email"
        type="email"
        className={`input input-bordered`}
        required
      />
      <input
        label="phone number"
        placeholder="Phone Number"
        name="phone_number"
        type="text"
        className={`input input-bordered`}
        required
      />
      <input
        label="address"
        name="address"
        placeholder="Address"
        type="text"
        className={`input input-bordered`}
        required
      />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};
export default CheckoutForm;
