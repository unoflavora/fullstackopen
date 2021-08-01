import ViewCountry from "./ViewCountry";
import FilteredCards from "./FilteredCards";
import React, { useState } from "react";

const Filtered = ({ countries, input }) => {
  let filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(input.toLowerCase())
  );

  if (filtered.length > 10) {
    return <p>Too many matches, specify another</p>;
  } else if (filtered.length > 1) {
    return <FilteredCards countries={filtered} />;
  } else if (filtered.length === 1) {
    return <ViewCountry country={filtered[0]} />;
  } else {
    return <div></div>;
  }
};

export default Filtered;
