
import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=300') 
      .then(response => response.json())
      .then(data => {
        setPokemon(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPokemon = pokemon.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search Pokémon..." 
        value={search}
        onChange={handleSearch}
      />
      <div className="pokemon-list">
        {filteredPokemon.map((p, index) => (
          <div key={index} className="pokemon-card">
            <h3>{p.name}</h3>
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} 
              alt={p.name} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
