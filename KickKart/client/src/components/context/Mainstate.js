import React, { useState } from "react";
import Context from "./Context";

export default function Mainstate(props) {
  const [shoes, setshoes] = useState(undefined);
  const [Women_Shoes, setWomen_Shoes] = useState(undefined);
  const [Kids_Shoes, setKids_Shoes] = useState(undefined);
  const [Errors, setErrors] = useState(undefined);
  const [authtoken, setauthtoken] = useState(localStorage.getItem("authToken"));
  const [OTP, setOTP] = useState(undefined);
  const [Userdata, setUserdata] = useState(undefined);
  const [allShoes, setallShoes] = useState([]);
  const [page, setpage] = useState();

  const [currentShoes, setcurrentShoes] = useState([]);
  const [Clickedshoe, setClickedshoe] = useState({
    brand: "puma",
    color: "White",
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307778/03/sv01/fnd/PNA/fmt/png/Porsche-Legacy-SPEEDFUSION-Men's-Driving-Shoes",
    name: "Porsche Legacy",
    rate: 100,
    sale: "true",
    salePrice: 50,
    type: ["men", "women", "kids"],
  });
  const url = `${process.env.REACT_APP_BACKEND}`;

  const menshoes = async () => {
    const response = await fetch(`${url}/Shoes/Men`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsed_response = await response.json();

    setshoes(parsed_response);
  };
  const womenshoes = async () => {
    const response = await fetch(`${url}/Shoes/women`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsed_response = await response.json();

    setWomen_Shoes(parsed_response);
  };
  const kidsshoes = async () => {
    const response = await fetch(`${url}/Shoes/Kids`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsed_response = await response.json();

    setKids_Shoes(parsed_response);
  };

  const Allshoes = async () => {
    const response = await fetch(`${url}/Shoes/Allshoes`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const parsed_response = await response.json();
    if (window.location.pathname === "/Sale") {
      let k = [];
      parsed_response.map((el) => {
        if (el.sale === "true") {
          k = k.concat(el);
        }
      });
      setcurrentShoes(k);
      setallShoes(k);
    } else {
      setallShoes(parsed_response);
      setcurrentShoes(parsed_response);
    }
  };
  const Signin = async (email, password) => {
    const response = await fetch(`${url}/users/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const parsed_response = await response.json();
    if (parsed_response.error !== undefined) {
      return setErrors(parsed_response.error);
    } else if (parsed_response.otp !== undefined) {
      return setOTP(parsed_response.otp);
    }
    if (parsed_response.authToken !== undefined) {
      setauthtoken(parsed_response.authToken);
      localStorage.setItem("authToken", parsed_response.authToken);
    }
  };
  const Signup = async (name, email, password) => {
    const response = await fetch(`${url}/users/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const parsed_response = await response.json();
    if (parsed_response.error !== undefined) {
      return setErrors(parsed_response.error);
    } else if (parsed_response.otp !== undefined) {
      return setOTP(parsed_response.otp);
    }
  };
  const otpVerifier = async (email) => {
    const response = await fetch(`${url}/users/otpVerifier`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const parsed_response = await response.json();
    if (parsed_response.authToken !== undefined) {
      setauthtoken(parsed_response.authToken);
      localStorage.setItem("authToken", parsed_response.authToken);
    }
  };
  const userdataFetcher = async (authtoken) => {
    const response = await fetch(`${url}/users/userData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authToken"),
      },
    });
    const parsed_response = await response.json();
    setUserdata(parsed_response);
  };

  const getShoe = async (id) => {
    const response = await fetch(`${url}/Shoes/getShoes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const parsed_response = await response.json();
    setClickedshoe(parsed_response);
  };

  //  Cart localstorage

  const localstorageCart = (el, Ssize, quan) => {
    let state = false;
    let cartShoes = JSON.parse(localStorage.getItem("Ci"));
    let selectedShoes = el;

    if (cartShoes !== null) {
      cartShoes &&
        cartShoes.map((shoes) => {
          if (shoes.image === el.image) {
            return (state = true);
          }
        });
      if (state === false) {
        selectedShoes.size = Ssize;
        selectedShoes.quantity = quan;
        let newShoesCollection = cartShoes.concat(selectedShoes);
        localStorage.setItem("Ci", JSON.stringify(newShoesCollection));
        return true;
      } else {
        return false;
      }
    } else {
      if (Ssize) {
        selectedShoes.size = Ssize;
        selectedShoes.quantity = quan;
        localStorage.setItem("Ci", JSON.stringify([selectedShoes]));
      }

      return true;
    }
  };

  return (
    <Context.Provider
      value={{
        shoes,
        menshoes,
        womenshoes,
        kidsshoes,
        Allshoes,
        Women_Shoes,
        Kids_Shoes,
        allShoes,
        setcurrentShoes,
        currentShoes,
        setallShoes,
        setClickedshoe,
        Clickedshoe,
        Signin,
        Errors,
        OTP,
        otpVerifier,
        Signup,
        authtoken,
        setauthtoken,
        userdataFetcher,
        Userdata,
        localstorageCart,
        getShoe,
        page,
        setpage,
        setOTP,
      }}
    >
      {props.elements}
    </Context.Provider>
  );
}
