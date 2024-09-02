import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-center rounded-lg md:m-2 max-w-[47%] md:max-w-[228px] border-gray-200 shadow-xl hover:shadow-2xl border-2 hover:border-gray-300 transition duration-300 ease-in-out bg-white">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image, id } = props;
  return (
    <Link to={`/products/${id}`}>
      <img
        src={image}
        alt="products"
        className="py-5 md:p-5 rounded-t-lg w-full h-40 md:h-60 object-contain"
      />
    </Link>
  );
};

const Body = (props) => {
  const { children, name } = props;
  return (
    <div className="px-3 md:px-5 pb-3 h-full ">
      <a href="#">
        <h5 className={`text-base md:text-xl font-bold md:tracking-tight mb-2`}>
          {name.substring(0, 20)}...
        </h5>
        <p className="text-sm md:text-lg mt-3">
          {children.substring(0, 75)}...
        </p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { price, id } = props;
  const handleAddToCart = () => {
    dispatch(addToCart({ id, qty: 1 }));
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-around pt-2 pb-5 md:py-6">
      <span className="font-bold text-sm md:text-xl">
        ${" "}
        {price.toLocaleString("en-US", { styles: "currency", currency: "USD" })}
      </span>
      <button
        className="text-xs bg-green-500 text-white md:text-sm md:h-10 md:w-auto h-8 w-30 px-4 md:px-8 font-bold rounded-md md:rounded-lg hover:bg-green-400 hover:shadow-lg transition duration-100 ease-in-out"
        onClick={handleAddToCart}>
        Add To Cart
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Success Pop-up"
        className="modal"
        overlayClassName="modal-overlay border-4 border-slate-500 shadow-3xl">
        <div className="flex flex-col items-center p-6 bg-white rounded-lg">
          <img
            src="/images/verified.gif"
            alt="image pop-up"
            className="w-40 h-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-3 text-green-600">
            Item Added to Cart
          </h2>
          <p className="text-center mb-5">
            The item has been added to your cart.
          </p>
          <button
            className="mt-5 bg-green-500 text-white font-bold px-20 py-2 rounded hover:bg-green-400 transition duration-100 ease-in-out"
            onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
