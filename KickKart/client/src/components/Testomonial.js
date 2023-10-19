import React, { useEffect, useRef } from "react";
import R1 from "../images/Reviews/avatar-ali.png";
import R2 from "../images/Reviews/avatar-anisha.png";
import R3 from "../images/Reviews/Review 4.png";
import quate from "../images/Whyicons/quate.png";

export default function Testomonial() {
  const testimon = useRef("");
  const review = useRef("");
  const review2 = useRef("");
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

    observer.observe(testimon.current);
  });
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          if (el.target.classList.contains("transform-left-in")) {
            el.target.classList.add("transform-left-out");
          } else if (el.target.classList.contains("transform-right-in")) {
            el.target.classList.add("transform-right-out");
          }
        } else {
          el.target.classList.remove("transform-left-out");
          el.target.classList.remove("transform-right-out");
        }
      });
    });
    observer.observe(review.current);
    observer.observe(review2.current);
  });
  return (
    <>
      <section className="testimonial  padding-block-700 background-primary">
        <div
          ref={testimon}
          className="testimonialMain | container | even-columns opposite-columns  color-white fade-in"
        >
          <h1 className="primary-heading ">
            WHAT OUR CLIENTS SAY ? <hr className="background-secondary" />
          </h1>
          <div className="testimonial_div | even-columns text-centre">
            <div
              ref={review}
              className="review | even-columns opposite-columns transform-left-in"
            >
              <img src={quate} alt=""></img>
              <p>
                "I'm obsessed with my KickKart sneakers! The comfort is
                unmatched, and I can't believe how stylish they are."
              </p>
              <img src={R1} className="Rimg" alt=""></img>
              <h4>Sarah M.</h4>
            </div>
            <div className="review | even-columns opposite-columns">
              <img src={quate} alt=""></img>
              <p>
                "KickKart sneakers are my new love! Comfort like never before,
                style on point, and they're surprisingly affordable. Can't get
                enough!"
              </p>
              <img src={R2} className="Rimg" alt=""></img>
              <h4>Alex H.</h4>
            </div>
            <div
              ref={review2}
              className="review | even-columns opposite-columns transform-right-in"
            >
              <img src={quate} alt=""></img>
              <p>
                "Obsessed with KickKart! Unbelievable comfort, insanely stylish,
                and the quality is unmatched. A game-changer for sure!"
              </p>
              <img src={R3} className="Rimg" alt=""></img>
              <h4 className="primary-heading">James L.</h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
