import React from "react";
import { Router } from "@reach/router";

// pages
import LoginPage from "./Pages/LoginPage";
import WeatherPage from "./Pages/WeatherPage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <LoginPage path="/" />
      <WeatherPage path="/weather" />
    </Router>
  );
}
