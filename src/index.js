import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Globalstyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import media from "./styles/media";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={{ ...media }}>
      <Globalstyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
