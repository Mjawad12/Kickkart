import React, { useContext, useEffect, useState, useRef } from "react";
import Context from "./context/Context";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useLocation } from "react-router-dom";

export default function Product() {
  const location = useLocation();
  //  Refs
  const checker = useRef("");
  //  Context
  const context = useContext(Context);
  const { Allshoes, allShoes, currentShoes, setpage, page } = context;
  // states
  const [results, setresults] = useState(10);
  const [loading, setloading] = useState("false");
  const [ArtificailLoading, setArtificailLoading] = useState("false");

  //  getting All shoes
  useEffect(() => {
    if (location.pathname === "/Sale") {
      Allshoes();
      setpage("sale");
    } else {
      if (page === "sale") {
        Allshoes();
        setpage("all");
      } else {
        if (allShoes.length !== 0) {
          return;
        } else {
          Allshoes();
          setpage("all");
        }
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    setArtificailLoading("true");
    setTimeout(() => {
      setArtificailLoading("false");
    }, 1000);
  }, [currentShoes]);
  //  Loading Animation
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          if (results >= currentShoes.length) {
            setloading("false");
          } else {
            setloading("true");
          }
        } else {
          setloading("false");
        }
      });
    });
    setTimeout(() => {
      checker.current && observer.observe(checker.current);
    }, 2000);
    if (results >= currentShoes.length) {
      setloading("false");
    }
  }, []);
  //  Loading
  useEffect(() => {
    if (loading === "true") {
      setTimeout(() => {
        setresults(results + 10);
      }, 1000);
    } else {
      return;
    }
  }, [loading]);

  return (
    <>
      <div className="products overflow_Wrapper even-columns opposite-columns">
        {ArtificailLoading === "true" && <Loader></Loader>}
        {currentShoes &&
          currentShoes.slice(0, results).map((Shoe) => {
            return (
              <>
                <ProductCard
                  Shoe={Shoe}
                  name={Shoe.name}
                  image={Shoe.image}
                  rate={Shoe.rate}
                  brand={Shoe.brand}
                  sale={Shoe.sale}
                  salePrice={Shoe.salePrice}
                ></ProductCard>
              </>
            );
          })}
        <div className="checker" ref={checker}></div>
        {loading === "true" ? <Loader></Loader> : null}
      </div>
    </>
  );
}
