import "./Home.css";
import PricingCard from "../components/landing-page/PricingCard";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { FaCirclePlus } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import React from "react";

function Home() {
  const primaryColor = "#344055";
  const maxCharacterCount = 1000;
  const [count, setCount] = React.useState(0);
  const heroSectionStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    marginTop: "200px",
    marginBottom: "100px",
    marginLeft: "150px",
    marginRight: "150px",
  };

  const titleStyles: React.CSSProperties = {
    color: primaryColor,
    fontSize: "100px",
    fontWeight: 600,
    lineHeight: "normal",
    textTransform: "uppercase",
  };
  const explainSectionStyles: React.CSSProperties = {
    marginLeft: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const subtitleStyles: React.CSSProperties = {
    color: "#344055",
    fontSize: "40px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textTransform: "uppercase",
}

const learnStyles: React.CSSProperties =  {
  color: "#344055",
  fontFamily: "Poppins",
  fontSize: "40px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "normal",
  textTransform: "uppercase",
}

const summarifyDescriptionStyles: React.CSSProperties = {
  marginTop: "20px",
  color: "#000",
  fontFamily: "Poppins",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  textAlign: "left",
}

const testSummarifyStyles: React.CSSProperties = {
  "width": "100%",
  "height": "80vh",
  "display": "flex",
  "justifyContent": "center",
  "alignItems": "center",
  "flexDirection": "column",
  "marginTop": "100px",
  "backgroundColor": "#D9D9D9",
  "position": "relative",
}

const inputFieldStyles: React.CSSProperties = {
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "center",
 "flexDirection": "row",
  "borderRadius": "15px",
  "border": "1px solid #344055",
  "backgroundColor": "#F2F1EE",
  "height": "40px",
  "position": "absolute",
  "bottom": "60px",
}

const wordCounterStyles: React.CSSProperties =  {
  "color": "rgba(70, 67, 67, 0.80)",
  "textAlign": "right",
  "fontSize": "15px",
  "fontStyle": "normal",
  "fontWeight": "400",
  "lineHeight": "normal"
}
  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {/* Summarify Explanation Section */}
        <div style={heroSectionStyles}>
          <div>
            <img src="../girl_book.svg" width={"650px"}></img>
          </div>
          <div style={explainSectionStyles}>
            <Typography variant="h1" style={titleStyles}>
              Summarify
            </Typography>
            <Typography variant="h2"  style={subtitleStyles}>
              A Better Way To <span style={learnStyles}>Learn</span>
            </Typography>
            <Typography variant="body1" style={summarifyDescriptionStyles}>
              Simply upload or drag in your lecture notes, sit back, and let our
              powerful AI work its magic. In seconds, Summarify will transform
              your lengthy notes into concise summaries, making study sessions a
              breeze. But that's not all! Our AI doesn't stop there – it also
              crafts customized practice questions to reinforce your
              understanding. Elevate your learning experience with Summarify –{" "}
              <span style={{fontWeight:"700", lineHeight: "normal", "fontStyle": "normal"}}>
                because your success deserves the best!
              </span>
            </Typography>
          </div>
        </div>

        {/* Test Summarify Section */}
        <Box style={testSummarifyStyles}>
          <div>
            <Typography variant="h1" style={{color: "#515458", fontSize: "35px", fontWeight:"bolder"}}>
              UPLOAD YOUR LECTURE SLIDES
            </Typography>
            <Typography variant="h5" style={{color: "#888484", fontSize: "20px", textAlign:"center"}}>
              Supported files types: PDF
            </Typography>
          </div>

          {/* Text field */}
          <div style={inputFieldStyles}>
            <FaCirclePlus className="upload-file-icon" />
            <input
              type="text"
              placeholder="Type in notes..."
              className="text-field"
              onChange={(e) => setCount(e.target.value.length)}
            />
            <IoArrowRedoSharp className="enter-notes-icon" />
          </div>

          <div style={wordCounterStyles}>
            <p>
              {count}/{maxCharacterCount}
            </p>
          </div>
        </Box>

        {/* Account Tiers Section */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"50px"}
          flexDirection={"column"}
        >
          {/* Subtitle */}
          <Typography
            variant="h1"
            sx={{ color: primaryColor, fontSize: "28px", fontWeight: "700" }}
          >
            ACCOUNT TIERS
          </Typography>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"row"}
            marginTop={"30px"}
            marginBottom={"70px"}
          >
            {/* Tier Cards */}
            <Grid
              container
              display={"flex"}
              justifyContent="center"
              alignItems={"stretch"}
            >
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="free" price="free" />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="basic" price="free" />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="premium" price="5.99 per month" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

