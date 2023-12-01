import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import img from "../images/Sec1/shoes2.webp";
import emailjs from "@emailjs/browser";
import logo from "../images/Kickkart logo.webp";
import Context from "./context/Context";
import { useNavigate } from "react-router-dom";
export default function Log_in() {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { Signup, Signin, Errors, OTP, otpVerifier, authtoken, setOTP } =
    context;
  const [signup, setsignup] = useState("false");
  const [cstate, setcstate] = useState("Log in");
  const [EmailState, setEmailState] = useState("");
  const [error, seterror] = useState("");
  const Email = useRef("");
  const Password = useRef("");
  const Name = useRef("");
  const Otp = useRef("");
  const btn = useRef("");
  const btn2 = useRef("");
  const imgDiv = useRef("");
  const emailDiv = useRef("");
  useEffect(() => {
    seterror("");

    if (window.location.pathname == "/login") {
      btn.current.classList.add("coloured");
      btn2.current.classList.remove("coloured");
      setsignup("false");
      setcstate("Log in");
      Email.current.value = " ";
      Password.current.value = "";
    } else if (window.location.pathname === "/signup") {
      btn2.current.classList.add("coloured");
      btn.current.classList.remove("coloured");
      setsignup("true");
      setcstate("Sign Up");
      Email.current.value = " ";
      Password.current.value = "";
    } else if (window.location.pathname === "/verifyingOTP") {
      setcstate("Submit");
    }
  }, [window.location.pathname]);

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
    observer.observe(imgDiv.current);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((els) => {
      els.forEach((el) => {
        if (el.isIntersecting) {
          el.target.classList.add("fade-out");
          el.target.classList.add("transform-left-out");
        } else {
          el.target.classList.remove("fade-out");
          el.target.classList.remove("transform-left-out");
        }
      });
    });
    observer.observe(emailDiv.current);
  }, []);
  const handleAuth = () => {
    if (window.location.pathname === "/login") {
      if (Email.current.value === "") {
        return seterror("Enter Valid Email");
      } else if (Password.current.value === "") {
        return seterror("Enter Valid Password");
      } else {
        seterror("");
        setEmailState(Email.current.value);
        Signin(Email.current.value, Password.current.value);
      }
    } else if (window.location.pathname === "/signup") {
      if (Email.current.value === "") {
        return seterror("Enter Valid Email");
      } else if (Password.current.value === "") {
        return seterror("Enter Valid Password");
      } else if (Name.current.value === "") {
        return seterror("Enter Valid Name");
      } else {
        seterror("");
        setEmailState(Email.current.value);
        Signup(Name.current.value, Email.current.value, Password.current.value);
      }
    } else if (window.location.pathname === "/verifyingOTP") {
      if (Otp.current.value == OTP) {
        seterror("");
        otpVerifier(EmailState);
        setOTP(undefined);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        seterror("Wrong Otp");
      }
    }
  };
  useEffect(() => {
    if (Errors !== undefined) {
      if (Errors[0].path === "email") seterror("Enter Valid Email");
      else if (Errors[0].path === "password") seterror("Enter Valid Password");
      else {
        seterror(Errors);
      }
    } else {
      seterror("");
    }
  }, [Errors]);

  useEffect(() => {
    if (OTP != undefined) {
      const templateParams = {
        to_name: Email.current.value,
        user_email: Email.current.value,
        message: `Your otp code is ${OTP}`,
        from_name: "Kick Kart",
      };
      emailjs
        .send(
          "service_op5mypk",
          "template_pslst65",
          templateParams,
          "fsNlf011wAWaX2zIF"
        )
        .then(() => {})
        .catch((error) => {});
      navigate("/verifyingOTP");
    }
  }, [OTP]);
  useEffect(() => {
    if (authtoken != undefined) {
      navigate("/");
    }
  }, [authtoken]);

  return (
    <>
      <section className="Log_in  | even-columns">
        <div className="Log_inDiv | even-columns">
          <div
            ref={imgDiv}
            className="imgdiv | even-columns fade-in transform-right-in"
          >
            <img src={img} alt="img"></img>
            <div className="even-columns opposite-columns">
              <Link to={"/login"}>
                <button ref={btn}>Log in</button>
              </Link>
              <Link to={"/signup"}>
                <button ref={btn2}>Sign up</button>
              </Link>
            </div>
          </div>

          <div
            ref={emailDiv}
            className="Log_inMain | even-columns opposite-columns fade-in transform-left-in"
          >
            <img src={logo} alt=""></img>
            {signup === "true" && (
              <div className="NameDiv | even-columns">
                <i className="fa-solid fa-user"></i>
                <input ref={Name} type="text" placeholder="Your Name"></input>
              </div>
            )}
            {window.location.pathname !== "/verifyingOTP" && (
              <>
                <div className="Emaildiv | even-columns ">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    ref={Email}
                    type="email"
                    placeholder="Your Email"
                  ></input>
                </div>
                <div className="Passworddiv  | even-columns">
                  <i className="fa-solid fa-lock"></i>
                  <input
                    ref={Password}
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
              </>
            )}
            {window.location.pathname === "/verifyingOTP" && (
              <>
                <p>Enter Otp sent to your email</p>
                <div className="Emaildiv | even-columns ">
                  <i className="fa-solid fa-key"></i>
                  <input ref={Otp} type="text" placeholder="Enter Otp"></input>
                </div>
              </>
            )}

            {error !== "" && (
              <p>
                <i className="fa-solid fa-circle-exclamation"></i> {error}
              </p>
            )}
            <button onClick={handleAuth} className="button">
              {cstate}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
