import { useEffect, useState } from "react";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/Scroll1.png",
    "/images/Scroll2.png",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto justify-center items-center py-6 w-full">
      <div className="relative h-[12rem] w-[95%] lg:w-[63%] md:h-auto flex overflow-hidden shadow-xl rounded-xl lg:mr-5">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(${currentIndex * -100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`image${index + 1}`}
              className="object-cover w-full h-full lg:bg-none"
              style={{ flex: '0 0 100%' }}
            />
          ))}
        </div>
        <button
          onClick={handlePrevClick}
          className="absolute top-1/2 transform -translate-y-1/4 left-0 flex items-center justify-center p-3 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition ease-in-out duration-300 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          className="absolute top-1/2 right-0 transform -translate-y-1/4   flex items-center justify-center p-3 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition ease-in-out duration-300 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-2 lg:bottom-4 right-[40%] lg:right-[45%] transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}></button>
          ))}
        </div>
      </div>
      <div className="hidden lg:flex w-full lg:w-[29%] h-auto flex-col gap-11">
        <img
          src="/images/Banner1.png"
          alt="banner"
          className="shadow-xl rounded-xl w-full h-auto"
        />
        <img
          src="/images/Banner2.png"
          alt="banner"
          className="shadow-xl rounded-xl w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
