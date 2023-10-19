import React, { useContext, useState, useEffect } from "react";
import Product from "../Product";
import Banner from "../Banner";
import Filter from "../Filter";
import FiltEditor from "../FiltEditor";
import Member from "../Member";
import Footer from "../Footer";
import Context from "../context/Context";
import Whykickkart from "../Whykickkart";
export default function Productpage() {
  const context = useContext(Context);
  const { allShoes, currentShoes } = context;
  const [location, setlocation] = useState(window.location.pathname);
  const [situ, setsitu] = useState("Hide");

  useEffect(() => {
    const width = window.innerWidth;
    if (width <= 960) {
      document.querySelector(".Filter_tab").classList.remove("display-flex");
    }
    if (
      document.querySelector(".Filter_tab").classList.contains("display-flex")
    )
      setsitu("Hide");
    else setsitu("Show");
  }, []);

  const handleFilter = () => {
    window.scrollTo(0, 0);
    const filter = document.querySelector(".Filter_tab");
    if (filter.classList.contains("display-flex")) {
      setsitu("Show");
      if (window.innerWidth <= 960) document.body.classList.remove("no-scroll");
      filter.classList.remove("fade-out");
      document
        .querySelector(".Filter_tab")
        .classList.remove("transform-left-out");
      setTimeout(() => {
        filter.classList.remove("display-flex");
        filter.classList.add("display-none");
      }, 1000);
    } else {
      if (window.innerWidth <= 960) document.body.classList.add("no-scroll");
      filter.classList.add("display-flex");
      filter.classList.remove("display-none");
      setsitu("Hide");
      setTimeout(() => {
        filter.classList.add("fade-out");
        document
          .querySelector(".Filter_tab")
          .classList.add("transform-left-out");
      }, 100);
    }
  };

  return (
    <>
      <Banner></Banner>
      <FiltEditor
        length={currentShoes.length}
        handleFilter={handleFilter}
        situ={situ}
        location={location}
      ></FiltEditor>
      <div className=" productpageholder |  even-columns">
        <Filter handleFilter={handleFilter}></Filter>
        <Product></Product>
      </div>
      <Member></Member>
      <Whykickkart></Whykickkart>
      <Footer></Footer>
    </>
  );
}
