import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, pink } from "@mui/material/colors";

const root = ReactDOM.createRoot(document.getElementById('root'));
const Theme = createTheme({
    palette: {
        primary: blue,
        secondary: pink,
    },
});
root.render(
    <React.StrictMode>
        <ThemeProvider theme={Theme}>
            <App />
        </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
