import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import CardProduct from "../Components/Fragments/CardProduct";
import { getProducts } from "../Services/products.service";
import Navbar from "../Components/Layouts/NavbarLayouts";
import Banner from "../Components/Fragments/Banner";
import { useTotalDispathPrice } from "../context/TotalPriceContext";
import { Footer } from "../Components/Layouts/Footer";
import "../style.css";
import { addToCart } from "../redux/slices/cartSlice"; // Import addToCart action

const ProductsPages = () => {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const totalDispatch = useTotalDispathPrice();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  const categories = [
    { name: "Furniture", image: "/images/furniture.jpg" },
    { name: "Hand Bag", image: "/images/handbag.jpg" },
    { name: "Books", image: "/images/travel.jpg" },
    { name: "Tech", image: "/images/tech.jpg" },
    { name: "Sneakers", image: "/images/sneakers.jpg" },
    { name: "Travel", image: "/images/travel.jpg" },
  ];

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      totalDispatch({
        type: "UPDATE",
        payload: {
          total: sum,
        },
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch addToCart action
  };

  return (
    <Fragment>
      {/* Navbar */}
      <Navbar type="Products" />
      <div className="container overflow-y-auto">
        {/* Banner */}
        <Banner />
        <div className="max-w-screen md:max-h-full md:mx-14 p-4">
          <h2 className="text-2xl font-bold mb-6">Shop Our Top Categories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 md:h-60 object-cover hover:opacity-80 transition-opacity duration-300"
                />
                <div className="text-center py-2 bg-white">
                  <span className="font-medium text-gray-800">
                    {category.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-2xl font-bold my-6 mx-4 md:mx-20">
          Trending This Week
        </p>
        <div className="flex justify-center items-center flex-col">
          <div className="w-[95%]">
            <div className="w-full h-auto justify-evenly pb-10 flex flex-wrap gap-4 md:gap-0 md:items-center md:mx-3 md:justify-start max-w-[414px]:grid max-w-[414px]:grid-cols-1">
              {/* products */}
              {products.length > 0 &&
                products.map((product) => (
                  <CardProduct key={product.id}>
                    <CardProduct.Header image={product.image} id={product.id} />
                    <CardProduct.Body name={product.title}>
                      {product.description}
                    </CardProduct.Body>
                    <CardProduct.Footer
                      price={product.price}
                      id={product.id}
                      onAddToCart={() => handleAddToCart(product)} // Add this line
                    />
                  </CardProduct>
                ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default ProductsPages;
