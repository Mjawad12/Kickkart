import React, { useRef, useContext, useEffect, useState } from "react";
import Context from "./context/Context";
import { useLocation } from "react-router-dom";
export default function Filter(props) {
  //  location hook
  const location = useLocation();
  // Checking states
  const [currentprice, setcurrentprice] = useState("");
  const [currentgender, setcurrentgender] = useState([]);
  const [currentcolor, setcurrentcolor] = useState([]);
  const [currentbrand, setcurrentbrand] = useState([]);
  const [currentStates, setcurrentStates] = useState([]);

  //  Refs
  const menref = useRef("");
  const womenref = useRef("");
  const kidsref = useRef("");
  const genderRef = useRef("");
  const priceRef = useRef("");
  const colorRef = useRef("");
  const brandRef = useRef("");

  //  Context
  const context = useContext(Context);
  const { allShoes, setcurrentShoes, page } = context;

  // For men page

  const checkRemover = (al) => {
    al.classList.remove("Checked");
    al.innerHTML = ``;
  };

  useEffect(() => {
    if (currentgender.length !== 0) {
      setcurrentgender((currentgender.length = 0));
    }
    let timeout = 1000;
    if (page === "all") {
      timeout = 400;
    } else if (page === "sale") {
      timeout = 2000;
    }
    if (location.pathname === "/men") {
      setTimeout(() => {
        setcurrentgender(currentgender.concat("men"));
        menref.current.classList.add("Checked");
        menref.current.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkRemover(womenref.current);
        checkRemover(kidsref.current);
      }, timeout);
    } else if (location.pathname === "/women") {
      setcurrentgender([]);
      setTimeout(() => {
        setcurrentgender(currentgender.concat("women"));
        womenref.current.classList.add("Checked");
        womenref.current.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkRemover(menref.current);
        checkRemover(kidsref.current);
      }, timeout);
    } else if (location.pathname === "/kids") {
      setTimeout(() => {
        setcurrentgender(currentgender.concat("kids"));
        kidsref.current.classList.add("Checked");
        kidsref.current.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkRemover(womenref.current);
        checkRemover(menref.current);
      }, timeout);
    } else {
      checkRemover(womenref.current);
      checkRemover(kidsref.current);
      checkRemover(menref.current);
      setcurrentgender([]);
    }
  }, [location]);

  //  Checkbox Handler

  const handleClick = (e) => {
    e.target.classList.toggle("Checked");
    if (e.target.classList.contains("Checked")) {
      e.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
      if (e.target.id === "men") {
        setcurrentgender(currentgender.concat("men"));
      } else if (e.target.id === "women") {
        setcurrentgender(currentgender.concat("women"));
      } else if (e.target.id === "kids") {
        setcurrentgender(currentgender.concat("kids"));
      }
      if (e.target.id === "50-100") {
        setcurrentprice(["50", "100"]);
        document.querySelectorAll(".opt_price div").forEach((el) => {
          if (el.id === "50-100") return;
          el.classList.remove("Checked");
          el.innerHTML = "";
        });
      } else if (e.target.id === "100-150") {
        setcurrentprice(["100", "150"]);
        document.querySelectorAll(".opt_price div").forEach((el) => {
          if (el.id !== "100-150") {
            el.classList.remove("Checked");
            el.innerHTML = "";
          }
        });
      } else if (e.target.id === "150-200") {
        setcurrentprice(["150", "200"]);
        document.querySelectorAll(".opt_price div").forEach((el) => {
          if (el.id === "150-200") return;
          el.classList.remove("Checked");
          el.innerHTML = "";
        });
      } else if (e.target.id === "200-300") {
        setcurrentprice(["200", "300"]);
        document.querySelectorAll(".opt_div>.opt_price>div").forEach((el) => {
          if (el.id === "200-300") return;
          el.classList.remove("Checked");
          el.innerHTML = "";
        });
      }
      if (e.target.id === "nike") {
        if (!currentbrand.includes("nike"))
          setcurrentbrand(currentbrand.concat(["nike"]));
      } else if (e.target.id === "puma") {
        if (!currentbrand.includes("puma"))
          setcurrentbrand(currentbrand.concat(["puma"]));
      } else if (e.target.id === "adidas") {
        if (!currentbrand.includes("adidas"))
          setcurrentbrand(currentbrand.concat(["adidas"]));
      }
    } else {
      e.target.innerHTML = "";
      if (e.target.id === "men") {
        for (let i in currentgender) {
          if (currentgender[i] === "men") {
            delete currentgender[i];
          }
        }
        setcurrentgender(currentgender.flat());
      } else if (e.target.id === "women") {
        for (let i in currentgender) {
          if (currentgender[i] === "women") {
            delete currentgender[i];
          }
        }
        setcurrentgender(currentgender.flat());
      } else if (e.target.id === "kids") {
        for (let i in currentgender) {
          if (currentgender[i] === "kids") {
            delete currentgender[i];
          }
        }
        setcurrentgender(currentgender.flat());
      } else if (e.target.id === "50-100") {
        setcurrentprice("");
      } else if (e.target.id === "100-150") {
        setcurrentprice("");
      } else if (e.target.id === "150-200") {
        setcurrentprice("");
      } else if (e.target.id === "200-300") {
        setcurrentprice("");
      }
      if (e.target.id === "nike") {
        for (let i in currentbrand) {
          if (currentbrand[i] === "nike") delete currentbrand[i];
        }
        setcurrentbrand(currentbrand.flat());
      } else if (e.target.id === "puma") {
        for (let i in currentbrand) {
          if (currentbrand[i] === "puma") delete currentbrand[i];
        }
        setcurrentbrand(currentbrand.flat());
      } else if (e.target.id === "adidas") {
        for (let i in currentbrand) {
          if (currentbrand[i] === "adidas") delete currentbrand[i];
        }
        setcurrentbrand(currentbrand.flat());
      }
    }
  };

  //   color
  const handleColor = (e) => {
    if (!e.target.childNodes[0].classList.contains("colorPick")) {
      e.target.childNodes[0].classList.toggle("colorPick");
      e.target.childNodes[0].innerHTML = `<i style="position:absolute " class="fa-solid fa-check"></i>`;
      if (!currentcolor.includes(e.target.id)) {
        setcurrentcolor(currentcolor.concat([e.target.id]));
      }
    } else {
      for (let i in currentcolor) {
        if (currentcolor[i] === e.target.id) {
          delete currentcolor[i];
        }
      }
      setcurrentcolor(currentcolor.flat());
      e.target.childNodes[0].classList.toggle("colorPick");
      e.target.childNodes[0].innerHTML = ``;
    }
  };

  useEffect(() => {
    if (currentStates == "") {
      return setcurrentShoes(allShoes);
    }
    caller();
  }, [currentStates]);

  const caller = () => {
    if (currentStates.length === 1) {
      if (currentStates.includes("gender")) ShoesFetcher(currentgender);
      if (currentStates.includes("price")) ShoesFetcher(null, currentprice);
      if (currentStates.includes("color"))
        ShoesFetcher(null, null, currentcolor);
      if (currentStates.includes("brand"))
        ShoesFetcher(null, null, null, currentbrand);
    } else if (currentStates.length === 2) {
      if (currentStates.includes("gender") && currentStates.includes("price")) {
        ShoesFetcher(currentgender, currentprice);
      } else if (
        currentStates.includes("gender") &&
        currentStates.includes("color")
      ) {
        ShoesFetcher(currentgender, null, currentcolor);
      } else if (
        currentStates.includes("price") &&
        currentStates.includes("color")
      ) {
        ShoesFetcher(null, currentprice, currentcolor);
      } else if (
        currentStates.includes("gender") &&
        currentStates.includes("brand")
      ) {
        ShoesFetcher(currentgender, null, null, currentbrand);
      } else if (
        currentStates.includes("color") &&
        currentStates.includes("brand")
      ) {
        ShoesFetcher(null, null, currentcolor, currentbrand);
      }
    } else if (currentStates.length === 3) {
      if (
        currentStates.includes("gender") &&
        currentStates.includes("price") &&
        currentStates.includes("color")
      ) {
        ShoesFetcher(currentgender, currentprice, currentcolor, null);
      } else if (
        currentStates.includes("gender") &&
        currentStates.includes("price") &&
        currentStates.includes("brand")
      ) {
        ShoesFetcher(currentgender, currentprice, null, currentbrand);
      } else if (
        currentStates.includes("color") &&
        currentStates.includes("price") &&
        currentStates.includes("brand")
      ) {
        ShoesFetcher(null, currentprice, currentcolor, currentbrand);
      } else if (
        currentStates.includes("color") &&
        currentStates.includes("gender") &&
        currentStates.includes("brand")
      ) {
        ShoesFetcher(currentgender, null, currentcolor, currentbrand);
      }
    }
    if (currentStates.length === 4) {
      ShoesFetcher(currentgender, currentprice, currentcolor, currentbrand);
    }
  };

  //  gender
  useEffect(() => {
    caller();
    if (!currentStates.includes("gender"))
      setcurrentStates(currentStates.concat(["gender"]));
    if (currentgender == "") {
      for (let i in currentStates) {
        if (currentStates[i] === "gender") delete currentStates[i];
      }
      setcurrentStates(currentStates.flat());
    }
  }, [currentgender]);

  //  price
  useEffect(() => {
    caller();
    if (!currentStates.includes("price"))
      setcurrentStates(currentStates.concat(["price"]));
    if (currentprice == "") {
      for (let i in currentStates) {
        if (currentStates[i] === "price") delete currentStates[i];
      }
      setcurrentStates(currentStates.flat());
    }
  }, [currentprice]);

  //  color
  useEffect(() => {
    caller();
    if (!currentStates.includes("color"))
      setcurrentStates(currentStates.concat(["color"]));
    if (currentcolor == "") {
      for (let i in currentStates) {
        if (currentStates[i] === "color") delete currentStates[i];
      }
      setcurrentStates(currentStates.flat());
    }
  }, [currentcolor]);
  //  Brand
  useEffect(() => {
    caller();
    if (currentbrand == "") {
      for (let i in currentStates) {
        if (currentStates[i] === "brand") delete currentStates[i];
      }
      setcurrentStates(currentStates.flat());
    } else {
      if (!currentStates.includes("brand"))
        setcurrentStates(currentStates.concat(["brand"]));
    }
  }, [currentbrand]);

  const ShoesFetcher = (gender, rate, color, brand) => {
    let k = [];

    //          Gender capturer

    if (
      gender != null &&
      rate === undefined &&
      color === undefined &&
      brand === undefined
    ) {
      const shoes = allShoes.map((ele) => {
        for (let i in gender) {
          if (ele.type.includes(gender[i])) {
            if (!k.includes(ele)) {
              k = k.concat(ele);
            }
          } else {
          }
        }
      });

      return setcurrentShoes(k);
    }
    //          rate capturer
    else if (
      rate !== undefined &&
      gender == null &&
      color === undefined &&
      brand === undefined
    ) {
      const shoes = allShoes.map((ele) => {
        if (ele.rate >= rate[0] && ele.rate <= rate[1]) {
          k = k.concat(ele);
        }
      });

      return setcurrentShoes(k);
    } //          color capturer
    else if (
      color !== undefined &&
      gender === null &&
      rate === null &&
      brand === undefined
    ) {
      const shoes = allShoes.map((ele) => {
        for (let i in color) {
          if (ele.color === color[i]) {
            if (!k.includes(ele)) k = k.concat(ele);
          }
        }
      });

      return setcurrentShoes(k);
    }
    //     brand capturer
    else if (
      brand !== undefined &&
      gender === null &&
      rate === null &&
      color === null
    ) {
      allShoes.map((ele) => {
        for (let i in brand) {
          if (ele.brand === brand[i]) {
            if (!k.includes(ele)) k = k.concat(ele);
          }
        }
      });

      return setcurrentShoes(k);
    }
    //          gender & rate capturer
    else if (
      gender != undefined &&
      rate != undefined &&
      (color === undefined) & (brand === undefined)
    ) {
      const shoes = allShoes.map((ele) => {
        for (let i in gender) {
          if (ele.type.includes(gender[i])) {
            if (ele.rate >= rate[0] && ele.rate <= rate[1]) {
              if (!k.includes(ele)) {
                k = k.concat(ele);
              }
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
    //          gender & color capturer
    else if (
      gender != undefined &&
      rate === null &&
      color != undefined &&
      brand === undefined
    ) {
      allShoes.map((ele) => {
        for (let i in gender) {
          for (let l in color) {
            if (ele.type.includes(gender[i])) {
              if (ele.color === color[l]) {
                if (!k.includes(ele)) k = k.concat(ele);
              }
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
    //          rate & color capturer
    else if (
      gender === null &&
      rate !== undefined &&
      color != undefined &&
      brand === undefined
    ) {
      allShoes.map((ele) => {
        if (ele.rate >= rate[0] && ele.rate <= rate[1]) {
          for (let l in color) {
            if (ele.color === color[l]) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
    //    gender and brand
    else if (
      gender !== undefined &&
      brand !== undefined &&
      color === null &&
      rate === null
    ) {
      allShoes.map((ele) => {
        for (let i in gender) {
          for (let l in brand) {
            if (ele.type.includes(gender[i]) && ele.brand === brand[l]) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
    //   color and brand
    else if (
      color !== undefined &&
      brand !== undefined &&
      gender === null &&
      rate === null
    ) {
      allShoes.map((ele) => {
        for (let i in color) {
          for (let l in brand) {
            if (ele.color === color[i] && ele.brand === brand[l]) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
    //  gender & price & color
    else if (
      gender !== undefined &&
      color !== undefined &&
      rate !== undefined &&
      brand === null
    ) {
      allShoes.map((ele) => {
        for (let i in gender) {
          for (let l in color) {
            if (
              ele.type.includes(gender[i]) &&
              ele.color === color[l] &&
              ele.rate >= rate[0] &&
              ele.rate <= rate[1]
            ) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }

        return setcurrentShoes(k);
      });
    }
    //  gender & price & brand
    else if (
      gender !== undefined &&
      brand !== undefined &&
      rate !== undefined &&
      color === null
    ) {
      allShoes.map((ele) => {
        for (let i in gender) {
          for (let l in brand) {
            if (
              ele.type.includes(gender[i]) &&
              ele.brand === brand[i] &&
              ele.rate >= rate[0] &&
              ele.rate <= rate[1]
            ) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }

        return setcurrentShoes(k);
      });
    }
    //  price & color  & brand
    else if (
      brand !== undefined &&
      color !== undefined &&
      rate !== undefined &&
      gender === null
    ) {
      allShoes.map((ele) => {
        for (let i in brand) {
          for (let l in color) {
            if (
              ele.color === color[l] &&
              ele.brand === brand[i] &&
              ele.rate >= rate[0] &&
              ele.rate <= rate[1]
            ) {
              if (!k.includes(ele)) k = k.concat(ele);
            }
          }
        }

        return setcurrentShoes(k);
      });
    }
    //  gender & color  & brand
    else if (
      brand !== undefined &&
      color !== undefined &&
      gender !== undefined &&
      rate === null
    ) {
      allShoes.map((ele) => {
        for (let i in brand) {
          for (let l in color) {
            for (let o in gender) {
              if (
                ele.color === color[l] &&
                ele.brand === brand[i] &&
                ele.type.includes(gender[o])
              ) {
                if (!k.includes(ele)) k = k.concat(ele);
              }
            }
          }
        }

        return setcurrentShoes(k);
      });
    }
    // gender & color & price & brand
    else if (gender && rate && brand && color) {
      const shoes = allShoes.map((ele) => {
        for (let i in gender) {
          for (let l in brand) {
            for (let o in color) {
              if (
                ele.type.includes(gender[i]) &&
                ele.color === color[o] &&
                ele.brand === brand[l] &&
                ele.rate >= rate[0] &&
                ele.rate <= rate[1]
              ) {
                if (!k.includes(ele)) {
                  k = k.concat(ele);
                }
              }
            }
          }
        }
      });

      return setcurrentShoes(k);
    }
  };

  // Options Handler

  const handleOpen = (e) => {
    if (e.target.id === "gender") {
      e.target.childNodes[1].classList.toggle("rot270");
      if (!genderRef.current.classList.contains("display-none")) {
        genderRef.current.classList.toggle("height0");
      } else {
        genderRef.current.classList.toggle("height0");
      }
    }
    if (e.target.id === "price") {
      e.target.childNodes[1].classList.toggle("rot270");
      if (!priceRef.current.classList.contains("display-none")) {
        priceRef.current.classList.toggle("height0");
      } else {
        priceRef.current.classList.toggle("height0");
      }
    }
    if (e.target.id === "color") {
      e.target.childNodes[1].classList.toggle("rot270");
      if (!colorRef.current.classList.contains("display-none")) {
        colorRef.current.classList.toggle("height0");
      } else {
        colorRef.current.classList.toggle("height0");
      }
    }
    if (e.target.id === "brand") {
      e.target.childNodes[1].classList.toggle("rot270");
      if (!brandRef.current.classList.contains("display-none")) {
        brandRef.current.classList.toggle("height0");
      } else {
        brandRef.current.classList.toggle("height0");
      }
    }
  };
  const filter = useRef("");
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
    observer.observe(filter.current);
  }, []);

  return (
    <div
      ref={filter}
      className="Filter_tab |  even-columns opposite-columns display-flex  transform-left-in fade-in  "
    >
      <div className="FilterChild">
        <div id="gender" onClick={handleOpen} className="opener">
          <h4>Type</h4>
          <i className="fa-solid fa-caret-up"></i>
        </div>
        <div
          ref={genderRef}
          className="opt_div | even-columns opposite-columns"
        >
          <div className="opt">
            <div
              id="men"
              style={{}}
              onClick={handleClick}
              className="checkbox"
              ref={menref}
            ></div>
            <label htmlFor="men">Men</label>
          </div>
          <div className="opt">
            <div
              id="women"
              style={{}}
              onClick={handleClick}
              className="checkbox"
              ref={womenref}
            ></div>
            <label htmlFor="women">Women</label>
          </div>
          <div className="opt">
            <div
              id="kids"
              style={{}}
              onClick={handleClick}
              className="checkbox"
              ref={kidsref}
            ></div>
            <label htmlFor="kids">Kids</label>
          </div>
        </div>
      </div>
      <hr />
      <div className="FilterChild">
        <div id="price" onClick={handleOpen} className="opener">
          <h4>Shop by price</h4>
          <i className="fa-solid fa-caret-up"></i>
        </div>
        <div ref={priceRef} className="opt_div | even-columns opposite-columns">
          <div className="opt opt_price">
            <div
              id="50-100"
              style={{}}
              onClick={handleClick}
              className="checkbox"
            ></div>
            <label htmlFor="50-100">$50-$100</label>
          </div>
          <div className="opt opt_price">
            <div
              id="100-150"
              style={{}}
              onClick={handleClick}
              className="checkbox"
            ></div>
            <label htmlFor="100-150">$100-$150</label>
          </div>
          <div className="opt opt_price">
            <div
              id="150-200"
              style={{}}
              onClick={handleClick}
              className="checkbox"
            ></div>
            <label htmlFor="150-200">$150-$200</label>
          </div>
          <div className="opt opt_price">
            <div
              id="200-300"
              style={{}}
              onClick={handleClick}
              className="checkbox"
            ></div>
            <label htmlFor="200-300">$200-$300</label>
          </div>
        </div>
      </div>
      <hr />
      <div className="FilterChild">
        <div id="color" onClick={handleOpen} className="opener">
          <h4>Color</h4>
          <i className="fa-solid fa-caret-up"></i>{" "}
        </div>
        <div ref={colorRef} className="colorMaindiv | even-columns">
          <div onClick={handleColor} id="purple" className="Clordiv_wrapper">
            <div style={{ background: "Purple" }} className="colorDiv"></div>
            <span>Purple</span>
          </div>
          <div onClick={handleColor} id="black" className="Clordiv_wrapper">
            <div
              style={{ background: "Black", color: "white" }}
              className="colorDiv"
            ></div>
            <span>Black</span>
          </div>
          <div onClick={handleColor} id="red" className="Clordiv_wrapper">
            <div style={{ background: "Red" }} className="colorDiv"></div>
            <span>Red</span>
          </div>
          <div onClick={handleColor} id="orange" className="Clordiv_wrapper">
            <div style={{ background: "Orange" }} className="colorDiv"></div>
            <span>Orange</span>
          </div>
          <div onClick={handleColor} id="blue" className="Clordiv_wrapper">
            <div style={{ background: "Blue" }} className="colorDiv"></div>
            <span>Blue</span>
          </div>
          <div onClick={handleColor} id="white" className="Clordiv_wrapper">
            <div style={{ background: "White" }} className="colorDiv"></div>
            <span>White</span>
          </div>
          <div onClick={handleColor} id="brown" className="Clordiv_wrapper">
            <div style={{ background: "Brown" }} className="colorDiv"></div>
            <span>Brown</span>
          </div>
          <div onClick={handleColor} id="green" className="Clordiv_wrapper">
            <div style={{ background: "Green" }} className="colorDiv"></div>
            <span>Green</span>
          </div>
          <div onClick={handleColor} id="yellow" className="Clordiv_wrapper">
            <div style={{ background: "Yellow" }} className="colorDiv"></div>
            <span>Yellow</span>
          </div>
          <div onClick={handleColor} id="grey" className="Clordiv_wrapper">
            <div style={{ background: "Grey" }} className="colorDiv"></div>
            <span>Grey</span>
          </div>
          <div onClick={handleColor} id="pink" className="Clordiv_wrapper">
            <div style={{ background: "Pink" }} className="colorDiv"></div>
            <span>Pink</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="FilterChild">
        <div id="brand" onClick={handleOpen} className="opener">
          <h4>Brand</h4>
          <i className="fa-solid fa-caret-up"></i>
        </div>
        <div ref={brandRef} className="opt_div even-columns opposite-columns">
          <div className="opt">
            <div
              style={{}}
              onClick={handleClick}
              id="nike"
              className="checkbox"
            ></div>
            <label htmlFor="Nike">Nike</label>
          </div>
          <div className="opt">
            <div
              style={{}}
              onClick={handleClick}
              id="puma"
              className="checkbox"
            ></div>
            <label htmlFor="Puma">Puma</label>
          </div>
          <div className="opt">
            <div
              style={{}}
              onClick={handleClick}
              id="adidas"
              className="checkbox"
            ></div>
            <label htmlFor="Adidas">Adidas</label>
          </div>
        </div>
      </div>
      {window.innerWidth <= 960 && (
        <i
          onClick={props.handleFilter}
          className="FilterCross |   fa-solid fa-xmark"
        ></i>
      )}
    </div>
  );
}
