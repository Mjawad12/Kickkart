import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import Mainstate from "./components/context/Mainstate";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productpage from "./components/Pages/Productpage";
import SelectesShoePage from "./components/SelectesShoePage";
import Log_in from "./components/Sign_in";
import MyaccountPage from "./components/MyaccountPage";
import WishList from "./components/WishList";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <Mainstate
        elements={
          <>
            <Router>
              <Navbar></Navbar>
              <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route
                  path="/Product"
                  element={<Productpage></Productpage>}
                ></Route>
                <Route
                  path="/men"
                  element={<Productpage></Productpage>}
                ></Route>
                <Route
                  path="/women"
                  element={<Productpage></Productpage>}
                ></Route>
                <Route
                  path="/kids"
                  element={<Productpage></Productpage>}
                ></Route>
                <Route
                  path="/Sale"
                  element={<Productpage></Productpage>}
                ></Route>
                <Route
                  path="/SelectedShoe/:id"
                  element={<SelectesShoePage></SelectesShoePage>}
                ></Route>
                <Route path="/login" element={<Log_in></Log_in>}></Route>
                <Route path="/signup" element={<Log_in></Log_in>}></Route>
                <Route path="/verifyingOTP" element={<Log_in></Log_in>}></Route>
                <Route
                  path="/myaccount"
                  element={<MyaccountPage></MyaccountPage>}
                ></Route>
                <Route path="/wishlist" element={<WishList></WishList>}></Route>
                <Route path="/cart" element={<Cart></Cart>}></Route>
              </Routes>
            </Router>
          </>
        }
      ></Mainstate>
    </div>
  );
}

export default App;
