import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PricingCard from '../components/landing-page/PricingCard';
import { Grid } from '@mui/material';
import { FaCirclePlus } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import "./Home.css"

function Home() {
  const primaryColor = "#344055";

  return (
    <>
      <Box width={"100%"} height={"100%"} display="flex" justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>

        {/* Summarify Explanation Section */}
        <Box>

        </Box>

        {/* Test Summarify Section */}
        <Box className="test-summarify-div">
          <Typography variant='h1' className='upload-slides-title'>
              UPLOAD YOUR LECTURE SLIDES
          </Typography>
          <Typography variant='h5' className='upload-slides-subtitle'>Supported files types: PDF</Typography>

          <div className='input-field'>
            <FaCirclePlus className="upload-file-icon"/>
            <input type="text" placeholder='Type in notes...' className='text-field'/>
            <IoArrowRedoSharp className="enter-notes-icon"/>
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
