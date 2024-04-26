import * as React from "react";
import Header from "@components/layout/Header";
import Main from "@components/layout/Main";
import Footer from "@components/layout/Footer";
import "@assets/styles/common.css";

export default function Wrap() {
  return (
    <>
      <div id="wrap">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}