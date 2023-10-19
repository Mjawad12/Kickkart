import React, { useEffect, useRef } from "react";
import Men from "../images/Categories/men.webp";
import Women from "../images/Categories/women.webp";
import Kids from "../images/Categories/kids.webp";
import { useNavigate } from "react-router-dom";
export default function Category() {
  const navigate = useNavigate();
  const card = useRef("");
  const card2 = useRef("");
  const card3 = useRef("");
  const categoryh2 = useRef("");
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("Card_animate");
        } else {
          entry.target.classList.remove("Card_animate");
        }
      });
    });
    observer.observe(card.current);
    observer.observe(card2.current);
    observer.observe(card3.current);
    observer.observe(categoryh2.current);
  }, []);

  const handleClick = (e) => {
    window.scrollTo(0, 0);
    navigate(`/${e.target.id}`);
  };

  return (
    <div>
      <section className="Categories | even-columns opposite-columns padding-block-700">
        <h2
          ref={categoryh2}
          className="primary-heading fs-800 color-black h2_animate_in"
        >
          Shop by Category
          <hr />
        </h2>

        <div className="Categories_div | even-columns ">
          <div ref={card} className="Category_card_wrapper even-columns">
            <div className="Men | Category_card even-columns">
              <img src={Men} alt=""></img>
              <button
                onClick={handleClick}
                id="men"
                className="button | card-btn"
              >
                Men
              </button>
            </div>
          </div>
          <div ref={card2} className="Category_card_wrapper even-columns">
            <div className="Women | Category_card even-columns">
              <img src={Women} alt=""></img>
              <button
                onClick={handleClick}
                id="women"
                className="button | card-btn"
              >
                Women
              </button>
            </div>
          </div>
          <div ref={card3} className="Category_card_wrapper even-columns">
            <div className="Kids | Category_card even-columns">
              <img src={Kids} alt=""></img>
              <button
                onClick={handleClick}
                id="kids"
                className="button | card-btn"
              >
                Kids
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
