import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, TextField, Container, Grid } from '@mui/material';
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from 'react-icons/fa';
import { CiCreditCard1 } from 'react-icons/ci';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCity } from "react-icons/fa";

const Payment: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  })

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');

  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handlePurchase = () => {
    return navigate("/chat");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mt: 6, color: '#344055' }}>
          Payment
        </Typography>
        <p>You are about to purchase a premium subscription for $5 a month.</p>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Left Column - Payment Information */}
            <Grid item xs={12} md={6}>
              <Typography component="h2" variant="h6" sx={{ mt: 3, color: '#344055' }}>
                Payment Information
              </Typography>
              <p>Enter your payment information to purchase the subscription.</p>

              {/* Cardholder Name */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="cardholderName"
                label="Cardholder Name"
                placeholder="Cardholder Name"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
              />

              {/* Card Number */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="cardNumber"
                label="Card Number"
                placeholder="Card Number"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <CiCreditCard1 />
                    </InputAdornment>
                    ),
                }}
                />

              {/* Expiration Date */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="expirationDate"
                label="Expiration Date"
                placeholder="MM/YYYY"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />

              {/* CVC */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="cvc"
                label="CVC"
                placeholder="CVC"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
            </Grid>

            {/* Right Column - Billing Address */}
            <Grid item xs={12} md={6}>
              <Typography component="h2" variant="h6" sx={{ mt: 3, color: '#344055' }}>
                Billing Address
              </Typography>
              <p>Enter your billing address to purchase the subscription.</p>

              {/* Street Address */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="streetAddress"
                label="Street Address"
                placeholder="Street Address"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />

              {/* City */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                placeholder="City"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <FaCity/>
                    </InputAdornment>
                    ),
                }}
              />

              {/* State/Province */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="stateProvince"
                label="State/Province"
                placeholder="State/Province"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={stateProvince}
                onChange={(e) => setStateProvince(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <FaCity/>
                    </InputAdornment>
                    ),
                }}
              />

              {/* Country */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="country"
                label="Country"
                placeholder="Country"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />

              {/* Postal Code */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                InputLabelProps={{ sx: { color: '#344055' } }}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#344055',
            }}
            onClick={handlePurchase}
          >
            Purchase
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Payment;
