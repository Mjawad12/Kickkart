import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img from "../images/Sec1/shoes2.webp";
import img2 from "../images/Sec1/shoes 3.webp";
import img3 from "../images/Sec1/shoes 4.webp";
import img4 from "../images/Sec1/shoes 5.webp";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  //  animation
  const slider1 = useRef("1");
  const slider2 = useRef("");
  const slider3 = useRef("");
  const slider4 = useRef("");

  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
        } else {
          el.target.classList.remove("fade-out");
        }
      });
    });
    observer.observe(document.querySelector(".carousel"));
  });
  const handleClick = (e) => {
    if (e.target.id === "fir1") {
      navigate("/SelectedShoe/652e8a34b10bc9e4af7038bf");
    } else if (e.target.id === "lemonC") {
      navigate("/SelectedShoe/6513d96fc035fb74568a2e6a");
    } else if (e.target.id === "AirF") {
      navigate("/SelectedShoe/652e8d22b10bc9e4af7038e5");
    } else if (e.target.id === "gazzelS") {
      navigate("/SelectedShoe/652e9212b10bc9e4af703c47");
    }
  };

  return (
    <>
      <section className="carousel fade-in ">
        <Carousel
          sliderclassName="Slider"
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="transform 0.7s ease-in-out"
          transitionDuration={500}
          containerclassName="carousel-container"
          dotListclassName="custom-dot-list-style"
          itemclassName="carousel-item-padding-40-px"
        >
          <div>
            <div className="sec-sliders | even-columns">
              <div className="styler "></div>
              <div className="styler2"></div>
              <div className="sec-content | even-columns opposite-columns">
                <h2 className="text">$225</h2>
                <h1 className="primary-heading ">Nike Tuned 1</h1>
                <div className="rating | even-columns">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h2 className="primary-heading">
                  <span> Step into Style: </span> KickKart shoes, where fashion
                  meets comfort effortlessly.
                </h2>

                <button id="fir1" onClick={handleClick} className="button">
                  Buy Now
                </button>
              </div>

              <img className="sec-img" src={img} alt=""></img>
            </div>
          </div>
          <div>
            <div ref={slider2} className="sec-sliders | even-columns">
              <div
                style={{ backgroundColor: "yellow" }}
                className="styler"
              ></div>
              <div
                style={{ borderBottom: "255px solid yellow" }}
                className="styler2"
              ></div>
              <div className="sec-content | even-columns opposite-columns">
                <h2 className="text">$125</h2>
                <h1 className="primary-heading ">Lemon Chrome</h1>
                <div style={{ color: "red" }} className="rating | even-columns">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h2 className="primary-heading">
                  <span> Fashion Forward: </span> Comfort Driven: Experience the
                  future of footwear with KickKart.
                </h2>

                <button id="lemonC" onClick={handleClick} className="button">
                  Buy Now
                </button>
              </div>

              <img
                style={{ filter: "drop-shadow(0px -1mm 90px yellow)" }}
                className="sec-img"
                src={img2}
                alt=""
              ></img>
            </div>
          </div>
          <div>
            <div ref={slider3} className="sec-sliders | even-columns">
              <div
                style={{ backgroundColor: "purple" }}
                className="styler"
              ></div>
              <div
                style={{ borderBottom: "255px solid purple" }}
                className="styler2"
              ></div>
              <div className="sec-content | even-columns opposite-columns">
                <h2 className="text">$125</h2>
                <h1 className="primary-heading ">Air Force 1</h1>
                <div
                  style={{ color: "yellow" }}
                  className="rating | even-columns"
                >
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h2 className="primary-heading">
                  <span> Discover Your Style : </span> Embrace Comfort: KickKart
                  shoes, where your journey begins.
                </h2>

                <button id="AirF" onClick={handleClick} className="button">
                  Buy Now
                </button>
              </div>

              <img
                style={{ filter: "drop-shadow(0px -1mm 90px purple)" }}
                className="sec-img"
                src={img3}
                alt=""
              ></img>
            </div>
          </div>
          <div>
            <div ref={slider4} className="sec-sliders | even-columns">
              <div
                style={{ backgroundColor: "green" }}
                className="styler"
              ></div>
              <div
                style={{ borderBottom: "255px solid green" }}
                className="styler2"
              ></div>
              <div className="sec-content | even-columns opposite-columns">
                <h2 className="text">$100</h2>
                <h1 className="primary-heading ">GAZELLE SHOES</h1>
                <div
                  style={{ color: "yellow" }}
                  className="rating | even-columns"
                >
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h2 className="primary-heading">
                  <span> Fashioned for You: </span> KickKart shoes, a perfect
                  fit for your lifestyle and fashion desires.
                </h2>

                <button id="gazzelS" onClick={handleClick} className="button">
                  Buy Now
                </button>
              </div>

              <img
                style={{ filter: "drop-shadow(0px -3mm 100px green)" }}
                className="sec-img"
                src={img4}
                alt=""
              ></img>
            </div>
          </div>
        </Carousel>
        <div className="edge"></div>
      </section>
    </>
  );
}
