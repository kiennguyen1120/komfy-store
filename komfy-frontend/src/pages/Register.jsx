import { FormInput, SubmitBtn } from "../components";
import { Form, redirect, Link } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/users/register", data);
    // console.log(response);
    toast.success("account created successfully");
    return redirect("/login");
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

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        required
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <input
          type="text"
          placeholder="username"
          label="username"
          name="username"
          className={`input input-bordered`}
          required
        />
        <input
          placeholder="password"
          type="password"
          label="password"
          name="password"
          className={`input input-bordered`}
          required
        />
        <input
          type="password"
          placeholder="retype password"
          label="retype password"
          name="retype_password"
          className={`input input-bordered`}
          required
        />
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="terms"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              class="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
