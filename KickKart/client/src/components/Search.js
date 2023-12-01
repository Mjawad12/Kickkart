import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../images/Kickkart logo.webp";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Context from "./context/Context";
import ProductCard from "./ProductCard";
export default function Search() {
  const [SerachWord, setSerachWord] = useState("");
  const [SerachResults, setSerachResults] = useState([]);
  const [Loading, setLoading] = useState("false");
  const search = useRef("");
  const context = useContext(Context);
  const { allShoes, Allshoes, page, setpage } = context;

  useEffect(() => {
    if (page === "sale") {
      Allshoes();
      setpage("all");
    } else {
      if (allShoes.length !== 0) {
        return;
      } else {
        Allshoes();
      }
    }
  }, []);

  const handleChange = () => {
    setLoading("true");
    let SerachWord = search.current.value;

    SerachWord = SerachWord.split(" ");
    let shoes = [];

    for (let i in SerachWord) {
      allShoes &&
        allShoes.map((el) => {
          if (el.name.toLowerCase().includes(SerachWord[i].toLowerCase())) {
            if (!shoes.includes(el)) shoes = shoes.concat(el);
          }
        });
      if (shoes.length < 5) {
        allShoes &&
          allShoes.map((el) => {
            if (el.brand.includes(SerachWord[i].toLowerCase())) {
              if (!shoes.includes(el)) shoes = shoes.concat(el);
            }
          });
      }
      if (shoes.length < 5) {
        allShoes &&
          allShoes.map((el) => {
            if (el.color.includes(SerachWord[i].toLowerCase())) {
              if (!shoes.includes(el)) shoes = shoes.concat(el);
            }
          });
      }
    }

    setSerachResults(shoes);
    setLoading("false");
  };
  const handleCancel = () => {
    const searchWindow = document.querySelector(".searchWindow");
    searchWindow.classList.remove("heightFull");
    setTimeout(() => {
      searchWindow.classList.add("display-none");
      setSerachResults([]);
      search.current.value = "";
    }, 1000);
  };
  return (
    <div className="searchWindow | even-columns opposite-columns ">
      <div className="search_nav nav |  even-columns">
        <Link className="Mainlogo" to="/">
          <div className="Mainlogo | even-columns">
            <img src={logo} alt=""></img>
          </div>
        </Link>
        <div className="SerchBar |  even-columns">
          <i className="fa-solid fa-search"></i>
          <input
            onChange={handleChange}
            ref={search}
            type="text"
            placeholder="Search"
          ></input>
        </div>
        <button onClick={handleCancel}>Cancel</button>
      </div>
      {Loading === "true" && <Loader></Loader>}
      <div className="SearchRepresentation">
        {SerachResults &&
          SerachResults.slice(0, 5).map((result) => {
            return (
              <ProductCard
                Shoe={result}
                key={result}
                name={result.name}
                image={result.image}
                rate={result.rate}
                brand={result.brand}
                sale={result.sale}
                salePrice={result.salePrice}
              ></ProductCard>
            );
          })}
      </div>
    </div>
  );
}
