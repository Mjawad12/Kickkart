import React, { useEffect, useState, useContext,  } from "react";
import Context from "./context/Context";
import ProductCard from "./ProductCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function Suggestions() {
  const context = useContext(Context);
  const {  Clickedshoe, allShoes } = context;
  const [suggestions, setsuggstions] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    let k = [];
    allShoes.map((el) => {
      for (let i in Clickedshoe.type) {
        if (el.type.includes(Clickedshoe.type[i])) {
          if (el._id !== Clickedshoe._id) {
            if (!k.includes(el)) k = k.concat(el);
          }
        }
      }
      setsuggstions(k);
    });
  }, [allShoes]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  };
  return (
    <>
      <div className="container suggestions padding-block-700">
        <h2 className="primary-heading color-black">
          {" "}
          You Might Also Likes :{" "}
        </h2>
      </div>
      <Carousel
        sliderclassName="Slider"
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true}
        infinite={false}
        autoPlay={false}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="transform 0.7s ease-in-out"
        transitionDuration={500}
        containerclassName="carousel-container"
        dotListclassName="custom-dot-list-style"
        itemclassName="carousel-item-padding-40-px"
      >
        {suggestions &&
          suggestions.slice(0, 20).map((Shoe, index) => {
            return (
              <div style={{ paddingInline: "1rem" }} className="even-columns">
                <ProductCard
                  Shoe={Shoe}
                  key={index}
                  name={Shoe.name}
                  image={Shoe.image}
                  rate={Shoe.rate}
                  brand={Shoe.brand}
                  sale={Shoe.sale}
                  salePrice={Shoe.salePrice}
                ></ProductCard>
              </div>
            );
          })}
      </Carousel>
    </>
  );
}
