import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PricingCard from '../components/landing-page/PricingCard';
import { Grid } from '@mui/material';
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
        <Box display={"flex"} justifyContent={'center'} alignItems={'center'} marginTop={"100px"} flexDirection={"column"}>

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
