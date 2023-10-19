import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function StyledComponent() {
  const navigate = useNavigate();
  const representText = useRef("");
  const imgDiv = useRef("");
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
    observer.observe(representText.current);
    observer.observe(imgDiv.current);
  }, []);
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate("/Product");
  };
  return (
    <section className="representSho | ">
      <div className="container">
        <div className="representMain |  even-columns padding-block-900">
          <div
            ref={representText}
            className="representText | even-columns opposite-columns fade-in transform-bottom-in "
          >
            <h2 className="primary-heading color-black">NEVER STOP</h2>
            <hr></hr>
            <p>PUSH THE LIMITS OF THE IMPOSSIBLE</p>
            <button onClick={handleClick} className="button">
              Buy Now
            </button>
          </div>
          <div ref={imgDiv} className="imgDiv fade-in transform-bottom-in">
            <img
              src="https://monster.themevolty.com/opencart/opc_shoes_sneakers_1001/image/cache/catalog/themevolty/singleblock/About-us-570x600.jpg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
}
