import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Collectioncard(props) {
  const [style, setstyle] = useState({});
  useEffect(() => {
    if (props.brand === "adidas") {
      setstyle({
        transform: `scaleX(${-1})`,
      });
    }
  }, []);
  return (
    <>
      <Link to={`/SelectedShoe/${props.id}`}>
        <div className="collection_card |  even-columns opposite-columns">
          <div className="img_div">
            <img
              style={style}
              className="collection_img"
              src={props.image}
            ></img>
            <div className="rate | ">${props.rate}</div>
          </div>
          <div className="collection_text |  even-columns opposite-columns">
            <p className="text">{props.name}</p>
            <p className="fs-300">New Arrival</p>
          </div>
        </div>
      </Link>
    </>
  );
}
