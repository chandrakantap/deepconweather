import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Throbber from "common/ui/Throbber";
import { locationLookup } from "services/weatherStackApi";
import styles from "./CitySearch.module.css";

function CitySearch(props) {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const showSearchResults = results.length > 0 || isLoading;

  const searchCity = async (searchQuery) => {
    if (searchQuery.length === 0) {
      setLoading(false);
      setResults([]);
    } else if (!navigator.onLine) {
      setResults([
        {
          name:
            "Seems you are offline. Please connect to internet and try again",
          id: "NO_RES",
        },
      ]);
    } else {
      setLoading(true);
      const results = await locationLookup(searchQuery);
      if (results.length === 0) {
        results.push({
          name: "No results found",
          id: "NO_RES",
        });
      }
      setResults(results);
      setLoading(false);
    }
  };
  const onSelectCity = (event) => {
    const id = event.currentTarget.name;
    if (id === "NO_RES") {
      return;
    }
    const city = results.find((city) => city.id === id);
    props.onSelectCity(city);
  };

  return (
    <div className={styles.root}>
      <SearchInput onChange={searchCity} />
      {showSearchResults && (
        <div className={styles.searchResults}>
          {isLoading && <Throbber />}
          {results.map((city) => (
            <button
              className={styles.searchItem}
              key={city.id}
              name={city.id}
              onClick={onSelectCity}
            >
              <span>
                {city.name}
                {city.region ? `, ${city.region}` : null}
                {city.country ? `, ${city.country}` : null}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CitySearch;
