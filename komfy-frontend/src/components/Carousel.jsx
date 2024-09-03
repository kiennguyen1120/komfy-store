import React, { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hàm chuyển carousel
  const handleCarouselChange = (direction) => {
    if (direction === "prev") {
      setCurrentIndex(
        currentIndex === 0 ? images.length - 1 : currentIndex - 1
      );
    } else {
      setCurrentIndex(
        currentIndex === images.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  // Sử dụng useEffect để tự động chuyển carousel sau một khoảng thời gian nhất định
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       handleCarouselChange("next");
  //     }, 5000); // Chuyển carousel sau mỗi 5 giây

  //     return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  //   }, [currentIndex]);

  return (
    <div className="carousel w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item relative w-full ${
            index === currentIndex ? "block" : "hidden"
          }`}
        >
          <img src={image} className="w-full rounded-xl" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              className="btn btn-circle"
              onClick={() => handleCarouselChange("prev")}
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() => handleCarouselChange("next")}
            >
              ❯
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
