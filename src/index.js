import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Techmaster from "./Techmaster";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga";

const measurement_id = "UA-263349157-1";
ReactGA.initialize(measurement_id);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Techmaster />);

const send_analytics = () =>
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(send_analytics);
