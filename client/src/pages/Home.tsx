import "./Home.css";
import PricingCard from "../components/landing-page/PricingCard";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { FaCirclePlus } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import React from "react";
import NavigationLink from "../components/shared/NavigationLink";

function Home() {
  const primaryColor = "#344055";
  const maxCharacterCount = 1000;
  const [count, setCount] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [showCounter, setShowCounter] = React.useState(true);
  const inputFile = React.useRef(null);
  const [uploadSlidesContent, setUploadSlidesContent] = React.useState(
    <div className="upload-slides-text">
      <Typography variant="h1" style={{color: "#515458", fontSize: "35px", fontWeight:"bolder"}}>
        UPLOAD YOUR LECTURE SLIDES
      </Typography>
      <Typography variant="h5" style={{color: "#888484", fontSize: "20px", textAlign:"center"}}>
        Supported files types: PDF
      </Typography>
    </div>
  );

  function submitInput() {
    setShowCounter(false);
    setUploadSlidesContent(
      <div className="lorem-ipsum">
        <p>The following is a concise summary derived from the comprehensive notes you provided:</p>
        <div className="blurred-bg">
          <p>Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Sed adipiscing diam donec adipiscing tristique. Eu volutpat odio facilisis mauris sit amet massa. Nec feugiat in fermentum posuere. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Vulputate eu scelerisque felis imperdiet. Mattis molestie a iaculis at erat. Proin fermentum leo vel orci porta non pulvinar neque. Lacus laoreet non curabitur gravida arcu ac.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aperiam quia, ipsum beatae velit provident sed explicabo. Recusandae maiores modi voluptates facere cum, odit molestias? Iste molestias excepturi necessitatibus corporis nesciunt expedita minus iusto, quia iure in obcaecati nulla, velit voluptatum laborum aut quidem aperiam eaque nostrum? Quod quaerat modi aperiam sit amet! Repudiandae mollitia vel illo dolores voluptatem, quaerat officia ab asperiores magnam eligendi, totam et necessitatibus praesentium modi reiciendis eum harum quas repellendus aliquam. Unde pariatur fugit eveniet tempore repellendus aperiam non omnis eius esse quasi officia aliquam culpa, enim odit sapiente iste alias, soluta, praesentium numquam corrupti?</p>
        </div>
        <div className="create-acc-suggestion">
            <h2 className="want-to-read-more">Want to read the entire summary?</h2>
            <p className="want-to-read-more-p">Create an account to read the entire summary and generate flashcards to help aid your study session!</p>
            <NavigationLink bg="#F2F1EE" to="/signup" text="Sign Up" textColor="#344055"></NavigationLink>
        </div>
      </div>
    )
  }

  const uploadFile = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      setImage(files[0]);
      submitInput();
    }
  }

  const onButtonClick = () => {
    inputFile.current.click();
  };
  
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
  "minHeight": "80vh",
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

          {uploadSlidesContent}

          {/* Text field */}
          {count >= maxCharacterCount && (
            <div style={{ color: 'red', marginTop: "15px"}}>
              Text is too long! Create an account to increase character count.
            </div>
          )}
          <div style={inputFieldStyles}>
            <input 
              type="file"
              style={{ display: "none" }} 
              ref = { inputFile }
              onChange={ uploadFile }
            />
            <button className="upload-button" onClick={onButtonClick}>
              <FaCirclePlus className="upload-file-icon"/>
            </button>
            <input
              type="text"
              placeholder="Type in notes..."
              className="text-field"
              onChange={(e) => setCount(e.target.value.length)}
            />
            <button className="enter-button" onClick={submitInput} disabled={count >= maxCharacterCount || count === 0}>
              <IoArrowRedoSharp className="enter-notes-icon" />
            </button>
          </div>
          {showCounter && (
            <div style={wordCounterStyles} className="counter">
              <p>
                {count}/{maxCharacterCount}
              </p>
            </div>
          )}
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
                <PricingCard tier="free" />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="basic" />
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="premium" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;

