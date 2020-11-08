function generatePokemonsIDs() {
  const pokemons = [];
  for (let i = 0; i < 5; i++) {
    const pokeID = Math.floor(Math.random() * 893 + 1);
    pokemons.push(pokeID);
  }
  return pokemons;
}

export default generatePokemonsIDs;
