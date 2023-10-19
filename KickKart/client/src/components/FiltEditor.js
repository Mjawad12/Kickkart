import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function FiltEditor(props) {
  const [text, settext] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/Sale") {
      settext("Sale upto 20% off");
    } else {
      settext("Total Results");
    }
  }, [location]);
  return (
    <div className="editor | even-columns ">
      <div className="FilterChild">
        <p style={{ textTransform: "capitalize" }} className="path">
          <Link style={{ display: "inline" }} to="/">
            Home
          </Link>
          {props.location}
        </p>
        <h3>{text + "(" + props.length + ")"}</h3>
      </div>
      <div onClick={props.handleFilter} className="editorDiv | even-columns">
        <h3 className="primary-heading color-black">{props.situ} Filter</h3>
        <i className="fa-solid fa-sliders "></i>
      </div>
    </div>
  );
}
