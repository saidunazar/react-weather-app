import { useState } from "react";
import AsyncSelect from "react-select/async";
import { geoApiOptions, GEO_API_URL } from "../api/api";

function Search({ handleOnSearch }) {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        let options = response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        });
        return options;
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    handleOnSearch(searchData);
  };

  return (
    <>
      <AsyncSelect
        placeholder="Search for city"
        debounceTimeout={1000}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </>
  );
}

export default Search;
