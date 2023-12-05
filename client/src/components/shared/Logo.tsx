import Typography from "@mui/material/Typography";
import "@fontsource/poppins"
import { Link } from "react-router-dom";
import './Logo.css'; 


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
          >Summarify</span>
      </Typography>
    </div>
  );
};

export default Logo;
