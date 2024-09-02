import { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";
import Button from "../Elements/Button/Button";
import Picture from "/images/profile.png";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = (props) => {
  const { type } = props;
  const username = useLogin();
  const cart = useSelector((state) => state.cart.data);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [showTotalCart, setShowTotalCart] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleBack = () => {
    window.location.href = "/products";
  };

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.qty, 0);
    setTotalCart(sum);
    if (sum > 0) {
      setShowTotalCart(true);

      // Sembunyikan total cart setelah 5 detik jika tidak ada item yang ditambahkan
      const timer = setTimeout(() => {
        setShowTotalCart(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        // Cek apakah layar lebih dari atau sama dengan 768px
        if (window.scrollY > lastScrollY) {
          // Scroll ke bawah
          setIsVisible(false);
        } else {
          // Scroll ke atas
          setIsVisible(true);
        }
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`bg-white flex justify-between px-6 md:px-10 h-20 items-center sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}>
      <h1 className="font-semibold font-serif italic text-green-500 text-lg md:text-2xl">
        TrendMart
      </h1>
      <div className="flex justify-center items-center relative">
        <div className="flex items-start px-2">
          {type === "Products" && (
            <Link
              to="/buy"
              className="text-2xl md:text-3xl hover:bg-gray-200 p-2 transition duration-300 ease-in-out relative">
              <FaShoppingCart />
              <div className="absolute -top-2 -right-2">
                <div
                  className={`bg-orange-500 rounded-full text-white text-xs px-2 py-1 transition-opacity duration-300 ${
                    showTotalCart ? "opacity-100" : "opacity-0"
                  }`}>
                  {totalCart}
                </div>
              </div>
            </Link>
          )}
        </div>

        {type === "Products" && (
          <p className="text-3xl mx-3 text-gray-200 mb-1">|</p>
        )}
        {type === "Products" && (
          <div
            className="relative flex justify-center cursor-pointer items-center hover:bg-gray-200 p-1 transition duration-300 ease-in-out"
            onMouseEnter={() => setIsProfileHover(true)}
            onMouseLeave={() => setIsProfileHover(false)}>
            <div className="flex items-center">
              <img src={Picture} className="w-8 md:w-10 rounded-full" />
              <p className="font-semibold mx-2 text-gray-700">{username}</p>
            </div>
            {isProfileHover && (
              <div className="absolute top-full w-60 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
        {type === "Profile" &&
          Button({
            children: "Back",
            classname: "bg-green-500 text-white w-20 hover:bg-green-400",
            onClick: handleBack,
          })}
      </div>
    </div>
  );
};

export default Navbar;
