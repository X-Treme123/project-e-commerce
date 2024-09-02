import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../Services/products.service";
import Button from "../Components/Elements/Button/Button";
import useLogin from "../hooks/useLogin";
import { IoMdArrowBack } from "react-icons/io";

export const DetailProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const username = useLogin();

  useEffect(() => {
    getDetailProduct(id, (data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-3 justify-center items-center p-10">
      <div className="absolute top-5 left-10 flex flex-col md:flex-row font-sans max-w-xl md:max-w-4xl border-gray-200 shadow-xl">
        <button
          onClick={() => window.history.back()}
          className="h-10 px-6 font-semibold flex gap-3 items-center rounded-md bg-green-500 hover:bg-green-400 text-white w-full md:w-auto block md:hidden"
          type="submit">
          <IoMdArrowBack /> Back
        </button>
      </div>
      {Object.keys(product).length > 0 && (
        <div className="flex flex-col md:flex-row font-sans max-w-xl md:max-w-2xl border-2 border-gray-200 shadow-xl">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6 text-sm font-medium"></div>
          <div className="flex-none w-full md:w-48 h-auto relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 md:max-h-full object-contain p-3"
              loading="lazy"
            />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg font-semibold text-slate-900">
                {product.title}
              </h1>
              <div className="text-lg font-semibold text-slate-500">
                $ {product.price}
              </div>
              <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                Review {product.rating.rate}/5 ({product.rating.count})
              </div>
            </div>
            <div className="mt-4 mb-6 pb-6 border-b border-slate-200">
              <p className="text-sm">{product.description}</p>
            </div>

            <p className="text-sm text-slate-700">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
