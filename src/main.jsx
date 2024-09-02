import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./Pages/Register.jsx";
import LoginPage from "./Pages/Login.jsx";
import ErrorPage from "./Pages/404.jsx";
import ProductsPages from "./Pages/Products.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AboutPage from "./Pages/About.jsx";
import ProfilePage from "./Pages/Profile.jsx";
import { DetailProductPage } from "./Pages/detailProduct.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { TotalPriceProvider } from "./context/TotalPriceContext.jsx";
import { BuyPage } from "./Pages/Buy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <ProductsPages />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/products/:id",
    element: <DetailProductPage />,
  },
  {
    path: "/buy",
    element: <BuyPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <TotalPriceProvider>
        <RouterProvider router={router} />
      </TotalPriceProvider>
    </Provider>
  </React.StrictMode>
);
