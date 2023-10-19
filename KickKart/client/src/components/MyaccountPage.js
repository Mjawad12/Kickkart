import React, { useContext, useEffect } from "react";

import Context from "./context/Context";
import Banner from "./Banner";
import { Link, useNavigate } from "react-router-dom";
export default function MyaccountPage() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { authtoken, userdataFetcher, Userdata, setauthtoken, userdata } =
    context;
  useEffect(() => {
    if (userdata !== undefined) {
    } else {
      userdataFetcher();
    }
  }, []);

  const handleLogout = () => {
    setauthtoken(undefined);
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <>
      <Banner></Banner>
      <div className="container">
        <div className="myaccount padding-block-900">
          <div className="even-columns opposite-columns">
            <p>
              <Link style={{ display: "inline" }} to="/">
                Home
              </Link>
              {window.location.pathname}
            </p>

            <h1 className="primary-heading color-black">My Account</h1>
            <p onClick={handleLogout} className="logout">
              Log out
              <hr />
            </p>
          </div>
          <div className="details | even-columns opposite-columns">
            <h2 className="Primary-heading color-black even-columns">
              <i class="fa-solid fa-user"></i>Profile :
            </h2>

            <hr />
            <div className="even-columns">
              <p>Full Name : </p>
              {Userdata && <span>{Userdata.name}</span>}
            </div>
            <div className="even-columns">
              <p>Email : </p>
              {Userdata && <span>{Userdata.email}</span>}
            </div>
          </div>
          <p></p>
        </div>
      </div>
    </>
  );
}
