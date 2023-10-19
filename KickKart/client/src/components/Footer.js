import React, { useRef, useEffect, useState } from "react";
import logo from "../images/Kickkart logo.png";

export default function Footer(props) {
  const kick = useRef("");
  const subs = useRef("");
  const wh = useRef("");
  const contact = useRef("");
  const footer = useRef("");
  const collection = useRef("");
  const [edgeStyle, setedgeStyle] = useState({});

  const handleFooteropener = (e) => {
    if (e.target.id === "kick") {
      if (kick.current.classList.contains("height-full")) {
        kick.current.classList.remove("height-full");
        e.target.childNodes[2].style.rotate = "0deg";
        return;
      }

      e.target.childNodes[2].style.rotate = "180deg";
      kick.current.style.setProperty(
        "--max-height",
        kick.current.scrollHeight + "px"
      );
      setTimeout(() => {
        kick.current.classList.add("height-full");
      }, 100);
    } else if (e.target.id === "subs") {
      if (subs.current.classList.contains("height-full")) {
        subs.current.classList.remove("height-full");
        e.target.childNodes[2].style.rotate = "0deg";
        return;
      }

      e.target.childNodes[2].style.rotate = "180deg";
      subs.current.style.setProperty(
        "--max-height",
        kick.current.scrollHeight + "px"
      );
      setTimeout(() => {
        subs.current.classList.add("height-full");
      }, 100);
    } else if (e.target.id === "wh") {
      if (wh.current.classList.contains("height-full")) {
        wh.current.classList.remove("height-full");
        e.target.childNodes[2].style.rotate = "0deg";
        return;
      }
      e.target.childNodes[2].style.rotate = "180deg";
      wh.current.style.setProperty(
        "--max-height",
        wh.current.scrollHeight + "px"
      );
      setTimeout(() => {
        wh.current.classList.add("height-full");
      }, 100);
    } else if (e.target.id === "contact") {
      if (contact.current.classList.contains("height-full")) {
        contact.current.classList.remove("height-full");
        e.target.childNodes[2].style.rotate = "0deg";
        return;
      }
      e.target.childNodes[2].style.rotate = "180deg";
      contact.current.style.setProperty(
        "--max-height",
        contact.current.scrollHeight + "px"
      );
      setTimeout(() => {
        contact.current.classList.add("height-full");
      }, 100);
    }
  };

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

    observer.observe(footer.current);
  });
  const openCollection = (e) => {
    if (
      e.target.id === "collect" &&
      collection.current.classList.contains("open")
    ) {
      collection.current.classList.toggle("open");
      setTimeout(() => {
        collection.current.classList.toggle("display-none");
      }, 300);
    } else if (e.target.id === "collect") {
      collection.current.classList.toggle("display-none");
      setTimeout(() => {
        collection.current.classList.toggle("open");
      }, 100);
    }
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setedgeStyle({
        borderTop: "100px solid black",
      });
    }
    if (window.location.pathname.includes("/SelectedShoe")) {
      setedgeStyle({
        borderTop: "100px solid black",
      });
    } else if (window.location.pathname === "/Product") {
      setedgeStyle({
        borderTop: "100px solid white",
      });
    }
  }, [window.location.pathname]);

  return (
    <>
      <div style={{ position: "relative" }} className="background-secondary">
        <div style={edgeStyle} className="edge2"></div>
        <div className="footer_above  | even-columns opposite-columns padding-block-900">
          <img src={logo} alt=""></img>
          <div className="social-icons even-columns ">
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
          <div className="bt_mail even-columns ">
            <input type="email" placeholder="Enter your mail"></input>
            <button className="bt">OK</button>
          </div>
        </div>

        <div
          ref={footer}
          className="footer | even-columns  padding-block-900  background-secondary fade-in "
        >
          <div className="navigation | even-columns opposite-columns">
            <h5 id="kick" onClick={handleFooteropener} className="even-columns">
              Kick Kart{" "}
              <i className="fa-solid fa-caret-down  display-none "></i>
            </h5>
            <ul
              ref={kick}
              className="navigation-footer footerElement | even-columns opposite-columns"
            >
              <li>HOME</li>
              <li id="collect" onClick={openCollection}>
                COLLECTIONS <i className="fa-solid fa-caret-down"></i>
                <ul
                  ref={collection}
                  className="Collections-footer | even-columns opposite-columns display-none"
                >
                  <li>Men</li>
                  <li>Women</li>
                  <li>Kids</li>
                </ul>
              </li>
              <li>SALE</li>
              <li>TESTIMONIALS</li>
              <li>OUR TEAM</li>
              <li>ABOUT</li>
            </ul>
          </div>
          <div className="Contactus  | even-columns opposite-columns">
            <h5
              id="contact"
              onClick={handleFooteropener}
              className="even-columns"
            >
              Contact us{" "}
              <i className="fa-solid fa-caret-down  display-none "></i>
            </h5>
            <div
              ref={contact}
              className="footerElement even-columns opposite-columns"
            >
              <p>
                Have questions or need assistance? Reach out to our dedicated
                support team.
              </p>
              <p className="phone">
                <i className="fa-solid fa-phone"></i>
                {"  "}
                <a href="tel:+4733378901">XXX-XXX-XXX</a>
              </p>
              <p className="mail">
                <i className="fa-solid fa-envelope"></i>{" "}
                <a href="mailto:kickkart156@gmail.com">kickkart156@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="WorkingHours  | even-columns opposite-columns">
            <h5 id="wh" onClick={handleFooteropener} className="even-columns">
              WORKING HOURS{" "}
              <i className="fa-solid fa-caret-down  display-none "></i>
            </h5>
            <div ref={wh} className="footerElement">
              <p>24/7 service</p>
            </div>
          </div>
          <div className="Subscription  | even-columns opposite-columns">
            <h5 id="subs" onClick={handleFooteropener} className="even-columns">
              SUBSCRIPTION{" "}
              <i className="fa-solid fa-caret-down  display-none "></i>
            </h5>
            <div
              ref={subs}
              className="footerElement even-columns opposite-columns"
            >
              <p>Subscribe your Email address for latest news & updates.</p>
              <input type="email" placeholder="Enter Email Address"></input>
              <button className="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
