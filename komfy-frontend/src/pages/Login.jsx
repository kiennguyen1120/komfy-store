import { SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/users/login", data);

      // console.log(response);
      store.dispatch(loginUser(response.data.data));
      toast.success("logged in successfully");
      if (response.data.data.roles[0] === "ROLE_ADMIN")
        return redirect("/dashboard");
      return redirect("/");
    } catch (error) {
      if (error.response) {
        const { data, status } = error.response;

        if (typeof data === "object" && data !== null) {
          const errorMessage = data.message || "An error occurred";
          toast.error(`${errorMessage}`);
        } else {
          // Nếu dữ liệu không phải đối tượng, hiển thị thông báo mặc định
          toast.error(`Error ${status}: ${data}`);
        }
      } else {
        toast.error("An error occurred while logging in");
      }

      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <input
          placeholder="username"
          type="text"
          label="username"
          name="username"
          defaultValue="user"
          className={`input input-bordered`}
          required
        />
        <input
          placeholder="password"
          type="password"
          label="password"
          name="password"
          defaultValue="user"
          className={`input input-bordered`}
          required
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
