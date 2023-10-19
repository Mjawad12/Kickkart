import React, { useEffect, useRef } from "react";

export default function ShoesImageShower(props) {
  const img = useRef("");
  useEffect(() => {
    if (props.imgChecker === "yes") {
      setTimeout(() => {
        img.current && img.current.classList.add("fade-out");
      }, [100]);
    }
  }, [props.imgChecker]);
  return (
    <div
      ref={img}
      className="imageShower even-columns opposite-columns fade-in "
    >
      <i onClick={props.func} class="fa-solid fa-xmark fs-700"></i>
      <img src={props.img} alt=""></img>
    </div>
  );
}
