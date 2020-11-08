import {Request, Response} from 'express';
import api from '../helpers/apiHelper';
import generatePokemonsIDs from '../utils/generatePokemonsIDs';

class PokemonsController {
  static async index(req: Request, res:Response) {
    // REFACTORY THIS
    const pokeIds = generatePokemonsIDs();
    const pokemons = [];
    try {
      pokeIds.forEach((pokeId) => {
        api.get(`/pokemon/${pokeId}`).then((response) => {
          const {data} = response;
          const {abilities, height, id, weight, type, stats, sprites} = data;
          delete sprites.other;
          delete sprites.versions;
          const pokemon = {
            abilities, height, id, weight, type, stats, sprites,
          };
          console.log(pokemon);

          pokemons.push(pokemon);
          if (pokemons.length >= 5) {
            return res.json(pokemons);
          }
        });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: 'We were unable to generate your Pokémons, try again!',
      });
    }
  }
}

export default PokemonsController;
