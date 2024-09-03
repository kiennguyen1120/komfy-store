import { Hero, FeaturedProducts } from "../components";
import { customFetch } from "../utils";

const url = "/products?featured=true&limit=3";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  // console.log(response);
  const products = response.data.data.slice(0, 3);
  // console.log(products);
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
export default Landing;
