import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Throbber from "common/ui/Throbber";
import { MdDone } from "react-icons/md";
import { locationLookup } from "services/weatherStackApi";
import styles from "./CitySearch.module.css";

function CitySearch({ onSelect }) {
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const showSearchResults = results.length > 0 || isLoading;

  const searchCity = async (searchQuery) => {
    if (searchQuery.length === 0) {
      setLoading(false);
      setResults([]);
    } else {
      setLoading(true);
      const results = await locationLookup(searchQuery);
      if (results.length === 0) {
        results.push({
          name: "No results found",
          country: "",
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
    const updatedResults = results.map((city) => {
      if (city.id === id) {
        onSelect(city);
        return { ...city, added: true };
      }
      return city;
    });
    setResults(updatedResults);
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
                {city.region
                  ? `${city.name}, ${city.region}, ${city.country}`
                  : `${city.name}, ${city.country}`}
              </span>
              {city.added && (
                <span>
                  <MdDone />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CitySearch;
