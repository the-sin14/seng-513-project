import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button, TextField, Container, Grid, MenuItem, InputLabel } from '@mui/material';
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import InputAdornment from '@mui/material/InputAdornment';
import { FaUser } from 'react-icons/fa';
import { FaCreditCard } from "react-icons/fa";
import { FaLocationDot } from 'react-icons/fa6';
import { FaCity } from "react-icons/fa";



const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor (Timor-Leste)",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea, North",
    "Korea, South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia (formerly Macedonia)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];


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
        <Typography component="h1" variant="h5" sx={{ mt: 6, color: '#000' }}>
          Payment
        </Typography>
        <p>You are about to purchase a premium subscription for $5 a month.</p>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
          {/* Left Column - Payment Information */}
          <Grid item xs={12} md={6}>
            <Typography component="h2" variant="h6" sx={{ mt: 3, color: '#000' }}>
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
              InputLabelProps={{ sx: { color: '#000' } }}
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser />
                  </InputAdornment>
                ),
              }}
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
                        <FaCreditCard />
                    </InputAdornment>
                    ),
                }}
                />

                {/* Expiration Date and CVC on the same row */}
                <Grid container spacing={2}>
                <Grid item xs={6}>
                  {/* Expiration Date */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="expirationDate"
                    label="Expiration Date"
                    placeholder="MM/YYYY"
                    InputLabelProps={{ sx: { color: '#adadad' } }}
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaCreditCard />
                        </InputAdornment>
                        ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* CVC */}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="cvc"
                    label="CVC"
                    placeholder="CVC"
                    InputLabelProps={{ sx: { color: '#adadad' } }}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <FaCreditCard />
                        </InputAdornment>
                        ),
                    }}
                  />
                </Grid>
              </Grid>
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
            InputLabelProps={{ sx: { color: '#000' } }}
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <FaLocationDot />
                </InputAdornment>
                ),
            }}
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
            <Grid item xs={12} md={6}>
            <TextField
                margin="normal"
                required
                fullWidth
                select
                id="country"
                label="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <FaCity />
                    </InputAdornment>
                ),
                }}
                SelectProps={{
                MenuProps: {
                    style: { maxHeight: 400, maxWidth: 100 },
                },
                }}
                sx={{ width: '200%' }}
                color="primary"
            >
                {countries.map((option) => (
                <MenuItem key={option} value={option} style={{ color: '#000' }}>
                    {option}
                </MenuItem>
                ))}
            </TextField>
            </Grid>





              {/* Postal Code */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="postalCode"
                label="Postal Code"
                placeholder="Postal Code"
                InputLabelProps={{ sx: { color: '#adadad' } }}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <FaCity/>
                    </InputAdornment>
                    ),
                }}
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