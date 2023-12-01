import React, { useEffect, useRef } from "react";
import bimg from "../images/styled.webp";
import { useNavigate } from "react-router-dom";
export default function BottomStyler() {
  const navigate = useNavigate();
  const BottomStyler = useRef("");
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
          el.target.classList.add("transform-bottom-out");
        } else {
          el.target.classList.remove("fade-out");
          el.target.classList.remove("transform-bottom-out");
        }
      });
    });
    observer.observe(BottomStyler.current);
  }, []);
  const handleClick = (e) => {
    window.scrollTo(0, 0);
    navigate(`/Product`);
  };

  return (
    <div
      ref={BottomStyler}
      className="BottomStyler | even-columns fade-in  transform-bottom-in"
    >
      <div className="BottomStylerText |  even-columns opposite-columns">
        <h2 className="primary-heading">NEW COLLECTION</h2>
        <h3 className="primary-heading">SNEAKERS OF THE WEEK</h3>
        <button onClick={handleClick} className="button">
          Shop Now
        </button>
      </div>

      <img src={bimg} alt=""></img>
    </div>
  );
}
