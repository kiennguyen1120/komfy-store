import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { customFetch, formatPrice } from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

const ProductManagement = () => {
  const user = useSelector((state) => state.userState.user);
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await customFetch.get("/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log(response);
        setProducts(response.data.data.products);
        setTotalElements(response.data.data.totalElements);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [user.token]);

  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm("Would you like to Delete?");
    if (confirm) {
      try {
        await customFetch.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        // After successful deletion, update the product list by removing the deleted product
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );

        // Fetch new totalElements after deleting the product
        const response = await customFetch.get("/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTotalElements(response.data.data.totalElements);

        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
          <h4 className="font-medium text-md">
            {totalElements} product{totalElements > 1 && "s"}
          </h4>
          <Link to="/create-product" className="btn btn-info btn-sm">
            Add product
          </Link>
        </div>
        <div className="overflow-x-auto ">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                {/* <th>Products</th> */}
                <th className="hidden sm:block">Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const id = product.id;

                const { name, category, createdAt, price, thumbnail } = product;
                const date = new Date(
                  createdAt[0],
                  createdAt[1] - 1,
                  createdAt[2]
                ); // Tạo đối tượng Date từ mảng ngày tháng năm
                const dateString = `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`; // Format ngày tháng năm

                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <img
                        src={`http://localhost:8099/api/v1/products/images/${thumbnail}`}
                        onError={(e) => {
                          e.target.src =
                            "http://localhost:8099/api/v1/products/images/placeholder.jpg";
                        }}
                        alt={name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category.name}</td>

                    <td>{formatPrice(price)}</td>
                    <td className="hidden sm:block">{dateString}</td>
                    <td>
                      {/* Details button */}
                      <Link
                        to={`/update-product/${id}`}
                        className="btn btn-success btn-sm mr-2"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/view-product/${id}`}
                        className="btn btn-outline btn-warning btn-sm mr-2"
                      >
                        Preview
                      </Link>
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleDeleteProduct(id)}
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
    </>
  );
};

export default ProductManagement;
