import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const theme = createTheme();

const Footer = () => {
  return (
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: '#344055',
          color: '#F2F1EE',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2">
            Questions? Concerns? Email us at <u>email@email.com</u>
          </Typography>
          <Typography variant="body2" mt={1}>
            © SENG 513 2023
          </Typography>
        </Container>
      </Box>
  );
};

export default Footer;
