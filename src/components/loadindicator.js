import React from "react";

const Loadindicator = ({ no_text, text, style }) => (
  <span
    style={{
      textAlign: "center",
      textTransform: "capitalize",
      width: "100%",
      ...style,
    }}
  >
    <img
      style={{ height: 80, width: 80 }}
      src={require("../images/ajax-loader.gif")}
    />
    <br />
    {no_text ? null : <span>{text || "Converting"}...</span>}
  </span>
);

export default Loadindicator;
