import ViewCountry from "./ViewCountry";
import {useState} from 'react'
const FilteredCards = (props) => {
  const [show, setShow] = useState([])
  return (
    <div>
      {props.countries.map((country) => (
        <div key={country.alpha2Code} >
          {country.name}
          <button value={country} onClick={() => setShow(country)}>Show</button>
          {show == country && <ViewCountry country={country}/>}
        </div>
      ))}
    </div>
  );
};

export default FilteredCards;
