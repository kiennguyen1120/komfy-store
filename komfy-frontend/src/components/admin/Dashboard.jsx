import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import SectionTitle from "../SectionTitle";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  console.log(user);
  if (!user || user.roles[0] === "ROLE_USER") {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
  return null;
};

const Dashboard = () => {
  return (
    <div>
      <SectionTitle text="Admin Dashboard" />
    </div>
  );
};
export default Dashboard;
