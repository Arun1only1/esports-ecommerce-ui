import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product-edit/:id",
        element: <EditProduct />,
      },
    ],
  },
];

export default mainRoutes;
