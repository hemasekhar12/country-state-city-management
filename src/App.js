import React, { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
  import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  // Load data from localStorage when the app starts
  useEffect(() => {
    const savedData = localStorage.getItem("countries");
    if (savedData) {
      setCountries(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  return (
    <div className="container">
      <h2>Country, State & City Management</h2>
      <CountryList countries={countries} setCountries={setCountries} />
    </div>
  );
}
export default App;


