import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export default function Banner() {
  const [banner, setbanner] = useState("0");
  const b1 = useRef("");
  const b2 = useRef("");
  const b3 = useRef("");
  const next = useRef("");
  const prev = useRef("");

  const nextBanner = (e) => {
    if (banner === "0") {
      setbanner("1");
      if (b1.current.classList.contains("fade-in")) {
        b1.current.classList.remove("fade-out");
      } else {
        b1.current.classList.add("fade-in");
      }
      setTimeout(() => {
        b1.current.classList.add("display-none");
        b2.current.classList.remove("display-none");
      }, 900);
      setTimeout(() => {
        b2.current.classList.add("fade-out");
      }, 1000);
    } else if (banner === "1") {
      setbanner("2");
      b2.current.classList.remove("fade-out");
      setTimeout(() => {
        b2.current.classList.add("display-none");
        b3.current.classList.remove("display-none");
      }, 900);
      setTimeout(() => {
        b3.current.classList.add("fade-out");
      }, 1000);
    }
  };
  const previousBanner = () => {
    if (banner === "2") {
      setbanner("1");
      b3.current.classList.remove("fade-out");
      setTimeout(() => {
        b3.current.classList.add("display-none");
        b2.current.classList.remove("display-none");
      }, 900);
      setTimeout(() => {
        b2.current.classList.add("fade-out");
      }, 1000);
    } else if (banner === "1") {
      setbanner("0");
      b2.current.classList.remove("fade-out");
      setTimeout(() => {
        b2.current.classList.add("display-none");
        b1.current.classList.remove("display-none");
      }, 900);
      setTimeout(() => {
        b1.current.classList.add("fade-out");
      }, 1000);
    }
  };
  return (
    <>
      <div className="banner">
        <div className="banner_wrapper | even-columns">
          <i
            ref={prev}
            onClick={previousBanner}
            className="fa-solid fa-arrow-left"
          ></i>
          <div className="bannerDiv | even-columns">
            <div ref={b1} className="bn | even-columns">
              <p>MEMBERS: FREE SHIPPING ON ORDERS $50+</p>
              <Link to="/login">Join Now</Link>
            </div>
            <div ref={b2} className="bn | fade-in even-columns display-none">
              <p>LAST CHANCE SALE: UP TO 65% OFF</p>
              <Link to="/Product">Shop Now</Link>
            </div>
            <div ref={b3} className="bn | fade-in even-columns display-none">
              <p>NEW ARRIVALS 🍂</p>
              <Link to="/Product">Shop All</Link>
            </div>
          </div>
          <i
            ref={next}
            id="next"
            onClick={nextBanner}
            className="fa-solid fa-arrow-right"
          ></i>
        </div>
      </div>
    </>
  );
}
