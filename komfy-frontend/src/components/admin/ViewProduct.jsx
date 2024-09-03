import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { customFetch, formatPrice } from "../../utils";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ViewProduct = () => {
  const user = useSelector((state) => state.userState.user);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    customFetch
      .get(`/products/${id}`)
      .then((response) => {
        const { data } = response.data;
        setProduct(data);
        setThumbnail(
          data.productImages.length > 0
            ? data.productImages[0].image_url
            : "placeholder.jpg"
        );
        setSelectedThumbnail(
          data.productImages.length > 0
            ? data.productImages[0].image_url
            : "placeholder.jpg"
        );
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { name, price, description, colors, productImages } = product;

  // console.log(colors[0].color);
  const dollarsAmount = formatPrice(price);

  const handleThumbnailClick = (imageUrl) => {
    setThumbnail(imageUrl);
    setSelectedThumbnail(imageUrl);
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast.warn("Please select a file image");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    customFetch
      .post(`/products/uploads/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Xử lý khi tải lên thành công
        toast.success("Images uploaded successfully");
      })
      .catch((error) => {
        // Xử lý khi có lỗi xảy ra
        toast.error("Error uploading images");
      });
  };
  return (
    <div>
      <section>
        <div className="text-md breadcrumbs">
          <Link
            to={"/admin-products"}
            className="btn btn-accent btn-sm btn-outline"
          >
            Back
          </Link>
        </div>
        {/* PRODUCT */}
        <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={`http://localhost:8099/api/v1/products/images/${thumbnail}`}
              alt="product thumbnail"
              className="h-96 max-w-full rounded-lg"
            />
            {/* SMALL IMAGES */}
            <div className="bottom-0 left-0 grid grid-cols-5 gap-2 mt-2">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8099/api/v1/products/images/${image.image_url}`}
                  alt="product image"
                  onClick={() => handleThumbnailClick(image.image_url)}
                  className={`h-auto max-w-full rounded-lg cursor-pointer ${
                    image.image_url === selectedThumbnail
                      ? "border-4 border-blue-500"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
          {/* PRODUCT INFO */}
          <div>
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <h4 className="text-xl text-neutral font-bold mt-2">{}</h4>

            <p className="mt-3 text-xl">{dollarsAmount}</p>

            <p className="mt-6 leading-8">{description}</p>

            {/* COLORS */}
            <div className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                colors
              </h4>
              <div className="mt-2">
                {colors.map((color_obj, index) => {
                  return (
                    <button
                      key={index}
                      className={
                        "badge  w-6 h-6 mr-2 border-2 border-secondary"
                      }
                      style={{ backgroundColor: color_obj.color }}
                    ></button>
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                Upload Images
              </h4>
              <form className="mt-4" onSubmit={handleUpload}>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  multiple
                  onChange={handleFileChange}
                  name="files"
                />
                <button type="submit" className="btn btn-primary ml-2">
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ViewProduct;
