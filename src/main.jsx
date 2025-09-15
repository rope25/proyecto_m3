//import { StrictMode } from 'react'
//import { createRoot } from 'react-dom/client'
// import App from './components/MyApp/App.jsx'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter"; // lo crearemos en el paso 3
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

