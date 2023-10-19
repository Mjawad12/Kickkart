import React from "react";
import Hero from "../Hero";
import Category from "../Category";
import NewCollections from "../NewCollections";
import Whykickkart from "../Whykickkart";
import Member from "../Member";
import Testomonial from "../Testomonial";
import Footer from "../Footer";
import StyledComponent from "../StyledComponent";
import BottomStyler from "../BottomStyler";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <StyledComponent></StyledComponent>
      <Category></Category>
      <NewCollections></NewCollections>
      <BottomStyler></BottomStyler>
      <Whykickkart></Whykickkart>
      <Member></Member>
      <Testomonial></Testomonial>
      <Footer></Footer>
    </div>
  );
}
