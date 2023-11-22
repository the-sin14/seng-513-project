import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const tiers = [
  {
    title: "Free",
    description: [
      "10 summaries per month",
      "Basic support",
      "Access to standard features",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Standard",
    description: [
      "50 summaries per month",
      "Priority support",
      "Access to advanced features",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Premium",
    description: [
      "Unlimited summaries",
      "24/7 support",
      "All features included",
    ],
    buttonText: "Contact us",
    buttonVariant: "contained",
  },
];

function Home() {
  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={5} justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "primary.main", textAlign: 'center' }}
                >
                  {tier.title}
                </Typography>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant={tier.buttonVariant} color="primary">
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
