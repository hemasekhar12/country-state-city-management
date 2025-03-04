import React, { useState } from "react";
import CityList from "./CityList";

function StateList({ country, setCountries, countryIndex }) {
  const [searchTerm, setSearchTerm] = useState("");

  const addState = () => {
    const stateName = prompt("Enter state name:");
    if (!stateName) return;
    if (country.states.some((s) => s.name.toLowerCase() === stateName.toLowerCase())) {
      alert("State already exists!");
      return;
    }

    setCountries((prevCountries) =>
      prevCountries.map((c, i) =>
        i === countryIndex ? { ...c, states: [...c.states, { name: stateName, cities: [] }] } : c
      )
    );
  };

  const deleteState = (stateIndex) => {
    if (window.confirm("Are you sure you want to delete this state?")) {
      setCountries((prevCountries) =>
        prevCountries.map((c, i) =>
          i === countryIndex
            ? { ...c, states: c.states.filter((_, j) => j !== stateIndex) }
            : c
        )
      );
    }
  };

  const filteredStates = country.states.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>{country.name} - States</h3>
      <input
        type="text"
        placeholder="Search state..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={addState}>Add State</button>
      <ul>
        {filteredStates.map((state, index) => (
          <li key={index}>
            <span>{state.name}</span>
            <div>
              <button className="delete" onClick={() => deleteState(index)}>Delete</button>
            </div>
            <CityList state={state} setCountries={setCountries} countryIndex={countryIndex} stateIndex={index} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StateList;
