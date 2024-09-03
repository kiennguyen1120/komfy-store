import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { useEffect, useState } from "react";
import { customFetch } from "../../utils";
import { useSelector } from "react-redux";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  // console.log(user);
  if (!user || user.roles[0] === "ROLE_USER") {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
  return null;
};

const AdminCategories = () => {
  const user = useSelector((state) => state.userState.user);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Define a function to fetch categories
    const fetchCategories = async () => {
      try {
        const response = await customFetch.get("/categories");
        const fetchedCategories = response.data.data; // Assuming data is structured as an array of categories
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the fetchCategories function to get categories when the component mounts
    fetchCategories();
  }, [categoryName]); // Empty dependency array ensures that this effect runs only once after the initial render

  const handleDeleteCategory = async (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        await customFetch.delete(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setCategories(categories.filter((category) => category.id !== id));
        toast.success("Category deleted successfully");
      } catch (error) {
        console.error("Delete category failed:", error);
        toast.error("Failed to delete category");
      }
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    // Kiểm tra nếu tên category không rỗng
    if (categoryName.trim() !== "") {
      try {
        // Gửi yêu cầu tạo category đến server
        const response = await customFetch.post(
          "/categories",
          { name: categoryName },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const newCategory = response.data.category;
        setCategories([...categories, newCategory]);
        // Xử lý phản hồi từ server nếu cần
        toast.success("Create category successfully");
        // Xóa nội dung trường input sau khi tạo category thành công
        setCategoryName("");
      } catch (error) {
        toast.error("Error creating category");
      }
    } else {
      // Hiển thị thông báo hoặc xử lý trường hợp tên category rỗng
      toast.warn("Please enter a category name");
    }
  };

  return (
    <div>
      <SectionTitle text="Categories" />
      <form className="mt-3 flex">
        <div className="mr-3">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs "
            value={categoryName}
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn btn-info "
            type="button"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
      </form>

      <div className="mt-8">
        <div className="overflow-x-auto ">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const id = category.id;
                const { name } = category;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>

                    <td>
                      {/* Delete button */}
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleDeleteCategory(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
