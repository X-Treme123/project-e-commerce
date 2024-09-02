import React from "react";
import Modal from "react-modal";
import BCAImage from "../Elements/icons/Bank/Bca.jsx"; // Ganti dengan path gambar BCA
import BNIImage from "../Elements/icons/Bank/BNI.jsx"; // Ganti dengan path gambar BNI
import BRIImage from "../Elements/icons/Bank/BRI.jsx"; // Ganti dengan path gambar BRI
import MandiriImage from "../Elements/icons/Bank/Mandiri.jsx"; // Ganti dengan path gambar Mandiri

const PaymentSuccessModal = ({ isOpen, onClose, paymentMethod }) => {
  const getContent = () => {
    switch (paymentMethod) {
      case "bca":
        return {
          text1: "Payment with BCA was successful!",
          image: BCAImage,
          text2: "Thank you for choosing Bank Central Asia."
        };
      case "bni":
        return {
          text1: "Payment with BNI was successful!",
          image: BNIImage,
          text2: "Thank you for choosing Bank Negara Indonesia."
        };
      case "bri":
        return {
          text1: "Payment with BRI was successful!",
          image: BRIImage,
          text2: "Thank you for choosing Bank Rakyat Indonesia."
        };
      case "mandiri":
        return {
          text1: "Payment with Mandiri was successful!",
          image: MandiriImage,
          text2: "Thank you for choosing Bank Mandiri."
        };
      default:
        return {
          text1: "Payment was successful!",
          image: null,
          text2: ""
        };
    }
  };

  const { text1, image, text2 } = getContent();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payment Confirmation"
      ariaHideApp={false}
      className="modal-class"
      overlayClassName="modal-overlay">
      <h2 className="text-xl font-bold">Payment Confirmation</h2>
      <p>{text1}</p>
      {image && <img src={image} alt="Payment Method" className="my-4" />}
      <p>{text2}</p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mr-2">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PaymentSuccessModal;
