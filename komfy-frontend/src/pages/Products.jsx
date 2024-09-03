import {
  ProductSearch,
  PaginationContainer,
  ProductsContainer,
} from "../components";
import { customFetch } from "../utils";
const url = "/products";
const urlCategory = "/categories";

const allProductsQuery = ({ categoryId, keyword, page }) => {
  const params = {
    category_id: categoryId !== null ? categoryId : undefined,
    keyword,
    page,
  };

  return {
    queryKey: ["products", keyword ?? "", categoryId ?? "all", page ?? 0],
    queryFn: () => customFetch(url, { params }),
  };
};

const allCategoriesQuery = () => {
  return {
    queryKey: ["categories"],
    queryFn: () => customFetch(urlCategory),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
    const categoryId = urlSearchParams.get("category_id") || null;
    const keyword = urlSearchParams.get("keyword") || "";
    const page = urlSearchParams.get("page") || 1;

    const productsResponse = await queryClient.ensureQueryData(
      allProductsQuery({ categoryId, keyword, page })
    );
    // Tải danh sách categories
    const categoriesResponse = await queryClient.ensureQueryData(
      allCategoriesQuery()
    );
    // console.log(categoriesResponse);
    const categories = categoriesResponse.data.data;

    const { products, currentPage, totalPages, totalElements } =
      productsResponse.data.data;

    return {
      products,
      currentPage: parseInt(currentPage),
      totalPages: parseInt(totalPages),
      totalElements,
      categories,
    };
  };

const Products = () => {
  return (
    <>
      <ProductSearch />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
