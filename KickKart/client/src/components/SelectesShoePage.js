import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import ProdRepresentation from "./ProdRepresentation";
import Suggestions from "./Suggestions";
import Member from "./Member";
import Footer from "./Footer";

export default function SelectesShoePage() {
  return (
    <>
      <Banner></Banner>
      <ProdRepresentation></ProdRepresentation>
      <Suggestions></Suggestions>
      <div className="padding-block-700"></div>
      <Member></Member>
      <Footer></Footer>
    </>
  );
}
