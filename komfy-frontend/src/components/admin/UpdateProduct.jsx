import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customFetch } from "../../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [values, setValues] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
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

  useEffect(() => {
    customFetch
      .get(`/products/${id}`)
      .then((response) => {
        const { data } = response.data;
        const product = {
          name: data.name,
          price: data.price,
          category: data.category.id,
          featured: data.featured,
          colors: data.colors.map((color) => color.color),
          description: data.description,
        };
        setValues(product);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  if (!values) {
    return <div>Loading...</div>;
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(values);
    // Gửi yêu cầu PUT đến backend để cập nhật sản phẩm
    customFetch
      .put(`/products/${id}`, values, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        // Xử lý khi cập nhật thành công
        toast.success("Product updated successfully");
        navigate("/admin-products");
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        toast.error("Error updating product:", error);
        // Hiển thị thông báo hoặc xử lý lỗi tương ứng
      });
  };

  return (
    <div>
      <section>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold ">Update product</h2>
          <form onSubmit={handleUpdate}>
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
                Update
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
    </div>
  );
};
export default UpdateProduct;
