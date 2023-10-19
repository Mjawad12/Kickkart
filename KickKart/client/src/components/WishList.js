import React, { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import Alert from "./Alert";
import Member from "./Member";
import Footer from "./Footer";
export default function WishList() {
  // Refs
  const itemRef = useRef("");
  //   State
  const [WishListShoes, ] = useState(
    JSON.parse(localStorage.getItem("Wi"))
  );
  const [alert, setalert] = useState("false");
  const [emptyState, setemptyState] = useState("false");
  const [shoesLength, setshoesLength] = useState(0);
  useEffect(() => {
    if (WishListShoes === null || WishListShoes.length === 0) {
      return setemptyState("true");
    }
    setshoesLength(WishListShoes.length);
  }, [WishListShoes]);

  useEffect(() => {
    if (shoesLength <= 0) {
      setemptyState("true");
    } else {
      setemptyState("false");
    }
  }, [shoesLength]);

  //  Animation
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
          el.target.classList.add("transform-right-out");
        } else {
          el.target.classList.remove("fade-out");
          el.target.classList.remove("transform-right-out");
        }
      });
    });
    document.querySelectorAll(".wrapperWishListItem").forEach((it) => {
      observer.observe(it);
    });
  }, []);

  return (
    <>
      {alert === "true1" && <Alert message="Shoe Added to Cart"></Alert>}
      {alert === "true2" && <Alert message="Item Already in Cart"></Alert>}
      <Banner></Banner>
      <section className="Wish_List | padding-block-900 ">
        <div className=" WishList | even-columns opposite-columns ">
          <div className="header | even-columns">
            <h1 className="primary-heading color-black">
              My Wish List<i className="fa-solid fa-heart"></i>
            </h1>
            <div className="even-columns">
              {emptyState === "true" ? (
                <p className="text">0</p>
              ) : (
                <p className="text">{shoesLength}</p>
              )}
              <p className="text">Items</p>
            </div>
          </div>
          <div className="WishListItems | even-columns opposite-columns">
            {emptyState === "true" && (
              <h3 className="primary-heading color-black">
                Your Wishlist is Empty
              </h3>
            )}

            {WishListShoes &&
              WishListShoes.map((el) => {
                const handleDelete = (e) => {
                  setshoesLength(shoesLength - 1);
                  let k = [];
                  let wil = JSON.parse(localStorage.getItem("Wi"));
                  wil.map((it) => {
                    if (it.image !== el.image) {
                      if (!k.includes(it)) k = k.concat(it);
                    }
                  });
                  const element =
                    e.target.parentElement.parentElement.parentElement;
                  element.classList.remove("transform-right-out");

                  setTimeout(() => {
                    element.classList.add("display-none");
                  }, 1000);
                  localStorage.setItem("Wi", JSON.stringify(k));
                };
                const Addtocart = () => {
                  let state = "true";
                  let Ci = JSON.parse(localStorage.getItem("Ci"));

                  if (Ci !== null) {
                    Ci.map((it) => {
                      if (it.image === el.image) {
                        state = "false";
                        setalert("true2");
                        setTimeout(() => {
                          setalert("false");
                        }, 3000);
                        return;
                      }
                    });
                    if (state === "true") {
                      Ci = Ci.concat(el);
                      localStorage.setItem("Ci", JSON.stringify(Ci));
                      setalert("true1");
                      setTimeout(() => {
                        setalert("false");
                      }, 3000);
                    }
                  } else {
                    localStorage.setItem("Ci", JSON.stringify([el]));
                    setalert("true1");
                    setTimeout(() => {
                      setalert("false");
                    }, 3000);
                  }
                };
                return (
                  <div
                    ref={itemRef}
                    style={{ width: "100%" }}
                    className="wrapperWishListItem fade-in transform-right-in"
                  >
                    <div className="WishListItem | even-columns ">
                      {el.brand === "adidas" ? (
                        <img
                          style={{ transform: "ScaleX(-1)" }}
                          src={el.image}
                          alt="shoes"
                        ></img>
                      ) : (
                        <img src={el.image} alt="shoes"></img>
                      )}

                      <div className="WItext  | even-columns opposite-columns">
                        <h3 className="primary-heading">{el.name}</h3>
                        <div className="even-columns">
                          <p>SIZE : </p> <span> {el.size}</span>
                        </div>
                        <div className="even-columns">
                          <p>PRICE : </p> <span> ${el.rate}</span>
                        </div>
                        <div className="even-columns">
                          <p>SALE PRICE : </p> <span> ${el.salePrice}</span>
                        </div>
                        <i
                          onClick={handleDelete}
                          className="fa-solid fa-trash"
                        ></i>
                        <button onClick={Addtocart}>
                          Add to Cart
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <Member></Member>
      <Footer></Footer>
    </>
  );
}
