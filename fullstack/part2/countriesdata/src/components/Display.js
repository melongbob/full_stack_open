import React from 'react';

import Country from './Country';
import Button from './Button';

const Display = ({countries, search, setSearch}) => {

    const countriesToShow = 
        countries
            .filter(country => 
                country.name.toLowerCase().includes(search.toLowerCase())
            );

    const handleClick = (country) => {
        setSearch(country.name);
    };

    if(countriesToShow.length === 1){
        return(<Country country={countriesToShow[0]} />);
    } else if(countriesToShow.length <= 10) {
        return(
            <div>
                { countriesToShow.map(country => 
                    <div key={ country.alpha3Code }>
                        {country.name} <Button handleClick={() => handleClick(country)}/>
                    </div>
                ) }
            </div>
        );        
    } else {
        return(<div>Too many matches, specify another filter</div>);
    }
}

export default Display;