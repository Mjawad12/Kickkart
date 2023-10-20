import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "./context/Context";

const UserAccount = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const context = useContext(Context);
  const { Userdata, setauthtoken } = context;
  const handleLogout = () => {
    setauthtoken(undefined);
    localStorage.removeItem("authToken");
    navigate("/");
    window.scrollTo(0, 0);
    ref.current.classList.remove("fade-out");
    ref.current.classList.remove("heightFull");
    props.setAccountOpner('false')
  };

  return (
    <>
      <div
        ref={ref}
        id="account"
        className="userAccount |  even-columns opposite-columns fade-in "
      >
        <h2>{Userdata.name}</h2>
        <Link to={"/myaccount"}>
          <h2>
            My Account <i class="fa-solid fa-user"></i>
          </h2>
        </Link>
        <Link to={"/wishlist"}>
          <h2>
            WishList <i class="fa-solid fa-heart"></i>
          </h2>
        </Link>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </>
  );
});

export default UserAccount;
