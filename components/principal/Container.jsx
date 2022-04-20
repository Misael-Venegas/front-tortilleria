import Head from "next/head";
import Script from "next/script";
import Navigation from "./Navigation";

const Container = (props) => (
  <div>
    <Navigation />
    <div className="container p-4">{props.children}</div>
  </div>
);

export default Container;
