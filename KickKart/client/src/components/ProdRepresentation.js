import React, { useEffect, useState, useContext, useRef } from "react";
import Alert from "./Alert";
import Context from "./context/Context";
import ShoesImageShower from "./ShoesImageShower";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
export default function ProdRepresentation() {
  const [Shoetype, setShoetype] = useState("");
  const context = useContext(Context);
  const [salestyle, setsalestyle] = useState({});
  const [Selectedsize, setSelectedsize] = useState("");
  const [sizeError, setsizeError] = useState("false");
  const [quantity, setquantity] = useState(1);
  const [similarShoes, setsimilarShoes] = useState([]);
  const [alert, setalert] = useState("false");
  const [ImgStyle, setImgStyle] = useState({});
  const [openImage, setopenImage] = useState("no");
  const [loading, setloading] = useState("true");
  const {
    Allshoes,
    allShoes,
    setClickedshoe,
    Clickedshoe,
    localstorageCart,
    getShoe,
  } = context;

  const shiping = useRef("");
  const reveiws = useRef("");
  const img = useRef("");
  const { id } = useParams();

  useEffect(() => {
    getShoe(id);
    setTimeout(() => {
      setloading("false");
    }, 2000);
    if (allShoes.length == 0) {
      Allshoes();
    }
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

  const handlechange = (e) => {
    if (quantity < 10) {
      if (e.target.id === "add") {
        setquantity(quantity + 1);
      }
    }
    if (quantity > 1) {
      if (e.target.id === "sub") {
        setquantity(quantity - 1);
      }
    }
  };

  useEffect(() => {
    let k = [];
    Clickedshoe &&
      Clickedshoe.type.map((s) => {
        k = k.concat(s);
      });

    setShoetype(k.toString());
    if (Clickedshoe.sale === "true") {
      setsalestyle({ textDecoration: "line-through", color: "#0000006b" });
    } else {
      setsalestyle({
        fontSize: "1.5rem",
        lineHeight: "1.2",
        fontWeight: "900",
        fontFamily: "var(--ff-primary-heading)",
      });
    }

    if (Clickedshoe.brand === "nike" || Clickedshoe.brand === "puma") {
      setImgStyle({
        transform: `scaleX(${-1})`,
      });
    } else {
      setImgStyle({});
    }
  }, [Clickedshoe]);

  useEffect(() => {
    for (let i in similarShoes) {
      if (similarShoes[i].name === Clickedshoe.name) {
        return;
      }
    }
    let kl = [];
    allShoes &&
      allShoes.map((el) => {
        if (el.name == Clickedshoe.name) {
          kl = kl.concat(el);
        }
      });
    setsimilarShoes(kl);
  }, [similarShoes, Clickedshoe]);

  const handleOpner = (e) => {
    if (e.target.id === "shiping") {
      if (!shiping.current.classList.contains("height-zero")) {
        shiping.current.style.setProperty(
          "--max-height",
          shiping.current.scrollHeight + 20 + "px"
        );
        shiping.current.classList.add("height-zero");
        document.querySelector(".Carets").style.rotate = "0deg";
      } else {
        shiping.current.classList.remove("height-zero");
        document.querySelector(".Carets").style.rotate = "180deg";
      }
    }
    if (e.target.id === "reviews") {
      if (!reveiws.current.classList.contains("height-zero")) {
        reveiws.current.style.setProperty(
          "--max-height",
          reveiws.current.scrollHeight + "px"
        );
        reveiws.current.classList.add("height-zero");
        document.querySelector(".Caret2").style.rotate = "0deg";
        document.querySelector(".Caret2").style.paddingRight = "0rem";
        document.querySelector(".Caret2").style.paddingLeft = "1rem";
      } else {
        reveiws.current.classList.remove("height-zero");
        document.querySelector(".Caret2").style.rotate = "180deg";
        document.querySelector(".Caret2").style.paddingRight = "1rem";
        document.querySelector(".Caret2").style.paddingLeft = "0rem";
      }
    }
  };

  const handleSize = (e) => {
    setsizeError("false");
    const size = document.querySelectorAll(".size");
    size.forEach((el) => {
      if (e.target !== el) el.classList.remove("black");
    });

    if (!e.target.classList.contains("black")) {
      e.target.classList.add("black");
      setSelectedsize(e.target.textContent);
    } else {
      setSelectedsize("");
      e.target.classList.remove("black");
    }
  };
  const Imageopner = () => {
    window.scrollTo(0, 0);
    if (openImage === "no") {
      setopenImage("yes");
      document.body.classList.add("fade");
      document.body.classList.add("no-scroll");
    } else {
      setopenImage("no");
      document.body.classList.remove("fade");
      document.body.classList.remove("no-scroll");
    }
  };
  const HandleFavourite = () => {
    if (Selectedsize === "") {
      setsizeError("true");
    } else {
      const presentShoes = localStorage.getItem("Wi");
      if (presentShoes != undefined) {
        let parsedshoes = JSON.parse(presentShoes);
        for (let i in parsedshoes) {
          if (Clickedshoe.image === parsedshoes[i].image) {
            setalert("true1");
            setTimeout(() => {
              setalert("false");
            }, 5000);
            return;
          }
        }
        let k = Clickedshoe;
        k.size = Selectedsize;
        k.quantity = 1;
        parsedshoes = parsedshoes.concat(k);
        localStorage.setItem("Wi", JSON.stringify(parsedshoes));
        setalert("true");
        setTimeout(() => {
          setalert("false");
        }, 5000);
        return;
      } else {
        let k = Clickedshoe;
        k.size = Selectedsize;
        k.quantity = 1;
        const shoe = JSON.stringify([k]);
        localStorage.setItem("Wi", shoe);
        setalert("true");
        setTimeout(() => {
          setalert("false");
        }, 5000);
      }
    }
  };
  const handleCart = async () => {
    if (Selectedsize === "") {
      setsizeError("true");
    } else {
      const result = await localstorageCart(
        Clickedshoe,
        Selectedsize,
        quantity
      );

      if (result) {
        setalert("true2");
        setTimeout(() => {
          setalert("false");
        }, 2000);
      } else {
        setalert("true3");
        setTimeout(() => {
          setalert("false");
        }, 2000);
      }
    }
  };
  return (
    <>
      <section className="Cshoe | padding-block-900">
        {alert === "true" && <Alert message="Shoe Added to WishList"></Alert>}
        {alert === "true1" && (
          <Alert message="Item Already in WishList"></Alert>
        )}
        {alert === "true3" && <Alert message="Item Already in Cart"></Alert>}
        {alert === "true2" && <Alert message="Shoe Added to Cart"></Alert>}
        {openImage === "yes" && (
          <ShoesImageShower
            imgChecker={openImage}
            ref={img}
            func={Imageopner}
            img={Clickedshoe.image}
          ></ShoesImageShower>
        )}
        <div className="container">
          {loading === "true" ? (
            <Loader></Loader>
          ) : (
            <div className="CshoeDiv  |  even-columns ">
              <div className="CshoeDivDetails mobCshoeDivDetails | even-columns opposite-columns">
                <div className="CshoeText">
                  <h3 className="primary-heading"> {Clickedshoe.name} </h3>
                  <p style={{ textTransform: "capitalize" }}> {Shoetype}</p>
                  <div className="saleDiv | even-columns">
                    {Clickedshoe.sale === "true" && (
                      <p>${Clickedshoe.salePrice}</p>
                    )}
                    {Clickedshoe.sale === "true" && (
                      <p>
                        {(Clickedshoe.rate - Clickedshoe.salePrice).toFixed(1)}%
                        off
                      </p>
                    )}
                  </div>
                  <p style={salestyle}>${Clickedshoe.rate}</p>
                  <p>{Clickedshoe._id}</p>
                </div>
              </div>
              <img
                className="CshoeImg"
                style={ImgStyle}
                src={Clickedshoe.image}
                onClick={Imageopner}
                alt=""
              ></img>
              <div className="CshoeDivDetails | even-columns opposite-columns">
                <div className="CshoeText PcCshoeDivDetails">
                  <h3 className="primary-heading"> {Clickedshoe.name} </h3>
                  <p style={{ textTransform: "capitalize" }}> {Shoetype}</p>
                  <div className="saleDiv | even-columns">
                    {Clickedshoe.sale === "true" && (
                      <p>${Clickedshoe.salePrice}</p>
                    )}
                    {Clickedshoe.sale === "true" && (
                      <p>
                        {(Clickedshoe.rate - Clickedshoe.salePrice).toFixed(1)}%
                        off
                      </p>
                    )}
                  </div>
                  <p style={salestyle}>${Clickedshoe.rate}</p>
                </div>
                {similarShoes.length > 1 && (
                  <div className="similarCshoesDiv">
                    <h4>Colors :</h4>
                    <div className="similarCshoes">
                      {similarShoes &&
                        similarShoes.map((el) => {
                          const handleClick = () => {
                            setClickedshoe(el);
                            window.scrollTo(0, 0);
                          };
                          let style = {};
                          if (el.brand == "adidas") {
                            style = {
                              transform: `scaleX(${-1})`,
                            };
                          }

                          return (
                            <img
                              style={style}
                              src={el.image}
                              onClick={handleClick}
                              alt="othercolurs"
                            ></img>
                          );
                        })}
                    </div>
                  </div>
                )}
                <div className="sizesDiv | even-columns opposite-columns">
                  <h4>Sizes :</h4>
                  <div className="sizes">
                    <div className="size" onClick={handleSize}>
                      4.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      5
                    </div>
                    <div className="size" onClick={handleSize}>
                      5.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      6
                    </div>
                    <div className="size" onClick={handleSize}>
                      6.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      7
                    </div>
                    <div className="size" onClick={handleSize}>
                      7.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      8
                    </div>
                    <div className="size" onClick={handleSize}>
                      8.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      9
                    </div>
                    <div className="size" onClick={handleSize}>
                      9.5
                    </div>
                    <div className="size" onClick={handleSize}>
                      10
                    </div>
                  </div>
                </div>
                {sizeError === "true" && (
                  <p style={{ color: "red" }}>
                    <i className="fa-regular fa-circle-xmark"></i> Please Select
                    a Size
                  </p>
                )}
                <div className="btnDiv even-columns opposite-columns">
                  <div className="QtyDiv even-columns ">
                    <button id="sub" onClick={handlechange}>
                      -
                    </button>
                    <p>{quantity}</p>
                    <button id="add" onClick={handlechange}>
                      +
                    </button>
                  </div>
                  <button onClick={handleCart} className="button  even-columns">
                    Add To Cart{" "}
                    <i
                      style={{ pointerEvents: "none" }}
                      className="fa-solid fa-cart-shopping"
                    ></i>
                  </button>
                  <button
                    onClick={HandleFavourite}
                    className="button | even-columns"
                  >
                    Favourite{" "}
                    <i
                      style={{ pointerEvents: "none" }}
                      className="fa-solid fa-heart"
                    ></i>
                  </button>
                </div>
                <div className="prodDescriptionDiv">
                  <div className="prodDescription">
                    <h4>Details :</h4>
                    <p>
                      Elevate your style with the Kick Kart Shoes. Its platform
                      midsole delivers a bold statement on top of the classic,
                      easy-to-wear design. And don't worry, we've kept the fit
                      you love.
                    </p>
                  </div>
                </div>
                <hr></hr>
                <div className="ShipingDiv">
                  <div
                    id="shiping"
                    onClick={handleOpner}
                    className="ShipingDivWrapper | even-columns"
                  >
                    <h3>Shiping & Returns</h3>
                    <i className="Carets |  fa-solid fa-caret-down"></i>
                  </div>
                  <div ref={shiping} className="Shiping">
                    <p>
                      Free standard shipping on orders $50+ and free 60-day
                      returns for Nike Members.
                    </p>
                  </div>
                </div>
                <hr></hr>
                <div className="reviewsDiv">
                  <div
                    id="reviews"
                    onClick={handleOpner}
                    className="reviewWrapper | even-columns"
                  >
                    <h3>Reviews(2)</h3>
                    <div className="stars | even-columns">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="Caret2 |  fa-solid fa-caret-down"></i>
                    </div>
                  </div>
                  <div
                    ref={reveiws}
                    className="reviews | even-columns opposite-columns "
                  >
                    <div className="reviewsHeader | even-columns">
                      <div className="stars2">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <p>5 Stars</p>
                    </div>
                    <div className="Review | even-columns opposite-columns">
                      <div className="RevieHeader | even-columns">
                        <div className="Reviestars">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="Reviename">
                          <p>RobertC651702413 - Oct 11, 2023</p>
                        </div>
                      </div>
                      <p>
                        Great shoe. Super support and comfort. Highly recommend
                        👍🏾
                      </p>
                    </div>
                    <div className="Review | even-columns opposite-columns">
                      <div className="RevieHeader | even-columns">
                        <div className="Reviestars">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <div className="Reviename">
                          <p>abdelhakimK596657311 - Oct 02, 2023</p>
                        </div>
                      </div>
                      <p>
                        I love this trainers with a very good cushion and a
                        perfect body balance.
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
