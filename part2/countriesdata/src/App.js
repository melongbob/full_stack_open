import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Display from './components/Display';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Display countries={countries} search={search} setSearch={setSearch}/>
    </div>
  );
}

export default App;
