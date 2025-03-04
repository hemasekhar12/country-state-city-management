import React, { useState } from "react";
import StateList from "./StateList";

function CountryList({ countries, setCountries }) {
  const [searchTerm, setSearchTerm] = useState("");

  const addCountry = () => {
    const countryName = prompt("Enter country name:");
    if (!countryName) return;
    if (countries.some((c) => c.name.toLowerCase() === countryName.toLowerCase())) {
      alert("Country already exists!");
      return;
    }
    setCountries([...countries, { name: countryName, states: [] }]);
  };

  const editCountry = (index) => {
    const newName = prompt("Enter new country name:");
    if (!newName) return;
    if (countries.some((c, i) => i !== index && c.name.toLowerCase() === newName.toLowerCase())) {
      alert("Country name already exists!");
      return;
    }
    const updatedCountries = [...countries];
    updatedCountries[index].name = newName;
    setCountries(updatedCountries);
  };

  const deleteCountry = (index) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      const updatedCountries = countries.filter((_, i) => i !== index);
      setCountries(updatedCountries);
    }
  };

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={addCountry}>Add Country</button>
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>
            <span>{country.name}</span>
            <div>
              <button onClick={() => editCountry(index)}>Edit</button>
              <button className="delete" onClick={() => deleteCountry(index)}>Delete</button>
            </div>
            <StateList country={country} setCountries={setCountries} countryIndex={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CountryList;
