import React from 'react';

import Weather from './Weather';

const Country = ({country}) => {
    return(
        <div>
            <h1>{ country.name }</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language => 
                    <li key={language.iso639_2}>{language.name}</li>
                )}
            </ul>
            <img src={country.flag} alt={'national flag of ' + country.name} width='150' height='100' />
            <Weather city={country.capital} />
        </div>
    );
}

export default Country;