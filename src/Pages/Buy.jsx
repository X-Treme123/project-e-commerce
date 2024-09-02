import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import {
  useTotalDispathPrice,
  useTotalPrice,
} from "../context/TotalPriceContext";
import { getProducts } from "../Services/products.service";
import useLogin from "../hooks/useLogin";
import Bca from "../Components/Elements/icons/Bank/Bca.jsx";
import BNI from "../Components/Elements/icons/Bank/BNI.jsx";
import BRI from "../Components/Elements/icons/Bank/BRI.jsx";
import Mandiri from "../Components/Elements/icons/Bank/Mandiri.jsx";
import Button from "../Components/Elements/Button/Button.jsx";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "react-modal";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCartFromLocalStorage,
} from "../redux/slices/cartSlice.js";
import "../style.css";

export const BuyPage = () => {
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const { total } = useTotalPrice();
  const dispatchTotalPrice = useTotalDispathPrice();
  const [products, setProducts] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [selectDelivery, setSelectDelivery] = useState();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [virtualAccount, setVirtualAccount] = useState('');
  const username = useLogin();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart) {
      dispatch(setCartFromLocalStorage(localCart));
    }
  }, [dispatch]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  const handleDeliveryChange = (e) => {
    const selectOption = e.target.value;
    setSelectDelivery(selectOption);
    updateDelivery(selectOption);
  };

  const updateDelivery = (DeliveryOption) => {
    let cost = 0;

    switch (DeliveryOption) {
      case "free":
        cost = 0;
        break;
      case "standard":
        cost = 2;
        break;
      case "express":
        cost = 5;
        break;
      case "next":
        cost = 8;
        break;
      case "same":
        cost = 10;
        break;
      default:
        cost = 0;
    }
    setDelivery(cost);
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "faisal") {
      setDiscount(0.5);
    } else {
      setDiscount(0);
    }
  };

  const handleClick = () => {
    window.location.href = "/products";
  };

  const handleRemoveProduct = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleIncrementQty = (itemId) => {
    dispatch(incrementQuantity({ id: itemId }));
  };

  const handleDecrementQty = (itemId) => {
    dispatch(decrementQuantity({ id: itemId }));
  };

  const handleOpenModal = () => {
    // Check if there are items in local storage
    const items = JSON.parse(localStorage.getItem("cart"));
  
    if (!items || items.length === 0) {
      alert(
        "No items in your cart. Please complete your transaction immediately."
      );
      performTransaction();
    } else {
      const randomAccount = `VA${Math.floor(
        1000000000 + Math.random() * 9000000000
      )}`;
      setVirtualAccount(randomAccount);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmPayment = () => {
    setIsModalOpen(false); // Tutup modal konfirmasi
    setIsSuccessModalOpen(true); // Buka modal payment success
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    const sum = cart.reduce((acc, item) => acc + item.qty, 0);
    setTotalCart(sum);
  }, [cart]);

  useEffect(() => {
    if (products.length > 0) {
      if (cart.length > 0) {
        const sum = cart.reduce((acc, item) => {
          const product = products.find((product) => product.id === item.id);
          return acc + product.price * item.qty;
        }, 0);
        dispatchTotalPrice({ type: "UPDATE", payload: { total: sum } });
      } else {
        dispatchTotalPrice({ type: "UPDATE", payload: { total: 0 } });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products, dispatchTotalPrice]);

  const totalCost = total + delivery - total * discount;

  return (
    <div className="h-full xl:h-screen w-full flex flex-col md:flex-row items-center justify-center">
      <div className="max-h-auto w-full 2xl:max-w-[80%] flex flex-col justify-center items-start xl:flex-row md:items-center xl:mt-0 md:max-w-[90%] xl:items-start xl:border-2 rounded-lg">
        <div className="w-full flex flex-col items-start xl:border-r-2">
          <div className="flex justify-between mx-4 flex-col gap-3">
            <h1 className="text-xl md:mt-0 md:text-2xl font-bold py-5 text-green-500">
              Shopping Cart
            </h1>
            <h2 className="font-semibold text-lg md:text-xl font-mono border-b-2 mb-2">
              {totalCart} Items
            </h2>
          </div>
          <div className="container h-[60vh] md:h-[63vh] w-full text-left flex items-start overflow-y-auto">
            {totalCart > 0 ? (
              <table className="w-full border-collapse border-b font-semibold table-fixed">
                <thead className="hidden md:table-header-group">
                  <tr className="text-left">
                    <th className="pl-3 2xl:pl-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Detail
                    </th>
                    <th className="pl-9 md:pl-[4.5rem] py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 md:px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Selection
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 &&
                    cart.map((item) => {
                      const product = products.find(
                        (product) => product.id === item.id
                      );
                      return (
                        <tr key={item.id} className="border-y border-slate-300">
                          <td className="px-2 md:px-5 py-3">
                            <img
                              src={product.image}
                              alt={product.title}
                              width="50"
                              className="p-1 w-24 md:w-40 h-24 md:h-40 rounded-t-lg object-contain"
                            />
                          </td>
                          <td className="md:px-5 py-3 flex flex-col md:flex-row md:min-h-48 items-center text-start">
                            <div className="md:mb-0 min-w-full text-sm md:text-lg">
                              {product.title.substring(0, 25)}...
                            </div>
                            <div className="block md:hidden items-center justify-center mt-3 md:mt-0 w-full space-x-2">
                              <button
                                className="bg-green-500 px-3 md:px-3 pb-1 rounded-lg text-white text-2xl hover:bg-green-400 transition ease-in-out"
                                onClick={() => handleIncrementQty(item.id)}>
                                +
                              </button>
                              <span className="font-semibold text-lg md:text-xl">
                                {item.qty}
                              </span>
                              <button
                                className="bg-green-500 px-3 md:px-3 pb-1 rounded-lg text-white text-2xl hover:bg-green-400 transition ease-in-out"
                                onClick={() => handleDecrementQty(item.id)}>
                                -
                              </button>
                            </div>
                          </td>
                          <td className="hidden md:table-cell space-x-3 px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              className="bg-green-500 px-2 md:px-3 pb-1 rounded-lg text-white text-2xl hover:bg-green-400 transition ease-in-out"
                              onClick={() => handleIncrementQty(item.id)}>
                              +
                            </button>
                            <span className="font-semibold text-lg md:text-xl">
                              {item.qty}
                            </span>
                            <button
                              className="bg-green-500 px-2 md:px-3 pb-1 rounded-lg text-white text-2xl hover:bg-green-400 transition ease-in-out"
                              onClick={() => handleDecrementQty(item.id)}>
                              -
                            </button>
                          </td>
                          <td className="px-6 md:px-10 py-3">
                            {(product.price * item.qty).toLocaleString(
                              "en-US",
                              {
                                style: "currency",
                                currency: "USD",
                              }
                            )}
                          </td>
                          <td>
                            <button
                              className="bg-green-500 px-2 py-1 text-white rounded-md hover:bg-green-400 transition-colors ease-in-out"
                              onClick={() => handleRemoveProduct(item.id)}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center gap-3">
                <FaShoppingCart className="text-4xl" />
                <p className="text-lg md:text-2xl font-bold font-serif">
                  Your shopping cart is empty
                </p>
                <p className="text-sm md:text-lg text-gray-400 font-bold">
                  Come on, add your favorite products here
                </p>
                <button
                  className="text-xs md:text-sm text-white bg-green-500 h-8 w-32 md:h-10 md:w-auto px-4 md:px-8 font-bold rounded-md hover:bg-green-400 hover:shadow-lg transition duration-100 ease-in-out"
                  onClick={handleClick}>
                  Start Shopping
                </button>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <Link
              to="/products"
              className="flex items-center py-5 ml-5 text-slate-500 hover:text-slate-700 font-semibold text-sm md:text-lg transition-colors">
              <MdArrowBackIos />
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="w-full xl:w-2/4 flex flex-col items-start gap-3">
          <div className="flex mx-4 flex-col gap-3">
            <p className="text-xl md:text-2xl font-bold text-green-500 py-5">
              Order Summary
            </p>
            <p className="mb-2 text-lg font-bold text-gray-900">Transaction</p>
          </div>
          <div className="w-full px-4 mt-2 flex flex-col md:justify-between gap-3">
            <div className="flex flex-col">
              <label htmlFor="shippingMethod" className="text-lg font-medium">
                Select delivery:
              </label>
              <select
                id="shippingMethod"
                name="shippingMethod"
                className="text-lg p-2 mt-2 w-full border-2 rounded-md"
                value={selectDelivery}
                onChange={handleDeliveryChange}>
                <option value="free">Free Shipping - Free</option>
                <option value="standard">Standard Shipping - $2.00</option>
                <option value="express">Express Shipping - $5.00</option>
                <option value="next">Next Day Delivery - $8.00</option>
                <option value="same">Same Day Delivery - $10.00</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="promoCode" className="text-lg font-medium">
                Promo code:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="promoCode"
                  name="promoCode"
                  className="text-lg p-2 mt-2 w-full border-2 rounded-md"
                  value={promoCode}
                  onChange={handlePromoCodeChange}
                  placeholder="Enter promo code"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      applyPromoCode();
                    }
                  }}
                />
                <button
                  onClick={applyPromoCode}
                  className="bg-green-500 text-white px-6 py-2 mt-2 rounded-md hover:bg-green-400 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 mt-2">
            <h3 className="mb-2 text-lg font-bold text-gray-900">Payment</h3>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-5 pb-5">
                <div className="flex justify-between gap-5">
                  <input
                    type="radio"
                    id="bca"
                    name="paymentMethod"
                    value="bca"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="bca"
                    className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-slate-100 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-slate-300">
                    <div className="flex">
                      <Bca></Bca>
                      <h4 className="flex items-center ml-2 text-xs">
                        BANK CENTRAL ASIA
                      </h4>
                    </div>
                  </label>

                  <input
                    type="radio"
                    id="mandiri"
                    name="paymentMethod"
                    value="mandiri"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="mandiri"
                    className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-slate-100 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-slate-300">
                    <div className="flex">
                      <Mandiri></Mandiri>
                      <h4 className="flex items-center ml-2 text-xs">
                        BANK MANDIRI
                      </h4>
                    </div>
                  </label>
                </div>

                <div className="flex justify-between gap-5">
                  <input
                    type="radio"
                    id="bri"
                    name="paymentMethod"
                    value="bri"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="bri"
                    className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-slate-100 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-slate-300">
                    <div className="flex">
                      <BRI></BRI>
                      <h4 className="flex items-center ml-2 text-xs">
                        BANK RAKYAT INDONESIA
                      </h4>
                    </div>
                  </label>

                  <input
                    type="radio"
                    id="bni"
                    name="paymentMethod"
                    value="bni"
                    className="hidden peer"
                    required
                  />
                  <label
                    htmlFor="bni"
                    className="inline-flex items-center justify-between w-full py-1 px-2 text-gray-500 bg-slate-100 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-slate-300">
                    <div className="flex">
                      <BNI></BNI>
                      <h4 className="flex items-center ml-2 text-xs">
                        BANK NEGARA INDONESIA
                      </h4>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 mt-2 flex justify-between">
            <p className="text-lg font-bold">Total price</p>
            <p className="text-lg font-bold">
              {totalCost.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="w-full px-4 mt-2 mb-10 flex justify-between">
            <Button
              classname="w-full bg-green-500 text-lg text-white"
              onClick={handleOpenModal}>
              Confirm Payment
            </Button>

            {/* Modal Konfirmasi Pembayaran  */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Payment Confirmation"
              ariaHideApp={false}
              className="modal-class text-center flex flex-col items-center justify-center"
              overlayClassName="modal-overlay">
              <h2 className="text-xl font-bold mb-2">Payment Confirmation</h2>
              <p className="mb-4">
                Are you sure you want to confirm the payment?
              </p>
              <img
                src="/images/money.gif"
                alt="image pop-up"
                className="w-40 h-auto mb-4"
              />
              <p className="text-lg font-semibold">Virtual Account: {virtualAccount}</p>
              <div className="flex w-full justify-end mt-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white w-full px-4 py-2 rounded mr-2">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmPayment}
                  className="bg-green-500 text-white w-full px-4 py-2 rounded">
                  Confirm
                </button>
              </div>
            </Modal>

            {/* Modal Payment Success */}
            <Modal
              isOpen={isSuccessModalOpen}
              onRequestClose={handleCloseSuccessModal}
              contentLabel="Payment Success"
              ariaHideApp={false}
              className="modal-class text-center flex flex-col items-center justify-center"
              overlayClassName="modal-overlay">
              <h2 className="text-xl font-bold mb-2">Payment Success</h2>
              <p className="mb-4">
                Your payment has been successfully processed!
              </p>
              <img
                src="/images/animasi.gif"
                alt="Payment Success"
                className="w-60 h-auto mb-4"
              />
              <button
                onClick={handleCloseSuccessModal}
                className="bg-green-500 text-white w-full px-4 py-2 rounded">
                Close
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
