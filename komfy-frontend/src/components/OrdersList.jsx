import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { formatPrice } from "../utils";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders } = useLoaderData();
  console.log(orders);
  return (
    <div className="mt-8">
      <div className="overflow-x-auto ">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Total Money</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { fullName, address, orderDate, orderDetails, totalMoney } =
                order;
              const date = new Date(
                orderDate[0],
                orderDate[1] - 1,
                orderDate[2]
              ); // Tạo đối tượng Date từ mảng ngày tháng năm
              const dateString = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`; // Format ngày tháng năm

              return (
                <tr key={id}>
                  <td>{fullName}</td>
                  <td>{address}</td>
                  <td>
                    <ul>
                      {orderDetails.map((orderDetail) => {
                        const idOrderDetail = orderDetail.id;
                        const { product, numberOfProducts } = orderDetail;
                        return (
                          <li key={idOrderDetail}>
                            <span>{product.name}: </span>
                            <span>{numberOfProducts}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>{formatPrice(totalMoney)}</td>
                  <td className="hidden sm:block">{dateString}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
