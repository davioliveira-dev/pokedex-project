function generatePokemonsIDs() {
  const pokemons = [];
  for (let i = 0; i < 5; i++) {
    const pokeId = Math.floor(Math.random() * 893 + 1);
    pokemons.push(pokeId);
  }
  return pokemons;
}

export default generatePokemonsIDs;
