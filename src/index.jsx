// import * as $ from "jquery";
// import Post from "@models/Post";
// import json from "./assets/json";
// import webpackLogo from "./assets/webpack-logo";
// import xml from "./assets/data.xml";
// import csv from "./assets/data.csv";
import "./babel";
import React from "react";
import { render } from "react-dom";

import "./styles/styles.css";
import "./styles/less.less";
import "./styles/scss.scss";

const App = () => (
  <div className="container">
    <h1>Webpack Course</h1>
    <hr />
    <div className="logo"></div>
    <hr />
    <pre />
    <hr />
    <div className="box">
      <h2>Box LESS</h2>
    </div>
    <div className="card">
      <h2>Card SCSS</h2>
    </div>
  </div>
);

render(<App />, document.getElementById("app"));

// const post = new Post("Webpack post title", webpackLogo);

// $("pre")
//   .addClass("code")
//   .html(post.toString());

// console.log("JSON", json);
// console.log("XML", xml);
// console.log("CSV", csv);
