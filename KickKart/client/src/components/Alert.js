import React, { useEffect, useRef } from "react";

export default function Alert(props) {
  const alertRef = useRef("");
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
        } else {
          el.target.classList.remove("fade-out");
        }
      });
    });
    observer.observe(alertRef.current);
  }, []);
  return (
    <div ref={alertRef} className="alert | even-columns   fade-in">
      <div className="even-colums opposite-columns">
        <i class="fa-solid fa-check"></i>
      </div>
      <p>{props.message}</p>
    </div>
  );
}
