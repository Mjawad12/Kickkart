import React, { useRef, useEffect, useContext } from "react";
import logo from "../images/Kickkart logo.png";
import { useNavigate } from "react-router-dom";
import Context from "./context/Context";

export default function Member(props) {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { authtoken } = context;
  const memberRef = useRef("");
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
    observer.observe(memberRef.current);
  }, []);
  const handleClick = (e) => {
    window.scrollTo(0, 0);
    navigate(`/${e.target.id}`);
  };

  return (
    <>
      <div style={{ marginTop: props.mar }} className="member |  even-columns ">
        <div
          ref={memberRef}
          className="membercont  | container even-columns fade-in"
        >
          {authtoken != undefined ? (
            <>
              <div className="member_text |  even-columns opposite-columns">
                <h2 className="primary-heading">
                  Congratulation on Joining us
                </h2>
                <p>Use code 'Nike_Member' to get 20% off. </p>
                <div className="btn-div | even-columns">
                  <button onClick={handleClick} id="Product" className="button">
                    Shop Now
                  </button>
                </div>
              </div>
              <img src={logo} alt=""></img>
            </>
          ) : (
            <>
              <div className="member_text |  even-columns opposite-columns">
                <h2 className="primary-heading">Become A Member</h2>
                <p>Sign up for free. Join the community</p>
                <div className="btn-div | even-columns">
                  <button onClick={handleClick} id="login" className="button">
                    Sign in
                  </button>
                  <button onClick={handleClick} id="signup" className="button">
                    Sign up
                  </button>
                </div>
              </div>
              <img src={logo} alt=""></img>
            </>
          )}
        </div>
      </div>
    </>
  );
}
