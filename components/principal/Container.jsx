import Head from "next/head";
import Script from "next/script";
import Navigation from "./Navigation";

const Container = (props) => (
  <div>
    <Navigation />
    <div className="pt-1 pl-2 pr-2">{props.children}</div>
  </div>
);

export default Container;
