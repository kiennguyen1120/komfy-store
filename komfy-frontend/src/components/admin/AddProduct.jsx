import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { customFetch } from "../../utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddProduct = () => {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    featured: 0,
    colors: ["#FFD8B9", "#F2ABB3", "#B1CAE9"],
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    customFetch
      .get("/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch categories");
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form values:", values);
    console.log(values);
    if (!values.category) {
      toast.error("Please select a category");
      return;
    }
    customFetch
      .post("/products", values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        toast.success("Add product successfully");
        navigate("/admin-products");
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = "there was an error";
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold ">Add a new product</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium ">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border text-sm rounded-lg block w-full p-2.5 border-gray-400"
                  placeholder="Type product name"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  required=""
                />
              </div>

              <div className="w-full">
                <label className="block mb-2 text-sm font-medium ">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="border text-sm rounded-lg block w-full p-2.5 border-gray-400"
                  placeholder="$2999"
                  value={values.price}
                  onChange={(e) =>
                    setValues({ ...values, price: e.target.value })
                  }
                  required=""
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  Category
                </label>
                <select
                  id="category"
                  className=" border text-sm rounded-lg block w-full p-2.5 border-gray-400"
                  value={values.category}
                  onChange={(e) =>
                    setValues({ ...values, category: e.target.value })
                  }
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center ">
                <label className="block mr-2 text-sm font-medium ">
                  Featured
                </label>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="checkbox checkbox-error"
                  checked={values.featured}
                  onChange={(e) =>
                    setValues({ ...values, featured: e.target.checked })
                  }
                />
              </div>

              <div className="flex items-center ">
                <label
                  htmlFor="colors"
                  className="block mr-2 text-sm font-medium "
                >
                  Colors
                </label>
                <div className="mt-2">
                  {["#FFD8B9", "#F2ABB3", "#B1CAE9"].map((color, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`badge w-6 h-6 mr-2 ${
                        values.colors.includes(color)
                          ? "border-2 border-secondary"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        setValues({
                          ...values,
                          colors: values.colors.includes(color)
                            ? values.colors.filter((c) => c !== color)
                            : [...values.colors, color],
                        })
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium ">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="8"
                  placeholder="Your description here"
                  className="block p-2.5 w-full text-sm  rounded-lg border border-gray-400 "
                  value={values.description}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-info">
                Add product
              </button>
              <Link
                to={"/admin-products"}
                className="btn btn-outline btn-accent ml-3"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
export default AddProduct;
