import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    // This is the header color.
    <AppBar 
    sx={{bgcolor: "#344055", height: "68px"}}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        {/* checking whether the user is logged in */}
        {/* I did not put any value in the bg as it is giving me problems when I was trying to do something with it. 
        So, I am just using css bg values in the nav-link */}
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg = ""
                to="/chat"
                text="Chat"
                textColor="#FFFFFF"
              />
              <NavigationLink
                bg = ""
                to="/"
                text="logout"
                textColor="#FFFFFF"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              {/* This will work when you are logged out */}
              <NavigationLink
                bg = "#F2F1EE"
                to="/login"
                text="Log In"
                textColor="#344055"
              />
              <NavigationLink
                bg = "#F2F1EE"
                to="/signup"
                text="Sign Up"
                textColor="#344055"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
