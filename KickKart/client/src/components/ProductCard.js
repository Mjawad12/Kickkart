import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "./context/Context";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const prod = useRef("");
  const context = useContext(Context);
  const { currentShoes, setClickedshoe, Clickedshoe } = context;
  const [style, setstyle] = useState({});
  const [salestyle, setsalestyle] = useState({});
  const handleClickRep = () => {
    // window.scrollTo(0, 0);
    // navigate(`/SelectedShoe/${props.Shoe._id}`);
  };

  useEffect(() => {
    if (props.brand == "adidas") {
      setstyle({
        transform: `scaleX(${-1})`,
      });
    } else {
      setstyle({});
    }
    if (props.sale === "true") {
      setsalestyle({ textDecoration: "line-through", color: "#0000006b" });
    }
  }, [currentShoes, Clickedshoe]);

  //    Card animation
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
    observer.observe(prod.current);
  }, []);

  return (
    <>
      <Link to={`/SelectedShoe/${props.Shoe._id}`}>
        <div
          onClick={handleClickRep}
          className="productCard | even-columns opposite-columns fade-in transform-right-in"
          ref={prod}
        >
          <div className="imgaeWrapper">
            <img style={style} src={props.image}></img>
          </div>
          <div className="even-columns">
            <p>Just In</p>
            <p
              className="color-primary"
              style={{ textTransform: "capitalize" }}
            >
              {props.brand}
            </p>
          </div>
          <h4>{props.name}</h4>
          {props.sale === "true" && <p>{props.salePrice}</p>}
          <p style={salestyle}>${props.rate}</p>
        </div>
      </Link>
    </>
  );
}
