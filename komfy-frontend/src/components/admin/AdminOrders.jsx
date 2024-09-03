import { redirect } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import AllOrdersList from "./AllOrdersList";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user || user.roles[0] === "ROLE_USER") {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
  return null;
};

const AdminOrders = () => {
  return (
    <div>
      <SectionTitle text="Order Management" />
      <AllOrdersList />
    </div>
  );
};
export default AdminOrders;
