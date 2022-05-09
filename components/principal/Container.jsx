import Head from "next/head";
import Script from "next/script";
import Navigation from "./Navigation";

const Container = (props) => (
  <div>
    <Navigation />
    <div className="mt-2 p-2 pl-2 pr-2 container shadow rounded " style={{minHeight: "90vh"}} >{props.children}</div>
  </div>
);

export default Container;
