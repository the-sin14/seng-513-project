import Typography from "@mui/material/Typography";
import "@fontsource/poppins"
import React from "react";
import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "1px",
      }}
    >
      {/* This link will take us back to Landing page */}
      <Link to={"/"}>
        <img
          className="logo" 
          src="/summarify_logo.svg"
          alt="Logo"
         style={{ width: "47px", height: "47px", marginLeft: "10px" }} 
        />
      </Link>
      <Typography
        sx={{
          marginRight: "auto",
          fontWeight: "bold",
          fontFamily: "Poppins",
      
        }}
      >
        <span className="text"
style={{ fontSize: "22px", marginLeft: "7px" }} 
          >
          Summarify</span>
      </Typography>
    </div>
  );
};

export default Logo;
