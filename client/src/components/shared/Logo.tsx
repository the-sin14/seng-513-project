import Typography from "@mui/material/Typography";
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
          src="/openai.png"
          alt="OpenAI Logo"
          style={{ width: "50px", height: "50px", marginLeft: "10px" }}
        />
      </Link>
      <Typography
        sx={{
          marginRight: "auto",
          fontWeight: "500",
          textShadow: "2px 2px 18px",
        }}
      >
        <span style={{ fontSize: "12px" }}>Summarify</span>
      </Typography>
    </div>
  );
};

export default Logo;
