import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import SectionTitle from "../SectionTitle";
import { customFetch } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user || user.roles[0] === "ROLE_USER") {
    toast.warn("You must be logged in");
    return redirect("/login");
  }
  return null;
};

const AdminUsers = () => {
  const user = useSelector((state) => state.userState.user);
  const [users, setUsers] = useState([]);

  // Định nghĩa hàm để gọi API khi người dùng click vào nút
  const handleToggleActive = async (userId, isActive) => {
    console.log(userId);
    try {
      const active = isActive ? 1 : 0; // Gán giá trị 1 (enable) hoặc 0 (block)

      await customFetch.put(`/users/block/${userId}/${active}`, null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Cập nhật trạng thái người dùng trong state sau khi thực hiện thành công
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, is_active: !u.is_active } : u
        )
      );
    } catch (error) {
      toast.error("Error toggling user active status:", error);
    }
  };

  useEffect(() => {
    // Define a function to fetch categories
    const fetchUserData = async () => {
      try {
        const response = await customFetch.get("/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const fetchedUsersData = response.data.data.users;
        console.log(fetchedUsersData);
        setUsers(fetchedUsersData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Call the fetchCategories function to get categories when the component mounts
    fetchUserData();
  }, []);

  return (
    <div>
      <SectionTitle text="User Management" />
      <div className="mt-8">
        <div className="overflow-x-auto ">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {/* <th>Products</th> */}
                <th>Address</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const id = user.id;
                const { fullname, address, is_active } = user;

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{fullname}</td>
                    <td>{address}</td>
                    <td>
                      <button
                        className="btn btn-outline btn-warning btn-sm"
                        onClick={() => handleToggleActive(id, !is_active)}
                      >
                        {is_active ? "Block" : "Enable"}
                      </button>
                    </td>
                    <td>
                      {/* Details button */}
                      <button className="btn btn-info btn-sm mr-2">
                        Details
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
export default AdminUsers;
