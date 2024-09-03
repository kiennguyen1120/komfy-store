import { useLoaderData, useNavigate } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { customFetch, formatPrice } from "../../utils";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
day.extend(advancedFormat);

// // const handleDetails = (id) => {};

const AllOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.userState.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await customFetch.get("/orders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrders();
  }, [user.token]);

  const handleDeleteOrder = async (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        await customFetch.delete(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // After successful deletion, update the products list by removing the deleted product
        setOrders(orders.filter((order) => order.id !== id));
        toast.success("Deleted order successfully");
      } catch (error) {
        toast.error("Delete order failed");
      }
    }
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              {/* <th>Products</th> */}
              <th>Total Money</th>
              <th className="hidden sm:block">Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const {
                fullname,
                address,
                order_date,
                order_details,
                total_money,
                status,
              } = order;
              const date = new Date(
                order_date[0],
                order_date[1] - 1,
                order_date[2]
              ); // Tạo đối tượng Date từ mảng ngày tháng năm
              const dateString = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`; // Format ngày tháng năm

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{fullname}</td>
                  <td>{address}</td>

                  <td>{formatPrice(total_money)}</td>
                  <td className="hidden sm:block">{dateString}</td>
                  <td>
                    {/* Details button */}
                    <button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => handleDetails(id)}
                    >
                      Details
                    </button>
                    {/* Delete button */}
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => handleDeleteOrder(id)}
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
  );
};
export default AllOrdersList;
