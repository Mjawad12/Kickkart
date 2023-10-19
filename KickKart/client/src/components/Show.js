import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
export default function Show(props) {
  const animateimg = useRef("");
  const animatetext = useRef("");
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
    const observer2 = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
          el.target.classList.add("transform-left-out");
        } else {
          el.target.classList.remove("fade-out");
          el.target.classList.remove("transform-left-out");
        }
      });
    });
    observer2.observe(animatetext.current);
    observer.observe(animateimg.current);
  }, []);

  const handlego = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section className="show">
      <div className="container">
        <div className="mainDiv | even-columns opposite-columns ">
          <img
            ref={animateimg}
            src={props.pic}
            alt=""
            className="showImg fade-in"
          ></img>
          <div
            ref={animatetext}
            className="textDiv | even-columns opposite-columns fade-in transform-left-in "
          >
            <h2 className="primary-heading color-black">{props.h2}</h2>
            <p>{props.text}</p>
            <button className="button">
              <Link to="/Product" onClick={handlego}>
                Shop Now
              </Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
