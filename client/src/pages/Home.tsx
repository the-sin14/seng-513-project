import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PricingCard from '../components/landing-page/PricingCard';
import Footer from '../components/Footer';

function Home() {
  const primaryColor = "#344055";

  return (
    <>
      <Box width={"100%"} height={"100%"} display="flex" justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>

        {/* Summarify Explanation Section */}
        <Box>

        </Box>

        {/* Test Summarify Section */}
        <Box>

        </Box>

        {/* Account Tiers Section */}
        <Box display={"flex"} flex={{xs: .3, md: 1}} justifyContent={'center'} alignItems={'center'} marginTop={"100px"} flexDirection={"column"}>

          <Typography variant='h1' sx={{color: primaryColor, fontSize: "28px", fontWeight: "700"}}>
              ACCOUNT TIERS
          </Typography>

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"row"} marginTop={"30px"}>
            
            {/* Tier Cards */}
            <PricingCard tier="free" price="free"/>
            <PricingCard tier="basic" price="free"/>
            <PricingCard tier="premium" price="5.99 per month"/>
            
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
