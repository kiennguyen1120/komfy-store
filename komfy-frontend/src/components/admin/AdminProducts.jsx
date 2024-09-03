import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import ProductManagement from "./ProductManagement";
import { customFetch } from "../../utils";
import PaginationContainer from "../PaginationContainer";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user || user.roles[0] === "ROLE_USER") {
    toast.warn("You must be logged in");
    return redirect("/login");
  }

  return null;
};
const AdminProducts = () => {
  return (
    <div>
      <SectionTitle text="Product Management" />
      <ProductManagement />
    </div>
  );
};
export default AdminProducts;
