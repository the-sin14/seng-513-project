// import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins"
import Footer from "../components/Footer";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  // Capturing the values of password and email.
  const handleSumbit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("This is the email and password: " + email, password);

    try {
      toast.loading("Signing In!", {id:"login"});
      await auth?.login(email, password);
      toast.success("Signing In Successfully!", {id:"login"});
    } catch (error) { 
      toast.error("Signing in failed", {id: "login"});
     }

  }
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth])
  return (
    <>
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
  
    <Box
      display={"flex"}
      flex={{xs: .3, md: 1 }}
      justifyContent={"center"}
      alignItems={"center"}
      padding={25}
    >
      <form
        onSubmit={handleSumbit}
        style={{
          margin: "auto",
          padding: "40px",
          boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.50)",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            padding={5}
            fontWeight={600}
            sx={{color: "#000", fontFamily: "Poppins", fontSize: "35px"}}
          >
          Sign In
          </Typography>

          {/* Email and Password label */}
          <CustomizedInput type="email" name="email" label="Email" />
          <CustomizedInput type="password" name="password" label="Password" />

          {/* Design for the button */}
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 2,
              mt: 2,
              fontSize: "20px",
              width: "400px",
              borderRadius: 3,
              bgcolor: "#344055",
              color: "#F2F1EE",
              ":hover": {
                bgcolor: "#485875"
              },
              textTransform: "capitalize",
              fontWeight: "600",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
            }}
          >
            Login
          </Button>
          <p>Dont have an account? <a href="/signup">Sign Up</a></p>
        </Box>
      </form>
    </Box>
  </Box>
  <Footer/>
  </>
  )
}

export default Login;
