import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import React, { useState, useEffect } from "react";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import hero5 from "../assets/hero5.webp";

const carouselImages = [hero1, hero2, hero3, hero4, hero5];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCarouselChange = (direction) => {
    if (direction === "prev") {
      setCurrentIndex(
        currentIndex === 0 ? carouselImages.length - 1 : currentIndex - 1
      );
    } else {
      setCurrentIndex(
        currentIndex === carouselImages.length - 1 ? 0 : currentIndex + 1
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleCarouselChange("next");
    }, 5000); // Chuyển carousel sau mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [currentIndex]);

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
          We’re changing the way people shop.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          We're revolutionizing the shopping experience for furniture
          enthusiasts. We bring the best designs to your doorstep. Discover
          unique pieces that inspire. Shop now and elevate your living space.
        </p>
        <div className="mt-10 ">
          <Link to="products" className="btn btn-primary ">
            Our Products
          </Link>
        </div>
      </div>
      <Carousel images={carouselImages} />
    </div>
  );
};
export default Hero;
