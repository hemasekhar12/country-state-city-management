import React, { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";

function CityList({ state, setCountries, countryIndex, stateIndex }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);

  const addCity = () => {
    const cityName = prompt("Enter city name:");
    if (!cityName) return;
    if (state.cities.some((c) => c.name.toLowerCase() === cityName.toLowerCase())) {
      alert("City already exists!");
      return;
    }

    setCountries((prevCountries) =>
      prevCountries.map((c, i) =>
        i === countryIndex
          ? {
              ...c,
              states: c.states.map((s, j) =>
                j === stateIndex ? { ...s, cities: [...s.cities, { name: cityName }] } : s
              ),
            }
          : c
      )
    );
  };

  const requestDeleteCity = (index) => {
    setCityToDelete(index);
    setShowDialog(true);
  };

  const confirmDeleteCity = () => {
    setCountries((prevCountries) =>
      prevCountries.map((c, i) =>
        i === countryIndex
          ? {
              ...c,
              states: c.states.map((s, j) =>
                j === stateIndex ? { ...s, cities: s.cities.filter((_, k) => k !== cityToDelete) } : s
              ),
            }
          : c
      )
    );
    setShowDialog(false);
    setCityToDelete(null);
  };

  const filteredCities = state.cities.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h4>{state.name} - Cities</h4>
      <input
        type="text"
        placeholder="Search city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={addCity}>Add City</button>
      <ul>
        {filteredCities.map((city, index) => (
          <li key={index}>
            <span>{city.name}</span>
            <button className="delete" onClick={() => requestDeleteCity(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this city?"
          onConfirm={confirmDeleteCity}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

export default CityList;
