import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Filtered from "./components/Filtered";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => setInput(event.target.value);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);


  return (
    <div>
      find countries <input value={input} onChange={inputHandler} />
      <Filtered countries={countries} input={input}/>
    </div>
  );
};

export default App;
