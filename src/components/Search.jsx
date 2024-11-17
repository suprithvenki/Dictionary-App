import React, { useState } from "react";
import "../index.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);

  const handleInput = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const myFunc = async () => {
    if (!search) return; // Prevent fetching if search is empty

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );

      if (!response.ok) {
        throw new Error("Word not found or network error");
      }

      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData[0]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setData(null); // Reset data on error
    }
  };

  return (
    <div className="app">
      <h1>Dictionary App</h1>
      <div className="container">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Type here to search"
            onChange={handleInput}
          />
          <button onClick={myFunc}>Search</button>
        </div>
        <div className="datas">
          {data ? (
            <div>
              <h2>Word: {data.word}</h2>
              <p>Part of Speech : {data.meanings[0].partOfSpeech}</p>
              <p>Meaning : {data.meanings[0].definitions[0].definition}</p>
              <p>Similar word : {data.meanings[0].synonyms[0]}</p>
              <p>Example Usage : {data.meanings[0].definitions[0].example}</p>
              <button
                className="button"
                onClick={() => window.open(data.sourceUrls[0], "_blank")}
              >
                Read More
              </button>
            </div>
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
