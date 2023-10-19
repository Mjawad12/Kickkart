import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../images/Kickkart logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Context from "./context/Context";
import UserAccount from "./UserAccount";
import Search from "./Search";

export default function Navbar() {
  const context = useContext(Context);
  const { authtoken, userdataFetcher, userdata } = context;
  const [navStyle, setnavStyle] = useState({});
  const [SearchShow, setSearchShow] = useState("true");
  const [AccountOpner, setAccountOpner] = useState("false");
  const location = useLocation();
  //    refs
  const mobile_nav = useRef("");
  const closebtn = useRef("");
  const collection = useRef("");
  const collectionMenu = useRef("");
  const collectionMob = useRef("");
  const collectionMobMenu = useRef("");
  const Account = useRef("");
  const arrow = useRef("");

  //   Animation on scroll
  const nav = useRef("");
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("Nav_animate");
        } else {
          entry.target.classList.remove("Nav_animate");
        }
      });
    });
    observer.observe(nav.current);
  }, []);

  //   Mobile Nav
  const HandleNav = (e) => {
    window.scrollTo(0, 0);
    if (e.target.id === "open") {
      document.body.classList.toggle("fade");
      document.body.classList.toggle("no-scroll");
      mobile_nav.current.classList.toggle("display-none");
      closebtn.current.classList.toggle("display-none");
      setTimeout(() => {
        mobile_nav.current.classList.toggle("open");
      }, 100);
    } else if (e.target.id === "close") {
      document.body.classList.toggle("fade");
      document.body.classList.toggle("no-scroll");
      mobile_nav.current.classList.toggle("open");
      setTimeout(() => {
        mobile_nav.current.classList.toggle("display-none");
        closebtn.current.classList.toggle("display-none");
      }, 1000);
    }
  };

  //   closee on click
  useEffect(() => {
    var clickHandler = (e) => {
      console.log(e.target);
      if (!collection.current.contains(e.target)) {
        collectionMenu.current.classList.remove("open");
        setTimeout(() => {
          collectionMenu.current.classList.add("display-none");
        }, 1000);
        document.removeEventListener("click", clickHandler);
        if (e.target.id !== "account") {
          setAccountOpner("false");
        }
      }
      if (!collectionMob.current.contains(e.target)) {
        collectionMobMenu.current.classList.remove("open");
        setTimeout(() => {
          collectionMobMenu.current.classList.add("display-none");
        }, 1000);
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, []);
  //  collection opening
  const openCollection = (e) => {
    if (e.target === collection.current) {
      if (collectionMenu.current.classList.contains("open")) {
        collectionMenu.current.classList.remove("open");
        setTimeout(() => {
          collectionMenu.current.classList.add("display-none");
        }, 1000);
      } else {
        collectionMenu.current.classList.remove("display-none");
        setTimeout(() => {
          collectionMenu.current.classList.add("open");
        }, 100);
      }
    } else if (e.target === collectionMob.current) {
      if (collectionMobMenu.current.classList.contains("open")) {
        collectionMobMenu.current.classList.remove("open");
        setTimeout(() => {
          collectionMobMenu.current.classList.add("display-none");
        }, 1000);
      } else {
        collectionMobMenu.current.classList.remove("display-none");
        setTimeout(() => {
          collectionMobMenu.current.classList.add("open");
        }, 100);
      }
    }
  };
  const handleClick = () => {
    closebtn.current.click();
  };
  useEffect(() => {
    if (location.pathname !== "/") {
      setnavStyle({
        position: "relative",
        color: "black",
      });
    } else {
      setnavStyle({
        position: "absolute",
      });
    }
  }, [location]);
  const handleAccount = () => {
    if (AccountOpner === "false") {
      setAccountOpner("true");
      setTimeout(() => {
        Account.current.style.setProperty(
          "--max-height",
          Account.current.scrollHeight + 25 + "px"
        );
        Account.current.classList.add("heightFull");
        Account.current.classList.add("fade-out");
        arrow.current.classList.add("fade-out");
      }, 200);
    } else {
      Account.current.classList.remove("fade-out");
      Account.current.classList.remove("heightFull");
      arrow.current.classList.remove("fade-out");
      setTimeout(() => {
        setAccountOpner("false");
      }, 900);
    }
  };
  //  Getting user data
  useEffect(() => {
    if (authtoken != undefined) {
      if (userdata !== undefined) {
      } else {
        userdataFetcher();
      }
    }
  }, [authtoken]);

  //   Showing Search Window
  const handleSearchON = () => {
    const searchWindow = document.querySelector(".searchWindow");
    searchWindow.classList.remove("display-none");
    setTimeout(() => {
      searchWindow.style.setProperty(
        "--max-height",
        searchWindow.scrollHeight + 500 + "px"
      );
      searchWindow.classList.add("heightFull");
    }, [200]);
  };
  return (
    <>
      {SearchShow === "true" && <Search></Search>}
      <div style={navStyle} ref={nav} className="nav | element_for_animation">
        <div className=" nav-start  | even-columns">
          <i
            onClick={HandleNav}
            id="open"
            className="mobi-nav-button | fa-solid fa-bars fs-600 display-none"
          ></i>
          <Link className="Mainlogo" to="/">
            <div className=" Mainlogo | even-columns">
              <img src={logo} alt=""></img>
              <h1 className="logo">
                <span>Kick</span>kart
              </h1>
            </div>
          </Link>
          <ul className="navigation-main | even-columns">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="Product">All Products</Link>
            </li>
            <li ref={collection} id="collect" onClick={openCollection}>
              <Link style={{ pointerEvents: "none" }}>
                COLLECTIONS
                <i
                  style={{ marginLeft: "5px" }}
                  className="fa-solid fa-caret-down"
                ></i>
              </Link>
              <ul
                ref={collectionMenu}
                className="Collections | even-columns opposite-columns display-none"
              >
                <li>
                  <Link to="men"> Men</Link>
                </li>
                <li>
                  <Link to="women">Women</Link>
                </li>
                <li>
                  <Link to="kids">Kids</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="Sale">SALE</Link>
            </li>
            <li>
              <Link to="/wishlist">Wish List</Link>
            </li>
          </ul>
          <div className="nav-end-Wrapper  |  even-columns opposite-columns ">
            <div className=" nav-end even-columns">
              <div className="even-columns opposite-columns">
                <i
                  onClick={handleSearchON}
                  className="fa-solid fa-magnifying-glass"
                ></i>
              </div>
              {authtoken != undefined ? (
                <div
                  id="account"
                  onClick={handleAccount}
                  className="even-colums opposite-columns"
                >
                  <i
                    onClick={handleAccount}
                    id="account"
                    className="fa-solid fa-user"
                  ></i>
                  {AccountOpner === "true" && (
                    <div ref={arrow} className="arrow-up fade-in"></div>
                  )}
                </div>
              ) : (
                <i
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="fa-solid fa-user"
                ></i>
              )}
              <Link to={"/cart"}>
                <div className="cartbtn even-columns">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <hr />
                  {localStorage.getItem("Ci") ? (
                    <p>{JSON.parse(localStorage.getItem("Ci")).length}</p>
                  ) : (
                    <p>0</p>
                  )}
                </div>
              </Link>
            </div>
          </div>
          {AccountOpner === "true" && <UserAccount ref={Account}></UserAccount>}
        </div>
      </div>
      <div
        ref={mobile_nav}
        className="mobi-nav-div | even-columns display-none "
      >
        <i
          ref={closebtn}
          onClick={HandleNav}
          id="close"
          className="mobi-nav-close |  fa-solid fa-xmark fs-700 display-none"
        ></i>
        <div className="mobi-nav | even-columns opposite-columns ">
          <ul className="navigation-main mob-navigation | even-columns opposite-columns">
            <li onClick={handleClick}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={handleClick}>
              <Link to="Product">All Products</Link>
            </li>
            <li ref={collectionMob} id="collectMob" onClick={openCollection}>
              COLLECTIONS <i className="fa-solid fa-caret-down"></i>
              <ul
                ref={collectionMobMenu}
                className="Collections | even-columns opposite-columns display-none"
              >
                <li onClick={handleClick}>
                  <Link to="Men"> Men</Link>
                </li>
                <li onClick={handleClick}>
                  <Link to="Women">Women</Link>
                </li>
                <li onClick={handleClick}>
                  <Link to="Kids">Kids</Link>
                </li>
              </ul>
            </li>
            <li onClick={handleClick}>
              <Link to="Sale">SALE</Link>
            </li>

            <li onClick={handleClick}>
              <Link to="/wishlist">Wish List</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
