import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import Member from "./Member";
import Footer from "./Footer";
export default function Cart() {
  // Refs
  const itemRef = useRef("");
  const QuanRef = useRef("");
  //   State
  const [CartShoes, setCartShoes] = useState(
    JSON.parse(localStorage.getItem("Ci"))
  );
  const [emptyState, setemptyState] = useState("false");
  const [subtotal, setsubtotal] = useState(0);
  const [Quantity, setQuantity] = useState(0);

  const [shoesLength, setshoesLength] = useState(0);
  useEffect(() => {
    if (CartShoes == [] || CartShoes == undefined) {
      setemptyState("true");
    } else {
      setshoesLength(CartShoes.length);
    }
  }, [CartShoes]);

  useEffect(() => {
    if (shoesLength <= 0) {
      setemptyState("true");
      setsubtotal(0);
    } else {
      setemptyState("false");
    }
  }, [shoesLength]);

  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
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
    const observer2 = new IntersectionObserver((els) => {
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
    observer.observe(document.querySelector(".leftSection"));
    observer2.observe(document.querySelector(".rightSection"));
    const items = document.querySelectorAll(".Cartitems");
    items.forEach((it) => {
      observer.observe(it);
    });
  }, []);

  const updatequnatity = () => {
    const quan = document.querySelectorAll("#quan");
    for (let i in CartShoes) {
      quan[i].value = CartShoes[i].quantity;
    }
  };
  const updateSize = () => {
    const size = document.querySelectorAll("#size");
    for (let i in CartShoes) {
      size[i].value = CartShoes[i].size;
    }
  };

  const amountCal = () => {
    const quan = document.querySelectorAll("#quan");

    let amount = 0;
    for (let i in CartShoes) {
      if (CartShoes[i].sale === "true") {
        amount = amount + quan[i].value * CartShoes[i].salePrice;
      } else {
        amount = amount + quan[i].value * CartShoes[i].rate;
      }
    }
    amount = Math.round(amount);
    setsubtotal(amount);
  };

  useEffect(() => {
    setTimeout(() => {
      updatequnatity();
      updateSize();
      amountCal();
    }, 1000);
  }, []);

  return (
    <>
      <Banner></Banner>
      <div className="overflow_Wrapper">

      <div className="container">
        <h1
          style={{ paddingTop: "1rem" }}
          className="primary-heading color-black"
        >
          MY SHOPPING CART ({shoesLength})
        </h1>
        <div className="cartSec2 | even-columns ">
          <div className="leftSection | even-columns opposite-columns  fade-in transform-left-in">
            <div className="CartBanner | even-columns opposite-columns">
              <h3>Members get free shipping on All orders </h3>
              <p>
                Become a Nike Member for fast free shipping{" "}
                <Link to={"/signup"}>Join us</Link> or{" "}
                <Link to={"/signin"}>Sign-in</Link>
              </p>
            </div>
            <div className="CartBanner2 | even-columns opposite-columns">
              <h3>The Ultimate Sale: Up to 60% Off</h3>
              <p>Use code ULTIMATE to save 20% on select styles. Ends 10.15.</p>
            </div>

            {emptyState === "true" && (
              <>
                <h3>Your Cart is Empty !</h3>
                <Link to={"/Product"}>
                  <button className="button"> Shop Now</button>
                </Link>
              </>
            )}

            {CartShoes &&
              CartShoes.map((el) => {
                const handleDelete = (e) => {
                  setshoesLength(shoesLength - 1);
                  let k = [];
                  let items = JSON.parse(localStorage.getItem("Ci"));
                  items &&
                  items.map((it) => {
                    if (it.image != el.image) {
                      if (!k.includes(el)) k = k.concat(it);
                      }
                    });
                  const element =
                    e.target.parentElement.parentElement.parentElement;
                  element.classList.remove("transform-left-out");
                  setTimeout(() => {
                    element.classList.add("display-none");
                  }, 1000);
                  localStorage.setItem("Ci", JSON.stringify(k));
                  setTimeout(() => {
                    amountCal();
                  }, 1000);
                };
                
                return (
                  <div
                    ref={itemRef}
                    style={{ width: "100%" }}
                    className="wrapperWishListItem Cartitems fade-in transform-left-in "
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
                        <h3 className=" CartShoesname primary-heading even-columns ">
                          {el.name}
                          <p>${el.rate}</p>
                        </h3>
                        <p style={{ textTransform: "capitalize" }}>{el.type}</p>
                        <div className="SandQ even-columns">
                          <div className="even-columns">
                            <label htmlFor="size">Size : </label>
                            <select name="size" id="size">
                              <option value={4.5}>4.5</option>
                              <option value={5}>5</option>
                              <option value={5.5}>5.5</option>
                              <option value={6}>6</option>
                              <option value={6.5}>6.5</option>
                              <option value={7}>7</option>
                              <option value={7.5}>7.5</option>
                              <option value={8}>8</option>
                              <option value={8.5}>8.5</option>
                              <option value={9}>9</option>
                              <option value={9.5}>9.5</option>
                              <option value={10}>10</option>
                            </select>
                          </div>
                          <div className="even-columns">
                            <label htmlFor="quan">Quantity : </label>
                            <select
                              onChange={amountCal}
                              ref={QuanRef}
                              name="quan"
                              id="quan"
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                            </select>
                          </div>
                        </div>

                        <div className="even-columns">
                          <p>SALE PRICE : </p> <span> ${el.salePrice}</span>
                        </div>
                        <i onClick={handleDelete} class="fa-solid fa-trash"></i>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
          </div>
          <div className="rightSection | even-columns opposite-columns fade-in transform-right-in ">
            <div className="checkout | even-columns opposite-columns ">
              <h3>Summary</h3>
              <div className="promoSection">
                <h4>Do you have a Promo Code ?</h4>
                <div className="promotaker | even-columns">
                  <input type="text" placeholder="Enter Promo Code"></input>{" "}
                  <button>Apply</button>
                </div>
              </div>
              <div className="amounts | even-columns opposite-columns">
                <div className="amountdiv">
                  <h4>Subtotal :</h4> <span>${subtotal}</span>
                </div>
                <div className="amountdiv">
                  <h4>Estimated Shiping & Handling :</h4> <span>$30</span>
                </div>
                <div className="amountdiv">
                  <h4>Estimated Tax : </h4> <span>$30</span>
                </div>
                <hr />
                <div className="amountdiv">
                  <h4>Total : </h4>
                  <span>${(subtotal + 30 + 30).toFixed(2)} </span>
                </div>
                <hr />
              </div>
              <div className="btndiv even-columns opposite-columns">
                <button>Check OUT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
                </div>
      <Member></Member>
      <Footer></Footer>
    </>
  );
}
