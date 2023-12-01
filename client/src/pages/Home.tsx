import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PricingCard from '../components/landing-page/PricingCard';
import { Grid } from '@mui/material';
import { FaCirclePlus } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import React, { useState } from 'react';
import "./Home.css"

function Home() {
  const primaryColor = "#344055";
  const maxCharacterCount = 1000;
  const [count, setCount] = React.useState(0);

  return (
    <>
      <Box width={"100%"} height={"100%"} display="flex" justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>

        {/* Summarify Explanation Section */}
        <div className='hero-section'>
          <div className='hero-image'>
            <img src='../girl_book.svg' width={"650px"} className='summarify-image'></img>
          </div>
          <div className='explain-section'>
            <Typography variant='h1' className='title'>Summarify</Typography>
            <Typography variant='h2' className='subtitle'>A Better Way To <span className='learn'>Learn</span></Typography>
            <Typography variant='body1' className='what-is-summarify'>Simply upload or drag in your lecture notes, sit back, and let our powerful AI work its magic. In seconds, Summarify will transform your lengthy notes into concise summaries, making study sessions a breeze. But that's not all! Our AI doesn't stop there – it also crafts customized practice questions to reinforce your understanding. Elevate your learning experience with Summarify – <span className='motto'>because your success deserves the best!</span></Typography>
          </div>
        </div>

        {/* Test Summarify Section */}
        <Box className="test-summarify-div">
          <div className="explain-text">
            <Typography variant='h1' className='upload-slides-title'>
                UPLOAD YOUR LECTURE SLIDES
            </Typography>
            <Typography variant='h5' className='upload-slides-subtitle'>Supported files types: PDF</Typography>
          </div>

          {/* Text field */}
          <div className='input-field'>
            <FaCirclePlus className="upload-file-icon"/>
            <input type="text" placeholder='Type in notes...' className='text-field' onChange={e => setCount(e.target.value.length)}/>
            <IoArrowRedoSharp className="enter-notes-icon"/>
          </div>

          <div className="word-counter">
              <p>{ count }/{ maxCharacterCount }</p>
          </div>
        </Box>

        {/* Account Tiers Section */}
        <Box display={"flex"} justifyContent={'center'} alignItems={'center'} marginTop={"50px"} flexDirection={"column"}>

          {/* Subtitle */}
          <Typography variant='h1' sx={{color: primaryColor, fontSize: "28px", fontWeight: "700"}}>
              ACCOUNT TIERS
          </Typography>

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} marginTop={"30px"} marginBottom={"70px"}>
            
            {/* Tier Cards */}
            <Grid container display={"flex"} justifyContent="center" alignItems={"stretch"}>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="free" price="free"/>
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="basic" price="free"/>
              </Grid>
              <Grid item style={{ display: "flex" }}>
                <PricingCard tier="premium" price="5.99 per month"/>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
