import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";

const ProductsContainer = () => {
  const { totalElements } = useLoaderData();

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalElements} product{totalElements > 1 && "s"}
        </h4>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalElements === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : (
          <ProductsGrid />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
