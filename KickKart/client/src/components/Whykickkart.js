import React, { useEffect, useRef } from "react";

export default function Whykickkart() {
  const devref = useRef("");
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
    document.querySelectorAll(".whyCard").forEach((el) => {
      observer.observe(el);
      observer.observe(devref.current);
    });
  });
  return (
    <>
      <div className="container">
        <section className="whyKick | padding-block-900"></section>
        <div className="whyDiv even-columns opposite-columns">
          <div
            ref={devref}
            className="whyDivText | even-columns opposite-columns fade-in"
          >
            <h2 className="primary-heading">
              Why <span>Kick</span> Kart ?
              <hr />
            </h2>
            <h3 className="text text-centre">
              At KickKart, we believe that your journey deserves the perfect
              step. Here's why KickKart shoes stand out:
            </h3>
          </div>
          <div className="whyCarddiv even-columns padding-block-700 text-centre">
            <div className="whyCard | even-columns opposite-columns fade-in">
              <div className="whycardimgWrapper even-columns opposite-columns ">
                <div className="whyCardImg | even-columns opposite-columns ">
                  <i className="fa-solid fa-earth-americas"></i>
                  <i className="fa-solid fa-earth-americas"></i>
                </div>
              </div>
              <h4 className="primary-heading ">Free Shipping</h4>
              <p>Free Shipping On first five Orders.</p>
            </div>
            <div className="whyCard | even-columns opposite-columns fade-in">
              <div className="whycardimgWrapper even-columns opposite-columns ">
                <div className="whyCardImg | even-columns opposite-columns ">
                  <i className="fa-regular fa-clock"></i>
                  <i className="fa-regular fa-clock"></i>
                </div>
              </div>
              <h4 className="primary-heading ">Support 24/7</h4>
              <p>We Support 24 Hours A Day.</p>
            </div>
            <div className="whyCard | even-columns opposite-columns fade-in">
              <div className="whycardimgWrapper even-columns opposite-columns ">
                <div className="whyCardImg | even-columns opposite-columns ">
                  <i className="fa-regular fa-circle-check"></i>
                  <i className="fa-regular fa-circle-check"></i>
                </div>
              </div>
              <h4 className="primary-heading ">Payment Method</h4>
              <p>Payment 100% Secure.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
