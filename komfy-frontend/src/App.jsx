import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as dashboardLoader } from "./components/admin/Dashboard";
import { loader as adminCategoriesLoader } from "./components/admin/Dashboard";

import AdminOrders, {
  loader as adminOrdersLoader,
} from "./components/admin/AdminOrders";
import { loader as adminProductsLoader } from "./components/admin/AdminProducts";
import { loader as adminUsersLoader } from "./components/admin/AdminUsers";

// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";
import { store } from "./store";
import Dashboard from "./components/admin/Dashboard";
import AdminCategories from "./components/admin/AdminCategories";
import AdminProducts from "./components/admin/AdminProducts";
import AdminUsers from "./components/admin/AdminUsers";
import AddProduct from "./components/admin/AddProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ViewProduct from "./components/admin/ViewProduct";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersLoader(store, queryClient),
      },

      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorElement />,
        loader: dashboardLoader(store),
      },

      {
        path: "admin-products",
        element: <AdminProducts />,
        errorElement: <ErrorElement />,
      },
      {
        path: "admin-users",
        element: <AdminUsers />,
        errorElement: <ErrorElement />,
      },
      {
        path: "admin-orders",
        element: <AdminOrders />,
        errorElement: <ErrorElement />,
      },
      {
        path: "admin-categories",
        element: <AdminCategories />,
        errorElement: <ErrorElement />,
      },
      {
        path: "create-product",
        element: <AddProduct />,
        errorElement: <ErrorElement />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
        errorElement: <ErrorElement />,
      },
      {
        path: "view-product/:id",
        element: <ViewProduct />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
