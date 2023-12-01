import React, { useContext, useEffect, useRef, useState } from "react";
import Collectioncard from "./Collectioncard";
import Context from "./context/Context";
import shoe from "../images/Separator.webp";

export default function NewCollections() {
  const collection = useRef("");
  const scrollB = useRef("");
  const scrollW = useRef("");
  const scrollK = useRef("");
  const newcollectiontext = useRef("");
  const newcollectionmen = useRef("");
  const newcollectionwomen = useRef("");
  const newcollectionkid = useRef("");
  const context = useContext(Context);
  const [sliderSlide, setsliderSlide] = useState(0);
  const [sliderSlidew, setsliderSlidew] = useState(0);
  const [sliderSlidek, setsliderSlidek] = useState(0);
  const { menshoes, shoes, Women_Shoes, womenshoes, kidsshoes, Kids_Shoes } =
    context;

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
    document.querySelectorAll(".collectionDiv").forEach((el) => {
      observer.observe(el);
    });
    observer.observe(newcollectiontext.current);
    observer.observe(newcollectionmen.current);
    observer.observe(newcollectionwomen.current);
    observer.observe(newcollectionkid.current);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("transform-out");
        } else {
          el.target.classList.remove("transform-out");
        }
      });
    });
    document.querySelectorAll(".collectionDiv").forEach((el) => {
      observer.observe(el);
    });
  }, []);

  useEffect(() => {
    menshoes();
    womenshoes();
    kidsshoes();
  }, []);
  useEffect(() => {
    scrollB.current.scroll(sliderSlide, 0);
  }, [sliderSlide]);
  useEffect(() => {
    scrollW.current.scroll(sliderSlidew, 0);
  }, [sliderSlidew]);
  useEffect(() => {
    scrollK.current.scroll(sliderSlidek, 0);
  }, [sliderSlidek]);
  const handleslider = (e) => {
    if (e.target.id === "next") {
      setsliderSlide(sliderSlide + 1500);
    } else if (e.target.id === "previous") {
      if (sliderSlide !== 0) {
        setsliderSlide(sliderSlide - 1500);
      } else {
        scrollB.current.scroll(0, 0);
      }
    }
    if (e.target.id === "nextWomen") {
      setsliderSlidew(sliderSlidew + 1500);
    } else if (e.target.id === "previousWomen") {
      if (sliderSlidew !== 0) {
        setsliderSlidew(sliderSlidew - 1500);
      } else {
        scrollW.current.scroll(0, 0);
      }
    }
    if (e.target.id === "nextkids") {
      setsliderSlidek(sliderSlidek + 1500);
    } else if (e.target.id === "previouskids") {
      if (sliderSlidek !== 0) {
        setsliderSlidek(sliderSlidek - 1500);
      } else {
        scrollK.current.scroll(0, 0);
      }
    }
  };

  return (
    <>
      <section
        ref={collection}
        className="newCollection even-columns opposite-columns text-centre "
      >
        <h2
          ref={newcollectiontext}
          className="primary-heading fs-800 color-black fade-in"
        >
          New Collection <img className="iconSho" src={shoe} alt=""></img>
          <hr />
        </h2>
        <div className="collectionDivWrapper | even-columns opposite-columns padding-block-900 ">
          <h2
            ref={newcollectionmen}
            className="primary-heading color-black fs-500 fade-in"
          >
            Men New
          </h2>
          <div className="wrapper | even-columns">
            <i
              id="previous"
              onClick={handleslider}
              className="fa-solid fa-arrow-left fs-500"
            ></i>
            <div ref={scrollB} className="slider_wrapper">
              <div className="collectionDiv |  transform-in fade-in even-columns padding-block-700">
                {shoes &&
                  shoes.slice(0, 9).map((collect, i) => {
                    return (
                      <Collectioncard
                        key={collect._id}
                        id={collect._id}
                        image={collect.image}
                        rate={collect.rate}
                        name={collect.name}
                        brand={collect.brand}
                      ></Collectioncard>
                    );
                  })}
              </div>
            </div>
            <i
              id="next"
              onClick={handleslider}
              className="fa-solid fa-arrow-right fs-500"
            ></i>
          </div>
          <h2
            ref={newcollectionwomen}
            className="primary-heading color-black fs-500 fade-in"
          >
            Women New
          </h2>
          <div className="wrapper | even-columns">
            <i
              id="previousWomen"
              onClick={handleslider}
              className="fa-solid fa-arrow-left fs-500"
            ></i>
            <div ref={scrollW} className="slider_wrapper">
              <div className="collectionDiv |  transform-in fade-in even-columns padding-block-700">
                {Women_Shoes &&
                  Women_Shoes.slice(0, 9).map((collect) => {
                    return (
                      <Collectioncard
                        key={collect._id}
                        id={collect._id}
                        image={collect.image}
                        rate={collect.rate}
                        name={collect.name}
                        brand={collect.brand}
                      ></Collectioncard>
                    );
                  })}
              </div>
            </div>
            <i
              id="nextWomen"
              onClick={handleslider}
              className="fa-solid fa-arrow-right fs-500"
            ></i>
          </div>

          <h2
            ref={newcollectionkid}
            className="primary-heading color-black fs-500 fade-in"
          >
            Kids New
          </h2>
          <div className="wrapper | even-columns">
            <i
              id="previouskids"
              onClick={handleslider}
              className="fa-solid fa-arrow-left fs-500"
            ></i>
            <div ref={scrollK} className="slider_wrapper">
              <div className="collectionDiv |  transform-in fade-in even-columns padding-block-700">
                {Kids_Shoes &&
                  Kids_Shoes.slice(0, 9).map((collect) => {
                    return (
                      <Collectioncard
                        key={collect._id}
                        id={collect._id}
                        image={collect.image}
                        rate={collect.rate}
                        name={collect.name}
                        brand={collect.brand}
                      ></Collectioncard>
                    );
                  })}
              </div>
            </div>
            <i
              id="nextkids"
              onClick={handleslider}
              className="fa-solid fa-arrow-right fs-500"
            ></i>
          </div>
        </div>
      </section>
    </>
  );
}
