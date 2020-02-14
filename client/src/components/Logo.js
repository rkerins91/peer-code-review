import React from "react";
import logo from "assets/images/logo.png";

export const Logo = () => {
  const style = {
    backgroundImage: "url(" + logo + ")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "6vh",
    width: "6vh"
  };
  return <div style={style} />;
};
