import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, ThemeProvider} from '@mui/material';
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/AuthContext.tsx';
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = "http://localhost:5000/api/v1";

// will help with exchanging the cookies.
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography:{fontFamily:"inherit",
  allVariants: {color:"white"}
}});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* wrapping functionality inside the browsers to use the routers. */}
    <AuthProvider>
    <BrowserRouter>
    <ThemeProvider theme={theme}> 
    <Toaster position='top-right'/>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
