import React, { useContext } from "react";
import { Link } from "react-router-dom";

const AuthLayouts = (props) => {
  const { title, children, type } = props;
  return (
    <div
      className="flex justify-center flex-col min-h-screen items-center">
        <nav className="relative py-7 font-bold text-3xl italic text-green-500 font-serif">
          TrendMart
        </nav>
        <div className="w-full max-w-md border-4 p-8 rounded-xl">
          <h1 className="text-3xl font-bold mb-2 text-green-500">{title}</h1>
          <p className="font-medium text-slte-500">
            Please enter your details
          </p>
          {children}
          <p className="my-8 font-semibold">
            {type === "Login"
              ? "Dont have a account ? "
              : "Already have an account ? "}

            {type === "Login" && (
              <Link to="/register" className="font-bold text-green-400 hover:text-green-300 transition duration-200 ease-in-out">
                Register
              </Link>
            )}
            {type === "Register" && (
              <Link to="/login" className="font-bold text-green-400 hover:text-green-300 transition duration-200 ease-in-out">
                Login
              </Link>
            )}
          </p>
        </div>
    </div>
  );
};

export default AuthLayouts;
