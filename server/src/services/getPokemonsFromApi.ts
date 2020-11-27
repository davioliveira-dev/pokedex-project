import api from '../helpers/apiHelper';
import cleanPokemonProps from '../helpers/cleanPokemonProps';
import generatePokemonsIDs from '../helpers/generatePokemonsIDs';

async function getPokemonsFromApi() {
  const pokeIds = generatePokemonsIDs();
  const pokemons = [];

  for (const pokeId of pokeIds) {
    try {
      const {data} = await api.get(`/pokemon/${pokeId}`);
      const pokemon = cleanPokemonProps(data);
      pokemons.push(pokemon);
    } catch (error) {
      console.log(error.message);
      return;
    }
  }

  return pokemons;
}

export default getPokemonsFromApi;
